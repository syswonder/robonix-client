const { test, expect } = require("@playwright/test");

const ASCII_STL = [
  "solid triangle",
  "facet normal 0 0 1",
  "outer loop",
  "vertex 0 0 0",
  "vertex 1 0 0",
  "vertex 0 1 0",
  "endloop",
  "endfacet",
  "endsolid triangle",
].join("\n");

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
    { id: "body/hokuyo_lidar", localId: "hokuyo_lidar", parentId: "body", label: "Hokuyo Lidar", type: "lidar_2d", urdfLink: "base_laser_link", urdfJoint: "", providers: ["tiago_webots_lidar"] },
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

const ERROR_HARDWARE = {
  ...HARDWARE,
  summary: { overall: "error", total: 8, ok: 7, warn: 0, error: 1, stale: 0, unknown: 0 },
  componentHealth: HARDWARE.componentHealth.map((row) => {
    if (row.componentId === "body/base/battery") {
      return { ...row, health: "error", directHealth: "error", detail: "battery controller offline" };
    }
    if (["body", "body/base"].includes(row.componentId)) {
      return { ...row, health: "error", detail: "battery controller offline", sourceComponentId: "body/base/battery" };
    }
    return row;
  }),
  signals: HARDWARE.signals.map((signal) => (
    signal.key === "body/base/battery/soc"
      ? { ...signal, health: "error", detail: "battery controller offline" }
      : signal
  )),
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
    visualState: "ok",
    directVisualState: "ok",
    signalCount: component.id === "body/gripper" ? 1 : 0,
    detail: component.id === "body/gripper" ? "gripper torque is enabled (ready)" : "",
    sourceComponentId: component.id,
    signalKeys: component.id === "body/gripper" ? ["body/gripper/torque_enabled"] : [],
  })),
  signals: [
    {
      key: "body/gripper/torque_enabled",
      health: "ok",
      visualState: "ok",
      detail: "gripper torque is enabled (ready)",
      observedValue: 1,
      referenceValue: 1,
    },
  ],
};

const IDLE_ARM_HARDWARE = {
  ...ARM_HARDWARE,
  componentHealth: ARM_HARDWARE.componentHealth.map((row) => ({
    ...row,
    visualState: "idle",
    directVisualState: row.componentId === "body/gripper" ? "idle" : row.directHealth,
    detail: row.componentId === "body/gripper" ? "gripper torque is disabled (idle)" : row.detail,
    signalCount: row.componentId === "body/gripper" ? 1 : row.signalCount,
    signalKeys: row.componentId === "body/gripper" ? ["body/gripper/torque_enabled"] : row.signalKeys,
  })),
  signals: [
    {
      key: "body/gripper/torque_enabled",
      health: "ok",
      visualState: "idle",
      detail: "gripper torque is disabled (idle)",
      observedValue: 0,
      referenceValue: 0,
    },
  ],
};

const MOBILE_MANIPULATOR_DESCRIPTION = {
  ...DESCRIPTION,
  id: "tiago_webots_full",
  displayName: "Webots TIAGo mobile manipulator",
  family: "mobile_manipulator",
  dimensions: { lengthM: 0.68, widthM: 0.68, heightM: 1.1 },
  render: { ...DESCRIPTION.render, urdfModelName: "tiago_webots_full" },
  components: [
    ...DESCRIPTION.components.map((component) => (
      component.id === "body"
        ? { ...component, label: "Webots TIAGo mobile manipulator" }
        : component
    )),
    { id: "body/arm", localId: "arm", parentId: "body", label: "Arm", type: "arm", urdfLink: "arm_1_link", urdfJoint: "", providers: [] },
    ...Array.from({ length: 7 }, (_, index) => ({
      id: `body/arm/joint_${index + 1}`,
      localId: `joint_${index + 1}`,
      parentId: "body/arm",
      label: `Joint ${index + 1}`,
      type: "joint",
      urdfLink: "",
      urdfJoint: `arm_${index + 1}_joint`,
      providers: [],
    })),
    { id: "body/arm/gripper", localId: "gripper", parentId: "body/arm", label: "Gripper", type: "gripper", urdfLink: "wrist_ft_tool_link", urdfJoint: "", providers: [] },
  ],
};

