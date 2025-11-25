import { test, expect } from "@playwright/test";

test("Verifing google title", async ({ page }) => {
  await page.goto("https://google.com");

  const url = await page.url();

  console.log("page url: " + url);

  const title = await page.title();

  console.log("page title: " + title);

  await expect(page).toHaveTitle("Google");
});
