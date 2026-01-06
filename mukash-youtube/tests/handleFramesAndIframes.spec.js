import { test, expect } from "@playwright/test";

test("handle frames and iframes", async ({ page }) => {
  await page.goto("http://docs.oracle.com/javase/8/docs/api/");

  const iframe = await page.frameLocator("//frame[@name='packageListFrame']");

  await iframe.locator("//a[text()='java.applet']").click();

  await page.pause();
});