const MOBILE_MANIPULATOR_HARDWARE = {
  ...HARDWARE,
  summary: { overall: "ok", total: MOBILE_MANIPULATOR_DESCRIPTION.components.length, ok: MOBILE_MANIPULATOR_DESCRIPTION.components.length, warn: 0, error: 0, stale: 0, unknown: 0 },
  componentHealth: MOBILE_MANIPULATOR_DESCRIPTION.components.map((component) => ({
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

const SOMA_URDF_DESCRIPTION = {
  id: "browser_mesh_robot",
  displayName: "Browser Mesh Robot",
  family: "generic",
  rootPart: "body",
  dimensions: { lengthM: 0.4, widthM: 0.4, heightM: 0.4 },
  render: { mode: "urdf", modelUrl: "", urdfRootLink: "base_link", urdfModelName: "browser_mesh_robot" },
  urdfAssetBaseUrl: "/api/vitals/urdf-assets/test-assets/",
  urdfXml: `
    <robot name="browser_mesh_robot">
      <link name="base_link">
        <visual>
          <geometry>
            <mesh filename="meshes/test.stl"/>
          </geometry>
          <material name="silver"><color rgba="0.75 0.8 0.82 1"/></material>
        </visual>
      </link>
    </robot>
  `,
  components: [
    { id: "body", localId: "body", parentId: "", label: "Browser Mesh Robot", type: "robot", urdfLink: "base_link", urdfJoint: "", providers: [] },
  ],
};

const SOMA_URDF_HARDWARE = {
  ...HARDWARE,
  summary: { overall: "ok", total: 1, ok: 1, warn: 0, error: 0, stale: 0, unknown: 0 },
  componentHealth: [
    { componentId: "body", health: "ok", directHealth: "ok", signalCount: 0, detail: "", sourceComponentId: "body", signalKeys: [] },
  ],
  signals: [],
};

function alertPayload(description, hardware, conditionActive = true) {
  const labels = new Map(description.components.map((component) => [component.id, component.label]));
  const alerts = hardware.componentHealth
    .filter((row) => ["warn", "error", "stale"].includes(row.directHealth))
    .map((row, index) => ({
      id: index + 1,
      sourceType: "component",
      sourceId: row.componentId,
      robotId: description.id,
      label: labels.get(row.componentId) || row.componentId,
      severity: row.directHealth,
      detail: row.detail,
      conditionActive,
      status: conditionActive ? "active" : "recovered",
      firstSeenAtMs: Date.now() - 5000,
      lastSeenAtMs: Date.now(),
      recoveredAtMs: conditionActive ? null : Date.now(),
      resolvedAtMs: null,
      resolvedBy: "",
    }));
  return {
    alerts,
    summary: {
      open: alerts.length,
      active: conditionActive ? alerts.length : 0,
      recovered: conditionActive ? 0 : alerts.length,
    },
    notifyAlertIds: conditionActive ? alerts.map((alert) => alert.id) : [],
  };
}

async function installVitalsSocket(page, description = DESCRIPTION, hardware = HARDWARE) {
  const alerts = alertPayload(description, hardware);
  await page.addInitScript(({ description, hardware, modules, providers, alerts }) => {
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
        window.__vitalsFixtureSocket = this;
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
          { type: "alerts", data: { alerts: [], summary: { open: 0, active: 0, recovered: 0 }, notifyAlertIds: [] } },
          { type: "description", data: description },
          { type: "source", source: "soma", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "hardware", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "modules", state: "ready", updatedAtMs: Date.now() },
          { type: "source", source: "atlas", state: "ready", updatedAtMs: Date.now() },
          { type: "hardware", data: { ...hardware, updatedAtMs: Date.now() } },
          { type: "modules", data: { ...modules, updatedAtMs: Date.now() } },
          { type: "providers", data: { ...providers, updatedAtMs: Date.now() } },
          { type: "alerts", data: alerts },
        ];
        events.forEach((payload, index) => setTimeout(() => {
          this.emit(payload);
        }, 20 + index * 15));
      }

      emit(payload) {
        const event = new MessageEvent("message", { data: JSON.stringify(payload) });
        this.onmessage?.(event);
        this.dispatchEvent(event);
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
    window.__emitVitals = (payload) => window.__vitalsFixtureSocket?.emit(payload);
  }, { description, hardware, modules: MODULES, providers: PROVIDERS, alerts });
}

async function openVitals(page, description = DESCRIPTION, hardware = HARDWARE, dismissAlert = true) {
  await installVitalsSocket(page, description, hardware);
  await page.goto("/");
  await expect(page.locator("#vitalsCredit")).toBeHidden();
  await page.locator("[data-page='vitals']").click();
  await expect(page.locator("#vitalsRobotName")).toHaveText(description.displayName);
  await expect(page.locator("#vitalsCredit")).toBeVisible();
  await expect(page.locator("#vitalsCredit")).toHaveText("Made by Zhenyu Zhang");
  await expect(page.locator("#vitalsSoftwareList .vitals-software-row")).toHaveCount(4);
  const alerts = alertPayload(description, hardware).alerts;
  if (alerts.length) {
    await expect(page.locator("#vitalsWarningLayer")).toBeVisible();
    if (dismissAlert) await page.locator("#vitalsWarningDismiss").click();
  }
}

async function waitForRenderMode(page, mode) {
  await expect.poll(
    () => page.evaluate(() => window.__robonixVitalsDebug.state().renderMode),
  ).toBe(mode);
}

test("renders adaptive robot health workspace", async ({ page }, testInfo) => {
  await openVitals(page);
  await expect.poll(
    () => page.evaluate(() => window.__robonixVitalsDebug.state().modelStats.source),
  ).toBe("procedural");
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("tiago_webots");
  expect(debug.components).toBe(8);
  expect(debug.hardwareSignals).toBe(7);
  expect(debug.renderMode).toBe("procedural");
  expect(debug.proceduralKind).toBe("mobile_robot");
  expect(debug.modelStats.source).toBe("procedural");

  await expect(page.locator("#vitalsOverallHealth")).toHaveText("warn");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("vitals.png"), fullPage: true });

  await page.locator(".vitals-component-row", { hasText: "Battery" }).click();
  await expect(page.locator("#vitalsInspectorTitle")).toHaveText("Battery");
  await expect(page.locator("#vitalsInspectorHealth")).toHaveText("warn");
  await expect(page.locator("#vitalsStageSelection")).toHaveText("Battery");
  const selection = await page.evaluate(() => window.__robonixVitalsDebug.selectionStats());
  expect(selection.componentId).toBe("body/base/battery");
  expect(selection.visible).toBe(true);
  expect(selection.opacity).toBeGreaterThan(0.05);
  expect(selection.volume).toBeGreaterThan(0);

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

test("opens an interruptive warning and focuses its component", async ({ page }) => {
  await openVitals(page, DESCRIPTION, ERROR_HARDWARE, false);
  await expect(page.locator("#vitalsWarningTitle")).toHaveText("Battery");
  await expect(page.locator("#vitalsWarningSeverity")).toHaveText("ERROR");
  await expect(page.locator("#vitalsWarningDetail")).toContainText("controller offline");
  await page.locator("#vitalsWarningInspect").click();
  await expect(page.locator("#vitalsWarningLayer")).toBeHidden();
  await expect(page.locator("#vitalsInspectorTitle")).toHaveText("Battery");
  await expect(page.locator("#vitalsStageSelection")).toHaveText("Battery");
});

test("keeps an incident until recovery and operator confirmation", async ({ page }) => {
  await page.route("**/api/vitals/alerts/1/resolve", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        resolved: { id: 1, status: "resolved" },
        alerts: [],
        summary: { open: 0, active: 0, recovered: 0 },
        notifyAlertIds: [],
      }),
    });
  });
  await openVitals(page);
  await page.locator("#vitalsAlertsOpen").click();
  await expect(page.locator("#vitalsAlertPanelLayer")).toBeVisible();
  await expect(page.locator("#vitalsAlertList .vitals-alert-row")).toHaveCount(1);
  await expect(page.locator(".vitals-alert-action")).toBeDisabled();
  await expect(page.locator(".vitals-alert-action")).toContainText("Still active");

  const recovered = alertPayload(DESCRIPTION, HARDWARE, false);
  await page.evaluate((payload) => window.__emitVitals({ type: "alerts", data: payload }), recovered);
  await expect(page.locator(".vitals-alert-action")).toBeEnabled();
  await expect(page.locator(".vitals-alert-action")).toContainText("Confirm resolved");
  await page.locator(".vitals-alert-action").click();
  await expect(page.locator("#vitalsAlertCount")).toHaveText("0");
  await expect(page.locator("#vitalsAlertList .vitals-alert-row")).toHaveCount(0);
});

