# Linux Audio Integration Notes

The initial GUI targets macOS voice operation by reusing the existing
`audio_macos_bridge` protocol. Linux local audio should use the same Robonix
primitive contracts as the macOS bridge:

- `robonix/primitive/audio/mic`
- `robonix/primitive/audio/speaker`
- `robonix/primitive/audio/list_devices`
- `robonix/primitive/audio/select_device`

## Practical Options

ALSA direct:

- Lowest dependency surface.
- Device ids are stable enough for `hw:X,Y`, but user-friendly names and hotplug
  behavior are rough.
- Needs resampling or strict device negotiation to keep Robonix's 16 kHz mono
  s16le wire format.

PulseAudio / PipeWire through PortAudio:

- Better default-device behavior on desktop Linux.
- The Python `sounddevice` package can mirror the macOS server implementation
  closely because it uses PortAudio underneath.
- PipeWire desktop stacks usually expose a PulseAudio-compatible layer, so this
  path is likely the fastest cross-distro GUI-client implementation.

Native PipeWire:

- Best long-term integration for modern Linux desktops.
- More code and packaging work than the PortAudio path.

## Recommended Next Step

Create a sibling `audio_linux_bridge` daemon with the same WebSocket endpoints
as the macOS bridge:

- `/mic`
- `/speaker`
- `/health`
- `/devices`
- `/set_device`
- `/vu`
- `/log`

Start with `sounddevice` on Linux and only drop to ALSA-specific code if
PortAudio/PipeWire cannot produce stable 16 kHz mono s16le streams on target
machines.

