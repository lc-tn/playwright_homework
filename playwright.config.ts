import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: "./tests",
  reporter: "html",
  use: {
    baseURL: "https://demo.testarchitect.com/",
    headless: false,
    viewport: null,
  },

  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
});