test("renders the failed component with a strong red material", async ({ page }) => {
  await openVitals(page, DESCRIPTION, ERROR_HARDWARE);
  await expect.poll(
    () => page.evaluate(() => window.__robonixVitalsDebug.state().modelStats.source),
  ).toBe("procedural");
  const visual = await page.evaluate(
    () => window.__robonixVitalsDebug.componentVisualStats("body/base/battery"),
  );
  expect(visual.materialCount).toBeGreaterThan(0);
  expect(visual.maxRedDominance).toBeGreaterThan(0.2);
  expect(visual.maxEmissiveIntensity).toBeGreaterThan(0.7);
});

test("renders a distinct manipulator family from Soma metadata", async ({ page }) => {
  await openVitals(page, ARM_DESCRIPTION, ARM_HARDWARE);
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("lab_arm");
  expect(debug.components).toBe(5);
  expect(debug.renderMode).toBe("procedural");
  await expect(page.locator("#vitalsOverallHealth")).toHaveText("ok");
  await expect(page.locator(".vitals-component-row", { hasText: "Gripper" })).toHaveCount(1);
  await page.locator(".vitals-component-row", { hasText: "Gripper" }).click();
  await expect(page.locator("#vitalsInspectorHealth")).toHaveText("ok");
  await expect(page.locator("#vitalsInspectorBody")).toContainText("Readinessready");

  const canvas = await page.evaluate(() => window.__robonixVitalsDebug.canvasStats());
  expect(canvas.foregroundSamples).toBeGreaterThan(4);
  expect(canvas.distinctColors).toBeGreaterThan(3);
});

