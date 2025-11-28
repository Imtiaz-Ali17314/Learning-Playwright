import { test, expect } from "@playwright/test";

test("Verifing google title", async ({ page }) => {
  await page.goto("https://google.com");

  const url = await page.url();

  const title = await page.title();

  await expect(page).toHaveTitle("Google");
});
