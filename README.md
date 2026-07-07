# Robonix Client

Robonix Client is the operator-facing desktop client for Robonix. It provides a
single GUI for text, voice, and image interaction with a running Robonix system,
plus live dashboard views for robot health, agent reasoning, RTDL execution, and
runtime events.

The client is designed to be multi-platform and robot-agnostic: it should run on
developer/operator machines such as macOS and Linux desktops, while connecting
to a local or remote Robonix deployment through stable Robonix APIs.

## Goals

- Provide a GUI alternative to the current command-line interaction flow.
- Support text, voice, and image-based user input.
- Display Robonix runtime state clearly during development and demos.
- Make RTDL planning and execution observable instead of hidden in terminal logs.
- Expose Vitals, failures, and recovery state in a form an operator can act on.
- Keep the client platform-neutral and independent from a specific simulator or
  robot body.

## Product Scope

### Interaction

- Text chat with Robonix through Liaison/Pilot.
- Voice session control, including transcript and response display.
- Image attachment or multimodal input flow for visual tasks.
- Future hands-free wake-trigger voice integration.

### Dashboard

- Vitals and readiness state.
- Current task, Pilot response stream, and reasoning/status messages.
- RTDL plan tree, active node, leaf-call status, and cancellation state.
- Executor call arguments, results, failures, and structured error reasons.
- Recent events and logs useful for debugging during live operation.

### Deployment

- Connect to a local Robonix stack.
- Connect to a remote robot/simulator host by profile.
- Support macOS and Linux as first-class desktop targets.
- Keep Windows support possible if the chosen UI stack supports it cleanly.

## Architecture

The client should consume stable Robonix APIs. It should not scrape terminal
output or depend on implementation details of a specific simulator.

```text
Robonix Client
    |
    | text / voice / image tasks
    v
Liaison / Pilot
    |
    | RTDL plans and task events
    v
Executor / capabilities

Robonix Client
    |
    | dashboard streams
    v
Vitals / Executor / Scribe / Atlas / runtime APIs
```

Robonix core-side API work is tracked in:

- https://github.com/syswonder/robonix/issues/127

The first client delivery task is tracked in:

- https://github.com/syswonder/robonix-client/issues/1

## Expected Backend Surfaces

The client needs documented and stable backend surfaces for:

- text task submission and response streaming,
- voice session start/stop and event streaming,
- image or multimodal task input,
- Vitals / health snapshot and stream,
- Pilot task events,
- Executor plan status and RTDL tree state,
- leaf-call arguments, outputs, and errors,
- audio device list/select for microphone and speaker selection,
- recent logs or event timeline.

## Initial Milestone

For the Robonix v1.0 release milestone, the minimum usable client should:

- connect to a local or remote Robonix deployment,
- send a text command and show streamed task progress,
- trigger a voice input path and show transcript/result,
- support image input at the UI/API boundary,
- show robot readiness/degraded/error state,
- render RTDL execution state in a readable tree/list,
- make failures visually obvious and link them to structured details or logs.

## Current Scaffold

This repository now contains the first Python WebUI scaffold:

- FastAPI + browser UI, runnable on macOS, Linux, and Windows with Python.
- Chat-style text task submission through Liaison `SubmitTask`.
- Voice-session trigger through Liaison `StartVoiceSession`.
- Image attachments carried at the UI/API boundary in task `context_json`.
- Voiceprint enrollment from the Audio panel through mic capture plus
  `robonix/service/voiceprint/enroll`.
- RTDL plan, batch result, and live event panels populated from streamed
  `PilotEvent` / `VoiceEvent` messages.
- Vitals-style dashboard based on the current Atlas heartbeat/lifecycle state.
- Bundled macOS audio bridge daemon copied from the Robonix examples, exposed as
  `robonix-audio-bridge`.

The client remains pure client-side software. Robonix core still owns Atlas,
Liaison, Pilot, Executor, speech, voiceprint, and robot primitives.

## Quick Start

This is the recommended flow for a remote operator setup: Robonix runs on a
Linux host, the browser and microphone/speaker are on an operator Mac, and the
GUI is opened through SSH port forwarding.

### 1. Start the Robonix backend

Start a Robonix deployment that provides Atlas, Liaison, Pilot, Executor,
speech, voiceprint, and the audio bridge primitive. `rbnx boot` starts Atlas as
the first system component and then brings up the rest of the deployment:

```bash
rbnx build
rbnx boot
# Or, when selecting a specific deployment manifest:
# rbnx boot -f <manifest>
```

When it is healthy, Atlas should be reachable at:

```text
127.0.0.1:50051
```

### 2. Start the GUI on the Linux host

From this repository on the Linux host:

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -e ".[audio]"
robonix-client --host 127.0.0.1 --port 7860
```

Leave this terminal running.

### 3. Forward the GUI to your Mac

On the Mac, open a terminal and forward the Linux GUI port:

```bash
ssh -N -L 7860:127.0.0.1:7860 <linux-user>@<linux-host>
```

Then open the GUI in the Mac browser:

```text
http://127.0.0.1:7860/
```

### 4. Start the Mac audio bridge

On the Mac, start the audio bridge on the machine that owns the microphone and
speaker. If running from this repository checkout:

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -e ".[audio]"
robonix-audio-bridge --host 127.0.0.1 --port 60000 --ui-host 127.0.0.1
```

