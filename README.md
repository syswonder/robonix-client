# Robonix Client

A multi-platform desktop client for Robonix. It provides a single GUI for text,
voice, and image interaction with a running Robonix system, plus live dashboard
views for robot health, agent reasoning, RTDL execution, and runtime events.

The client is pure client-side software that connects to a local or remote
Robonix deployment through stable Robonix APIs. Robonix core still owns Atlas,
Liaison, Pilot, Executor, speech, voiceprint, and robot primitives.

## Quick Start

Typical remote setup: Robonix runs on a Linux host, while the browser,
microphone, and speaker stay on the client machine. SSH, Tailscale, or LAN are
only network paths.

### 1. Start the Robonix backend

Start a deployment that provides Atlas, Liaison, Pilot, Executor, speech,
voiceprint, and the audio device server primitive:

```bash
rbnx build
rbnx boot
# Or select a specific manifest:
# rbnx boot -f <manifest>
```

When healthy, Atlas is reachable at `<robot-host>:50051`.

### 2. Start the GUI on the client machine

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -e ".[audio]"
robonix-client --host 127.0.0.1 --port 7860
```

Open http://127.0.0.1:7860/

### 3. Start the local audio device server

On the machine that owns the microphone and speaker:

```bash
robonix-client-audio-server --host 127.0.0.1 --port 60000 --ui-host 127.0.0.1
```

Expected output:

```text
HTTP UI on http://127.0.0.1:60001/
websocket on ws://127.0.0.1:60000
```

Keep this terminal running, then point the robot-side `audio_client_bridge`
primitive at `ws://<client-host>:60000/mic` and `ws://<client-host>:60000/speaker`.

### 4. Configure the WebUI

In the command bar or `Settings` page:

- `Robot Host`: reachable IP/hostname of the Robonix machine
- `Atlas Port`: usually `50051`
- `Liaison`: leave empty / `auto`
- `User`: enrolled voice identity, e.g. `voice:<voice-id>`

Use the `Audio` panel's `Check`, `Enroll voice`, and `Test speaker` buttons to
verify the audio device server, register a speaker, and test playback.

### 5. Use the client

- Type a task and click `Send` for text interaction.
- Click `Voice` to start one voice session, `New` for a new chat.
- Use `Execution` to inspect Pilot events and RTDL plans.
- Use `Vitals` to check backend provider/contract availability.
- Use `Audio` to debug enrollment, mic capture, and speaker output.

## Configuration

The GUI values can also be set through environment variables:

```bash
export ROBONIX_ROBOT_HOST=100.x.y.z
export ROBONIX_ATLAS_PORT=50051
export ROBONIX_ATLAS_ENDPOINT=100.x.y.z:50051
export ROBONIX_LIAISON_ENDPOINT=127.0.0.1:50081
```

Liaison is auto-discovered through Atlas, then falls back to `<robot-host>:50081`.

## Troubleshooting

- GUI page does not open: ensure the GUI process is running and, for remote
  setups, that `ssh -N -L 7860:127.0.0.1:7860 ...` is open.
- Voice enrollment returns no audio: ensure the audio device server and
  `ssh -N -R 60000:127.0.0.1:60000 ...` are both running.
- Text submission denied: set `User` to the allowed identity, e.g. `voice:alice`.
- `Vitals` shows `missing`: restart or fix the corresponding Robonix provider.

## Notes

- Image attachments are carried at the UI/API boundary in `Task.context_json`;
  full backend image understanding is not yet implemented.
- Linux local mic/speaker capture is not implemented yet. See
  [docs/linux-audio.md](docs/linux-audio.md) for integration notes.
- Backend contracts used: `robonix/system/liaison/submit`,
  `robonix/system/liaison/voice`, `robonix/system/pilot`,
  `robonix/system/executor`, and Atlas `Query` / `ConnectCapability`.

## Related

- Robonix core: https://github.com/syswonder/robonix
