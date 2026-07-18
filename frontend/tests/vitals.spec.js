const { test, expect } = require("@playwright/test");

const DESCRIPTION = {
  id: "tiago_webots",
  displayName: "Webots TIAGo Lite mobile robot",
  family: "mobile_robot",
  rootPart: "base",
  dimensions: { lengthM: 0.544, widthM: 0.544, heightM: 1.1 },
  render: { mode: "procedural", modelUrl: "", urdfRootLink: "base_link", urdfModelName: "tiago_webots" },
  urdfXml: "<robot name='tiago_webots'></robot>",
  components: [
    { id: "body", localId: "body", parentId: "", label: "Webots TIAGo Lite mobile robot", type: "robot", urdfLink: "base_link", urdfJoint: "", providers: [] },
    { id: "body/base", localId: "base", parentId: "body", label: "Base", type: "mobile_base", urdfLink: "base_link", urdfJoint: "", providers: ["tiago_webots_chassis"] },
    { id: "body/base/left_wheel", localId: "left_wheel", parentId: "body/base", label: "Left Wheel", type: "wheel", urdfLink: "", urdfJoint: "wheel_left_joint", providers: [] },
    { id: "body/base/right_wheel", localId: "right_wheel", parentId: "body/base", label: "Right Wheel", type: "wheel", urdfLink: "", urdfJoint: "wheel_right_joint", providers: [] },
    { id: "body/base/battery", localId: "battery", parentId: "body/base", label: "Battery", type: "battery", urdfLink: "", urdfJoint: "", providers: [] },
    { id: "body/head_camera", localId: "head_camera", parentId: "body", label: "Head Camera", type: "rgbd_camera", urdfLink: "head_front_camera_rgb_optical_frame", urdfJoint: "", providers: ["tiago_webots_camera"] },
    { id: "body/hokuyo_lidar", localId: "hokuyo_lidar", parentId: "body", label: "Hokuyo Lidar", type: "lidar_2d", urdfLink: "hokuyo", urdfJoint: "", providers: ["tiago_webots_lidar"] },
    { id: "body/audio", localId: "audio", parentId: "body", label: "Audio", type: "audio_io", urdfLink: "", urdfJoint: "", providers: ["tiago_webots_audio"] },
  ],
};

const HARDWARE = {
  timestampNs: 1700000000000000000,
  updatedAtMs: Date.now(),
  power: { socPercent: 87.4, voltage: 24.6, charging: false, remainingSeconds: 8600 },
  summary: { overall: "warn", total: 8, ok: 7, warn: 1, error: 0, stale: 0, unknown: 0 },
  componentHealth: [
    { componentId: "body", health: "warn", directHealth: "ok", signalCount: 0, detail: "battery reserve below target", sourceComponentId: "body/base/battery", signalKeys: [] },
    { componentId: "body/base", health: "warn", directHealth: "ok", signalCount: 1, detail: "battery reserve below target", sourceComponentId: "body/base/battery", signalKeys: ["body/base/motion"] },
    { componentId: "body/base/left_wheel", health: "ok", directHealth: "ok", signalCount: 1, detail: "wheel nominal", sourceComponentId: "body/base/left_wheel", signalKeys: ["body/base/left_wheel/motor"] },
    { componentId: "body/base/right_wheel", health: "ok", directHealth: "ok", signalCount: 1, detail: "wheel nominal", sourceComponentId: "body/base/right_wheel", signalKeys: ["body/base/right_wheel/motor"] },
    { componentId: "body/base/battery", health: "warn", directHealth: "warn", signalCount: 1, detail: "battery reserve below target", sourceComponentId: "body/base/battery", signalKeys: ["body/base/battery/soc"] },
    { componentId: "body/head_camera", health: "ok", directHealth: "ok", signalCount: 1, detail: "camera streaming", sourceComponentId: "body/head_camera", signalKeys: ["body/head_camera/stream"] },
    { componentId: "body/hokuyo_lidar", health: "ok", directHealth: "ok", signalCount: 1, detail: "scan nominal", sourceComponentId: "body/hokuyo_lidar", signalKeys: ["body/hokuyo_lidar/scan"] },
    { componentId: "body/audio", health: "ok", directHealth: "ok", signalCount: 1, detail: "audio route ready", sourceComponentId: "body/audio", signalKeys: ["body/audio/route"] },
  ],
  signals: [
    { key: "body/base/motion", health: "ok", detail: "base nominal", observedValue: 1, referenceValue: 1 },
    { key: "body/base/left_wheel/motor", health: "ok", detail: "wheel nominal", observedValue: 1, referenceValue: 1 },
    { key: "body/base/right_wheel/motor", health: "ok", detail: "wheel nominal", observedValue: 1, referenceValue: 1 },
    { key: "body/base/battery/soc", health: "warn", detail: "battery reserve below target", observedValue: 87.4, referenceValue: 90 },
    { key: "body/head_camera/stream", health: "ok", detail: "camera streaming", observedValue: 30, referenceValue: 30 },
    { key: "body/hokuyo_lidar/scan", health: "ok", detail: "scan nominal", observedValue: 10, referenceValue: 10 },
    { key: "body/audio/route", health: "ok", detail: "audio route ready", observedValue: 1, referenceValue: 1 },
  ],
  bodies: [],
};

