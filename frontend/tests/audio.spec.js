const { test, expect } = require("@playwright/test");

test("device controls reflect active hardware and recover from a failed change", async ({ page }) => {
  const provider = { id: "audio_driver" };
  const settings = { robotHost: "192.0.2.10", micNodeId: provider.id, micDeviceId: "2" };
  let activeInput = "1";
  let failApply = true;
  let lastApply;
  await page.route("**/api/**", (route) => {
    const request = route.request();
    switch (new URL(request.url()).pathname) {
      case "/api/defaults":
        return route.fulfill({ json: settings });
      case "/api/settings":
        return route.fulfill({ json: { ok: true, settings } });
      case "/api/audio-route/providers":
        return route.fulfill({ json: { micProviders: [provider], speakerProviders: [provider] } });
      case "/api/audio-route/devices":
        return route.fulfill({ json: {
          devices: [
            { id: "1", name: "Remote Audio", kind: "input", channels: 2 },
            { id: "2", name: "Remote Audio", kind: "input", channels: 2 },
          ],
          currentInputId: activeInput,
        } });
      case "/api/audio-route/apply":
        lastApply = request.postDataJSON();
        if (failApply) return route.fulfill({ json: { ok: false, error: "device busy" } });
        activeInput = lastApply.inputId;
        return route.fulfill({ json: { ok: true } });
      default:
        return route.fulfill({ json: {} });
    }
  });

  await page.goto("/#audio");
  const devices = page.getByRole("region", { name: "Primitive Devices" });
  const input = devices.getByLabel("Physical Input Device");
  const output = devices.getByLabel("Physical Output Device");
  await expect(input).toHaveValue("1");
  await expect(input.locator("option")).toHaveText(["Remote Audio (2 ch, #1)", "Remote Audio (2 ch, #2)"]);
  await expect(output).toBeDisabled();
  expect(await devices.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);

  await input.selectOption("2");
  await expect(devices.getByRole("status")).toContainText("device busy");
  await expect(input).toHaveValue("1");
  expect(lastApply).toMatchObject({ providerId: provider.id, inputId: "2" });
  expect(lastApply).not.toHaveProperty("outputId");

  failApply = false;
  await input.selectOption("2");
  await expect(devices.getByRole("status")).toHaveText("Saved");
  await expect(input).toHaveValue("2");
});

test("changing the input provider only applies its device and saves after success", async ({ page }) => {
  const providers = [{ id: "audio_a" }, { id: "audio_b" }, { id: "audio_c" }];
  const settings = { robotHost: "192.0.2.10", micNodeId: "audio_a", micDeviceId: "audio_a_1" };
  const applied = [];
  const saved = [];
  let busy = true;
  await page.route("**/api/**", (route) => {
    const request = route.request();
    switch (new URL(request.url()).pathname) {
      case "/api/settings":
        if (request.method() === "PUT") saved.push(request.postDataJSON().settings);
        return route.fulfill({ json: { ok: true, settings } });
      case "/api/audio-route/providers":
        return route.fulfill({ json: { micProviders: providers, speakerProviders: [] } });
      case "/api/audio-route/devices": {
        const id = request.postDataJSON().providerId + "_1";
        return route.fulfill({ json: { devices: [{ id, name: id, kind: "input" }], currentInputId: id } });
      }
      case "/api/audio-route/apply":
        applied.push(request.postDataJSON());
        return route.fulfill({ json: busy ? { ok: false, error: "device busy" } : { ok: true } });
      default:
        return route.fulfill({ json: {} });
    }
  });
  await page.goto("/#audio");
  const mic = page.getByLabel("Input Provider", { exact: true });
  await expect(page.locator("#prim_audio_b_input")).toHaveValue("audio_b_1");

  await mic.selectOption("audio_b");
  await expect(page.locator("#audioRouteStatus")).toContainText("device busy");
  await expect(mic).toHaveValue("audio_a");
  expect(saved).toEqual([]);
  expect(applied.map(({ providerId, inputId, outputId }) => [providerId, inputId, outputId]))
    .toEqual([["audio_b", "audio_b_1", undefined]]);

  busy = false;
  await mic.selectOption("audio_b");
  await expect(page.locator("#audioRouteStatus")).toHaveText("Saved");
  await expect(mic).toHaveValue("audio_b");
  expect(saved).toHaveLength(1);
  expect(saved[0]).toMatchObject({ micNodeId: "audio_b", micDeviceId: "audio_b_1" });
  expect(applied.map(({ providerId }) => providerId)).toEqual(["audio_b", "audio_b"]);
});
