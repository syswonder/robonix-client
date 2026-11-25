const { test, expect } = require("@playwright/test");

const browserSettings = { robotHost: "192.0.2.10", atlasPort: 50092 };
const serverSettings = { robotHost: "192.0.2.20", atlasPort: 50093 };
const launchDefaults = { robotHost: "192.0.2.30", atlasPort: 50094, atlasEndpoint: "192.0.2.30:50094" };

async function mockSettings(page, defaults, getSaved, onSave = () => {}) {
  await page.addInitScript((saved) => {
    if (!localStorage.getItem("robonix.settings")) {
      localStorage.setItem("robonix.settings", JSON.stringify(saved));
    }
  }, browserSettings);
  await page.route("**/api/**", (route) => {
    const request = route.request();
    switch (new URL(request.url()).pathname) {
      case "/api/defaults":
        return route.fulfill({ json: defaults });
      case "/api/settings":
        if (request.method() === "PUT") onSave(request.postDataJSON().settings);
        return route.fulfill({ json: { ok: true, settings: getSaved(), path: "settings.yaml" } });
      case "/api/audio-route/providers":
        return route.fulfill({ json: { micProviders: [], speakerProviders: [] } });
      default:
        return route.fulfill({ json: {} });
    }
  });
}

async function openSettings(page, host, port, reload = false) {
  const firstConnection = page.waitForRequest((request) => new URL(request.url()).pathname === "/api/system");
  if (reload) await page.reload();
  else await page.goto("/#settings");
  const endpoint = `${host}:${port}`;
  expect(new URL((await firstConnection).url()).searchParams.get("atlas")).toBe(endpoint);
  await expect(page.locator("#robotHostSettings")).toHaveValue(host);
  await expect(page.locator("#atlasPortSettings")).toHaveValue(String(port));
  await expect(page.locator("#atlasEndpointDisplay")).toHaveText(endpoint);
}

test("CLI host overrides saved hosts without writing it back during other saves", async ({ page }) => {
  const defaults = { ...launchDefaults, launchOverrides: ["ROBONIX_ROBOT_HOST"] };
  let saved = serverSettings;
  await mockSettings(page, defaults, () => saved, (settings) => { saved = settings; });
  await openSettings(page, launchDefaults.robotHost, serverSettings.atlasPort);
  await expect(page.locator("#primitiveCardsContainer")).toContainText("No audio primitives discovered");
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("robonix.settings")).robotHost))
    .toBe(browserSettings.robotHost);

  await page.locator("#settingsUserId").fill("voice:test");
  await page.locator("#saveClientSettings").click();
  await expect(page.locator("#settingsStatus")).toContainText("Saved to settings.yaml");
  expect(saved).toMatchObject({ ...serverSettings, userId: "voice:test" });
  await expect(page.locator("#robotHostSettings")).toHaveValue(launchDefaults.robotHost);

  defaults.launchOverrides = [];
  await openSettings(page, serverSettings.robotHost, serverSettings.atlasPort, true);
});

test("CLI port takes priority independently, with browser settings as fallback", async ({ page }) => {
  const defaults = { ...launchDefaults, launchOverrides: ["ROBONIX_ATLAS_PORT"] };
  await mockSettings(page, defaults, () => ({}));
  await openSettings(page, browserSettings.robotHost, launchDefaults.atlasPort);
  await expect(page.locator("#primitiveCardsContainer")).toContainText("No audio primitives discovered");

  defaults.launchOverrides = [];
  await openSettings(page, browserSettings.robotHost, browserSettings.atlasPort, true);
});