const MODULES = {
  updatedAtMs: Date.now(),
  summary: { overall: "ok", total: 4, ok: 4, warn: 0, error: 0, stale: 0, unknown: 0 },
  modules: ["atlas", "executor", "pilot", "vitals"].map((id) => ({
    moduleKey: `${id}/${id}`,
    moduleId: id,
    providerId: id,
    health: "ok",
    healthCode: 0,
    state: "active",
    reasonCode: "OK",
    detail: `${id} serving`,
    source: "report",
    ttlMs: 5000,
  })),
};

const PROVIDERS = {
  updatedAtMs: Date.now(),
  summary: { overall: "ok", total: 4, ok: 4, warn: 0, error: 0, stale: 0, unknown: 0 },
  providers: ["soma", "vitals", "pilot", "executor"].map((id) => ({
    id,
    health: "ok",
    state: "ACTIVE",
    namespace: "robonix/system",
    stateDetail: `${id} serving`,
    capabilities: [{ contractId: `robonix/system/${id}`, transport: "grpc" }],
  })),
};

const ARM_DESCRIPTION = {
  id: "lab_arm",
  displayName: "Lab Manipulator",
  family: "robot_arm",
  rootPart: "base",
  dimensions: { lengthM: 0.5, widthM: 0.5, heightM: 1.25 },
  render: { mode: "procedural", modelUrl: "", urdfRootLink: "base_link", urdfModelName: "lab_arm" },
  urdfXml: "",
  components: [
    { id: "body", localId: "body", parentId: "", label: "Lab Manipulator", type: "robot", providers: [] },
    { id: "body/base", localId: "base", parentId: "body", label: "Base", type: "fixed_base", providers: ["arm_driver"] },
    { id: "body/shoulder", localId: "shoulder", parentId: "body/base", label: "Shoulder", type: "arm_joint", providers: [] },
    { id: "body/elbow", localId: "elbow", parentId: "body/shoulder", label: "Elbow", type: "arm_joint", providers: [] },
    { id: "body/gripper", localId: "gripper", parentId: "body/elbow", label: "Gripper", type: "gripper", providers: ["gripper_driver"] },
  ],
};

const ARM_HARDWARE = {
  ...HARDWARE,
  summary: { overall: "ok", total: 5, ok: 5, warn: 0, error: 0, stale: 0, unknown: 0 },
  componentHealth: ARM_DESCRIPTION.components.map((component) => ({
    componentId: component.id,
    health: "ok",
    directHealth: "ok",
    signalCount: 0,
    detail: "",
    sourceComponentId: component.id,
    signalKeys: [],
  })),
  signals: [],
};

