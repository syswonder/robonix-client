# Robonix Client

A Linux and macOS web client for operating a running Robonix deployment. It provides
text tasks, voice turns, hands-free control, explicit Stop/steer behavior,
audio-device routing, and live Pilot/RTDL execution events.

## Install Guide

Requirements:

- Linux or macOS
- Python 3.11 or newer
- network access to the machine running Robonix Atlas
- a running Robonix deployment with Atlas, Liaison, Pilot, and Executor

Install from source:

```bash
git clone https://github.com/syswonder/robonix-client.git
cd robonix-client
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -e ".[audio]"
```

The `audio` extra installs the PortAudio adapter used for microphone and
speaker access. Install the system library first when needed.

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y libportaudio2 portaudio19-dev
pip install -e ".[audio]"
```

macOS:

```bash
brew install portaudio
pip install -e ".[audio]"
```

## Quick Start

Assume Robonix Atlas is running on `100.87.172.93:50051`:

```bash
source .venv/bin/activate
robonix-client --robot-host 100.87.172.93
```

Open <http://127.0.0.1:7860/>.

The client starts its local audio service automatically. On Linux it uses the
desktop's PipeWire, PulseAudio, or ALSA devices through PortAudio. In the UI:

1. Confirm **Robot Host** is `100.87.172.93` and **Atlas Port** is `50051`.
2. Click **Connect**. The status should become online.
3. Enter a small text task and click **Send**.
4. While a task is active, **Send** becomes **Steer** and **Stop** appears.
5. Open **Audio** to select and test microphone/speaker providers and devices.

`--host` and `--robot-host` are different:

- `--host 127.0.0.1` controls where this Web UI listens.
- `--robot-host 100.87.172.93` selects the remote Robonix machine.

Most users only need `--robot-host`.

## Connecting to a Robonix Machine

### Which IP should I enter?

Enter the IP or hostname of the machine that runs **Robonix Atlas**. It is not
the Mac client IP and not an unrelated development PC.

Good choices are:

- the robot's Tailscale IP when both machines use Tailscale;
- the robot's LAN IP when both machines are on the same trusted LAN;
- `127.0.0.1` only when Robonix and this client run on the same machine.

The required fields are:

| Field | Value |
|---|---|
| Robot Host | Atlas machine IP or hostname, for example `100.87.172.93` |
| Atlas Port | `50051` unless the deployment changed it |
| Liaison Endpoint | Leave empty; the client discovers Liaison through Atlas |
| User ID | Optional identity used by the deployment's access policy |

Liaison normally listens on port `50081`, but clients should discover it
through Atlas instead of hard-coding that port.

### Audio routing

For a Mac microphone/speaker, the Robonix deployment must include the
`audio_client_bridge` provider in client-initiated mode:

```yaml
primitive:
  - name: audio_client_bridge
    path: ./primitives/audio_client_bridge
    config:
      transport: reverse
      listen_port: 60002
```

The word `reverse` only describes connection ownership: the Mac connects to
the robot. The deployment does not store the Mac IP. The client discovers the
bridge endpoint through Atlas, opens one outbound WebSocket, and carries both
microphone and speaker PCM over that connection.

In **Audio**, select `audio_client_bridge` for input and/or output, choose the
client machine's devices, click **Apply Route**, then run **Test microphone** and **Test
speaker**. Hands-free mode is disabled until explicitly enabled in the UI.

## Testing with the Robonix Webots Example

This flow runs Webots and Robonix on a Linux machine and the client on Linux or macOS.
The same-host case also works by using `127.0.0.1` as Robot Host.

### 1. Prepare Robonix

On the Linux/Webots machine:

```bash
git clone --recursive https://github.com/syswonder/robonix.git
cd robonix
cd rust && make install && cd ..

export VLM_BASE_URL=https://api.openai.com/v1
export VLM_API_KEY=<your-key>
export VLM_MODEL=<your-model>

