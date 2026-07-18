const path = require("node:path");
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  reporter: "line",
  use: {
    baseURL: "http://127.0.0.1:17861",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    launchOptions: {
      args: ["--use-angle=swiftshader"],
    },
  },
  projects: [
    {
      name: "desktop",
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: "env PYTHONPATH=src ROBONIX_CLIENT_REVERSE_AUDIO=0 .venv/bin/python -m uvicorn robonix_client.app:app --host 127.0.0.1 --port 17861",
    cwd: path.resolve(__dirname, ".."),
    url: "http://127.0.0.1:17861/api/defaults",
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