Expected output includes:

```text
HTTP UI on http://127.0.0.1:60001/
websocket on ws://127.0.0.1:60000
```

Keep this terminal running.

### 5. Reverse-forward Mac audio to Robonix

Open another Mac terminal and create the reverse tunnel so the Linux-side
Robonix `audio_macos_bridge` primitive can reach the Mac audio bridge at
`ws://127.0.0.1:60000`:

```bash
ssh -N -R 60000:127.0.0.1:60000 <linux-user>@<linux-host>
```

Keep this terminal running too. If SSH prints `remote port forwarding failed`,
an old tunnel is probably still holding port `60000`; stop the old tunnel and
run the command again.

### 6. Configure the WebUI

In the left `Connection` panel:

- `Atlas`: keep `127.0.0.1:50051`
- `Liaison`: leave empty / `auto`
- `User`: use the enrolled voice identity, for example `voice:<voice-id>`

In the right `Audio` panel:

- `Record sec`: `6` is a good default
- `Language`: leave empty / `auto`
- `TTS`: checked if spoken responses should be played
- `Mic node`: leave empty / `auto`
- `Speaker node`: leave empty / `auto`
- `Voice ID`: use the bare id, for example `<voice-id>`
- `Name`: optional, usually the same as `Voice ID`

Click `Check` to test the audio bridge, `Enroll voice` to register the speaker,
and `Test speaker` to verify TTS-to-speaker playback.

### 7. Use the client

- Type a task and click `Send` for text interaction.
- Click `Voice` to start one voice session.
- Click `New` to create a new chat.
- Click an item under `Chats` to restore that conversation.
- Use `Execution` to inspect Pilot events and RTDL plans.
- Use `Vitals` to check whether backend providers and contracts are available.
- Use `Audio` to debug voice enrollment, microphone capture, and speaker output.

For the current scaffold, image attachments are carried through the UI/API
boundary in `Task.context_json`, but full backend image understanding is not yet
implemented.

### Common Startup Problems

- GUI page does not open on the Mac: make sure the Linux GUI process is running
  and the Mac has `ssh -N -L 7860:127.0.0.1:7860 ...` open.
- Voice enrollment says mic returned no audio: make sure both the Mac audio
  bridge and `ssh -N -R 60000:127.0.0.1:60000 ...` are running.
- Text submission is denied: set `User` to the allowed identity, usually
  `voice:<Voice ID>`, for example `voice:alice`.
- `Vitals` shows `missing` for key contracts: restart or fix the corresponding
  Robonix backend provider before using that feature.

## Run

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -e .
robonix-client --host 127.0.0.1 --port 7860
```

Open:

```text
http://127.0.0.1:7860/
```

Default endpoints:

- Atlas: `127.0.0.1:50051`
- Liaison: auto-discovered through Atlas, then falls back to `127.0.0.1:50081`

The same values can be set in the GUI or through:

```bash
export ROBONIX_ATLAS_ENDPOINT=127.0.0.1:50051
export ROBONIX_LIAISON_ENDPOINT=127.0.0.1:50081
```

## macOS Audio Bridge

On the machine that owns the microphone and speaker:

```bash
pip install -e ".[audio]"
robonix-audio-bridge --host 0.0.0.0 --port 60000 --ui-host 127.0.0.1
```

The bridge speaks the existing Robonix macOS audio protocol:

- WebSocket audio bridge: `ws://<mac-host>:60000`
- Device debug UI: `http://127.0.0.1:60001/`

Point the Robonix deployment's `audio_macos_bridge` primitive at that host and
port, then use the WebUI Voice button to call Liaison `StartVoiceSession`.

To enroll a voiceprint, open the WebUI's Audio tab, fill `Voice ID` (for
example `alice`) and optionally `Name`, then click `Enroll voice`. The resulting
allowed-user identity is `voice:<Voice ID>`, so Liaison's allow list should use
that prefixed form.

## Backend Contracts Used

- `robonix/system/liaison/submit`
- `robonix/system/liaison/voice`
- `robonix/system/pilot`
- `robonix/system/executor`
- Atlas `Query` and `ConnectCapability`

Vitals are currently inferred from Atlas provider lifecycle and heartbeat data,
matching Robonix v0.1's partial Vitals implementation.

## Linux Audio Notes

Linux microphone/speaker capture is not implemented in this first scaffold.
See [docs/linux-audio.md](docs/linux-audio.md) for ALSA/PulseAudio/PipeWire
integration notes.

## Repository Status

The GUI scaffold has landed. The next work items are richer audio-device
selection from Atlas, cancellation controls, persistent profile management, and
first-class Linux local audio capture.

## Related Repositories

- Robonix core: https://github.com/syswonder/robonix