cd examples/webots
rbnx build
```

Use the reverse `audio_client_bridge` manifest block shown above if voice from
the Mac is part of the test. Text, planning, execution, and Stop tests do not
require client audio.

### 2. Start Webots

In terminal 1, from the Robonix repository root:

```bash
bash examples/webots/sim/start.sh
```

`office.wbt` is the default. To select another built-in world:

```bash
bash examples/webots/sim/start.sh --world complete_apartment.wbt
```

Wait until the simulator and Tiago controller are ready.

### 3. Start the Robonix stack

In terminal 2:

```bash
cd examples/webots
rbnx boot
```

Wait for Atlas, Liaison, Pilot, Executor, and the manifest providers to report
ready. `rbnx caps` can be used to confirm capability registration.

### 4. Start the client

On the client machine:

```bash
cd robonix-client
source .venv/bin/activate
robonix-client --robot-host <webots-machine-ip>
```

Open <http://127.0.0.1:7860/>, click **Connect**, and run the checks in this
order:

1. Send a harmless text request such as `Use Bash to print WEBOTS_CLIENT_OK`.
2. Send a longer Bash task, then send a **Steer** update while it runs.
3. Start another long Bash task and click **Stop**; verify the task becomes
   interrupted and its child process exits.
4. Inspect the RTDL tree and execution history for one plan/call per request.
5. If audio bridge is enabled, apply the route and test microphone, speaker,
   one Voice turn, then hands-free wake detection.
6. Only after those checks, test simulated camera/navigation capabilities.

Stop the environment with:

```bash
cd examples/webots
rbnx shutdown
bash sim/stop.sh
```

## Core Design

### Control path

```text
Browser UI
  -> local robonix-client FastAPI/WebSocket adapter
  -> Atlas discovery
  -> Liaison task/voice API
  -> Pilot planning harness
  -> Executor and registered capabilities
  -> structured Pilot/RTDL events back to the UI
```

The client does not embed a planner and does not call robot drivers directly.
Atlas is the source of provider endpoints; Liaison is the interaction gateway;
Pilot owns task/steer/abort semantics; Executor owns running capability calls.

### Turn behavior

- **Send** starts a new task when the session is idle.
- **Steer** targets the active turn using its expected turn ID. Stale steer is
  rejected rather than applied to a newer task.
- **Stop** sends an abort control event. Pilot interrupts the active turn and
  Executor cancels running work, including Bash child processes. If an F2
  session is recording, recognizing, or speaking, Stop also cancels that voice
  stream and releases its audio devices.
- Pressing **F2** while TTS is active performs barge-in: the old reply is
  interrupted, then a fresh voice capture starts. TTS is never recorded back
  into the new turn.
- Voice steer ASR text is shown as a `voice steer` user message and is fenced to
  the active turn ID.
- Capture ends after speech plus 1.2 seconds of silence. If no speech is
  detected, it exits with a visible error after 5 seconds instead of occupying
  the microphone for the full record limit.
- Planning and node state are structured events. Only a completed answer or a
  real user-input boundary becomes an assistant reply.
- **New Session** is disabled while a task is active, so it cannot hide an
  execution that is still running.

### Audio path

```text
Linux audio or macOS CoreAudio
  <-> local audio service
  <-> outbound WebSocket to audio_client_bridge on the robot
  <-> standard Robonix mic/speaker contracts
  <-> Liaison + Speech
```

The bridge-specific endpoint is discovered through the optional
`robonix/primitive/audio/bridge_info` capability. Normal robot-local audio
drivers do not need that capability.

## Troubleshooting

- **Client page does not open:** check that `robonix-client` is running on
  `127.0.0.1:7860`.
- **Robot stays offline:** verify the entered host is the Atlas machine and that
  `<robot-host>:50051` is reachable from the client machine.
- **Liaison unavailable:** leave the endpoint empty and confirm Liaison is
  registered in Atlas.
- **Audio bridge unavailable:** confirm the deployment uses
  `audio_client_bridge`, port `60002` is reachable, and the provider exposes
  `bridge_info`.
- **Microphone test reports digital silence:** every PCM sample was zero. Check
  hardware mute and Linux/macOS audio routing, or select `audio_client_bridge`
  and a real input device. Quiet nonzero background audio is accepted.
- **Linux audio service is offline:** install `libportaudio2` and the `audio`
  extra, then run `python -m sounddevice` to confirm that input and output
  devices are visible in the same desktop session that runs the client.
- **Stop does not end a task:** inspect the RTDL event history and Executor log;
  a successful Stop must produce an interrupted turn and a cancelled running
  plan.

## Related

- Robonix core: <https://github.com/syswonder/robonix>