test("renders a disabled actuator yellow without creating an alert", async ({ page }) => {
  await openVitals(page, ARM_DESCRIPTION, IDLE_ARM_HARDWARE);
  await expect(page.locator("#vitalsOverallHealth")).toHaveText("idle");
  await expect(page.locator("#vitalsOverallHealth")).toHaveClass(/idle/);
  await expect(page.locator("#vitalsAlertCount")).toHaveText("0");

  const gripperRow = page.locator(".vitals-component-row", { hasText: "Gripper" });
  await expect(gripperRow.locator(".vitals-status-dot")).toHaveClass(/idle/);
  await gripperRow.click();
  await expect(page.locator("#vitalsInspectorHealth")).toHaveText("idle");
  await expect(page.locator("#vitalsInspectorBody")).toContainText("Aggregate healthok");
  await expect(page.locator("#vitalsInspectorBody")).toContainText("Readinessidle");
  await expect(page.locator("#vitalsInspectorBody .vitals-signal-row .vitals-status-dot")).toHaveClass(/idle/);

  const visual = await page.evaluate(
    () => window.__robonixVitalsDebug.componentVisualStats("body/gripper"),
  );
  expect(visual.materialCount).toBeGreaterThan(0);
  expect(visual.maxYellowDominance).toBeGreaterThan(0.1);
});

test("loads a relative mesh attached to a Soma URDF", async ({ page }) => {
  let assetRequests = 0;
  await page.route("**/api/vitals/urdf-assets/test-assets/meshes/test.stl", async (route) => {
    assetRequests += 1;
    await route.fulfill({ status: 200, contentType: "model/stl", body: ASCII_STL });
  });
  await openVitals(page, SOMA_URDF_DESCRIPTION, SOMA_URDF_HARDWARE);
  await waitForRenderMode(page, "urdf");
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("browser_mesh_robot");
  expect(debug.modelStats.source).toBe("soma:urdf");
  expect(debug.modelStats.meshCount).toBe(1);
  expect(debug.modelStats.mappedComponents).toBe(1);
  expect(assetRequests).toBe(1);
});

test("renders a mobile manipulator with both base and arm", async ({ page }, testInfo) => {
  await openVitals(page, MOBILE_MANIPULATOR_DESCRIPTION, MOBILE_MANIPULATOR_HARDWARE);
  await expect.poll(
    () => page.evaluate(() => window.__robonixVitalsDebug.state().modelStats.source),
  ).toBe("procedural");
  const debug = await page.evaluate(() => window.__robonixVitalsDebug.state());
  expect(debug.robotId).toBe("tiago_webots_full");
  expect(debug.renderMode).toBe("procedural");
  expect(debug.proceduralKind).toBe("mobile_manipulator");
  expect(debug.modelStats.source).toBe("procedural");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: testInfo.outputPath("vitals-full.png"), fullPage: true });
  await expect(page.locator(".vitals-component-row", { hasText: "Left Wheel" })).toHaveCount(1);
  await expect(page.locator(".vitals-component-row", { hasText: "Joint 7" })).toHaveCount(1);
  await expect(page.locator(".vitals-component-row", { hasText: "Gripper" })).toHaveCount(1);

  const canvas = await page.evaluate(() => window.__robonixVitalsDebug.canvasStats());
  expect(canvas.foregroundSamples).toBeGreaterThan(5);
  expect(canvas.distinctColors).toBeGreaterThan(3);
});
