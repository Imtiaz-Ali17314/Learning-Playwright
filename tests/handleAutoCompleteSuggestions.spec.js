import { test, expect } from "@playwright/test";

test.skip("handel auto complete suggestions using Keyboard", async ({
  page,
}) => {
  await page.goto("https://www.google.com/");

  await page.locator("textarea[name='q']").click();

  await page.locator("textarea[name='q']").fill("playwright");

  await page.waitForTimeout(1000);

  await page.waitForSelector("//li[@role='presentation']");

  await page.keyboard.press("ArrowDown");

  await page.keyboard.press("ArrowDown");

  await page.waitForTimeout(2000);

  await page.keyboard.press("Enter");
});

test("handel auto complete suggestions using Loop", async ({ page }) => {
  await page.goto("https://www.google.com/");

  await page.locator("textarea[name='q']").click();

  await page.locator("textarea[name='q']").fill("playwright");

  await page.waitForTimeout(1000);

  await page.waitForSelector("//li[@role='presentation']");

  const suggestions = await page.$$("//li[@role='presentation']");

  for (let i = 0; i < suggestions.length; i++) {
    const text = await suggestions[i].textContent();
    if (text.includes("documentation")) {
      await suggestions[i].click();
      break;
    }
  }
});
