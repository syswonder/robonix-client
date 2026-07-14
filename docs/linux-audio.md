# Linux Client and Audio

The client supports Linux and macOS with the same browser UI, Atlas/Liaison
transport, and `audio_client_bridge` protocol. Linux local audio uses
`sounddevice` through PortAudio and exposes the same Robonix primitive
contracts:

- `robonix/primitive/audio/mic`
- `robonix/primitive/audio/speaker`
- `robonix/primitive/audio/list_devices`
- `robonix/primitive/audio/select_device`

## Install

Ubuntu/Debian:

```bash
sudo apt update
sudo apt install -y python3-venv libportaudio2 portaudio19-dev
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -e ".[audio]"
```

Verify the local audio backend before starting the client:

```bash
python -m sounddevice
```

Then start the UI:

```bash
robonix-client --robot-host <atlas-machine-ip>
```

## Runtime Design

The bundled local audio service is shared by Linux and macOS. It exposes:

- `/mic`
- `/speaker`
- `/health`
- `/devices`
- `/set_device`
- `/vu`
- `/log`

The wire format remains 16 kHz, mono, signed 16-bit PCM. On Linux, PortAudio
uses the desktop's available PipeWire, PulseAudio, or ALSA host API and handles
device negotiation. The client does not require a Linux-specific Robonix
provider or a different robot manifest.

Run the client inside the logged-in desktop user's session so it can access the
same audio server and devices. For a headless Linux host, text interaction works
without the `audio` extra; voice requires a reachable local audio device or a
separately running compatible audio-device server.

## Troubleshooting

- `sounddevice` is missing: install the `audio` extra.
- PortAudio cannot be loaded: install `libportaudio2`.
- No devices are listed: run `python -m sounddevice` and verify that the
  PipeWire/PulseAudio session is available to the current user.
- The browser UI works but robot audio does not: confirm the robot manifest has
  `audio_client_bridge` in `reverse` mode and apply that provider as the input
  and output route in the client Audio page.