async function installVitalsSocket(page, description = DESCRIPTION, hardware = HARDWARE) {
  await page.addInitScript(({ description, hardware, modules, providers }) => {
    const NativeWebSocket = window.WebSocket;
    class FixtureWebSocket extends EventTarget {
      static CONNECTING = 0;
      static OPEN = 1;
      static CLOSING = 2;
      static CLOSED = 3;

      constructor(url, protocols) {
        super();
        if (!String(url).includes("/ws/vitals")) return new NativeWebSocket(url, protocols);
        this.url = String(url);
        this.readyState = FixtureWebSocket.CONNECTING;
        setTimeout(() => {
          this.readyState = FixtureWebSocket.OPEN;
          const event = new Event("open");
          this.onopen?.(event);
          this.dispatchEvent(event);
        }, 20);
      }

      send() {
        const events = [
          { type: "accepted", atlasEndpoint: "127.0.0.1:50051" },
          { type: "description", data: description },
          { type: "source", source: "soma", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "hardware", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "modules", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "atlas", state: "ready", updatedAtMs: Date.now() },
          { type: "hardware", data: { ...hardware, updatedAtMs: Date.now() } },
          { type: "modules", data: { ...modules, updatedAtMs: Date.now() } },
          { type: "providers", data: { ...providers, updatedAtMs: Date.now() } },
        ];
        events.forEach((payload, index) => setTimeout(() => {
          const event = new MessageEvent("message", { data: JSON.stringify(payload) });
          this.onmessage?.(event);
          this.dispatchEvent(event);
        }, 20 + index * 15));
      }

      close() {
        if (this.readyState === FixtureWebSocket.CLOSED) return;
        this.readyState = FixtureWebSocket.CLOSED;
        const event = new CloseEvent("close", { code: 1000, reason: "fixture closed" });
        this.onclose?.(event);
        this.dispatchEvent(event);
      }
    }
    window.WebSocket = FixtureWebSocket;
  }, { description, hardware, modules: MODULES, providers: PROVIDERS });
}

async function openVitals(page, description = DESCRIPTION, hardware = HARDWARE) {
  await installVitalsSocket(page, description, hardware);
  await page.goto("/");
  await page.locator("[data-page='vitals']").click();
  await expect(page.locator("#vitalsRobotName")).toHaveText(description.displayName);
  await expect(page.locator("#vitalsSoftwareList .vitals-software-row")).toHaveCount(4);
}

test("renders adaptive robot health workspace", async ({ page }, testInfo) => {
  await openVitals(page);
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("tiago_webots");
  expect(debug.components).toBe(8);
  expect(debug.hardwareSignals).toBe(7);
  expect(debug.renderMode).toBe("procedural");

  await expect(page.locator("#vitalsOverallHealth")).toHaveText("warn");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("vitals.png"), fullPage: true });

  await page.locator(".vitals-component-row", { hasText: "Battery" }).click();
  await expect(page.locator("#vitalsInspectorTitle")).toHaveText("Battery");
  await expect(page.locator("#vitalsInspectorHealth")).toHaveText("warn");

  const canvas = await page.evaluate(() => window.__robonixVitalsDebug.canvasStats());
  expect(canvas.width).toBeGreaterThan(300);
  expect(canvas.height).toBeGreaterThan(250);
  expect(canvas.foregroundSamples).toBeGreaterThan(4);
  expect(canvas.distinctColors).toBeGreaterThan(3);

  const incoherentOverlaps = await page.evaluate(() => {
    const selectors = [
      ".vitals-overview",
      ".vitals-main",
      ".vitals-stage",
      ".vitals-components-pane",
      ".vitals-inspector",
      ".vitals-software",
    ];
    return selectors.filter((selector) => {
      const node = document.querySelector(selector);
      if (!node) return true;
      const rect = node.getBoundingClientRect();
      return rect.width < 1 || rect.height < 1 || node.scrollWidth > node.clientWidth + 4;
    });
  });
  expect(incoherentOverlaps).toEqual([]);

  const clippedText = await page.evaluate(() => [
    "#atlasPort",
    "#vitalsRobotName",
    "#vitalsHardwareSummary",
    "#vitalsBatterySummary",
    "#vitalsSoftwareSummary",
  ].filter((selector) => {
    const node = document.querySelector(selector);
    return !node || node.scrollWidth > node.clientWidth + 2;
  }));
  expect(clippedText).toEqual([]);

  await page.locator("#vitalsProvidersTab").click();
  await expect(page.locator("#vitalsSoftwareList .vitals-software-row")).toHaveCount(4);
});

test("renders a distinct manipulator family from Soma metadata", async ({ page }) => {
  await openVitals(page, ARM_DESCRIPTION, ARM_HARDWARE);
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("lab_arm");
  expect(debug.components).toBe(5);
  expect(debug.renderMode).toBe("procedural");
  await expect(page.locator("#vitalsOverallHealth")).toHaveText("ok");
  await expect(page.locator(".vitals-component-row", { hasText: "Gripper" })).toHaveCount(1);

  const canvas = await page.evaluate(() => window.__robonixVitalsDebug.canvasStats());
  expect(canvas.foregroundSamples).toBeGreaterThan(4);
  expect(canvas.distinctColors).toBeGreaterThan(3);
});
