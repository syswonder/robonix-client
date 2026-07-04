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

## Repository Status

This repository is being initialized. The README describes the intended product
surface and integration boundary before the application scaffold lands.

## Related Repositories

- Robonix core: https://github.com/syswonder/robonix
