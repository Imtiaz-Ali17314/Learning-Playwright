import { test, expect } from "@playwright/test";

test("handle keyboard events", async ({ page }) => {
  await page.goto("https://www.google.com/");

  await page.locator("textarea[name='q']").click();
  await page.locator("textarea[name='q']").focus();

  await page.keyboard.type(
    "Hello world! this is Imtiaz Ali, a passionate tester."
  );

  await page.keyboard.press("ArrowLeft");

  for (let i = 0; i < "tester".length; i++) {
    await page.keyboard.press("Backspace");
  }

  await page.keyboard.type("web developer", { delay: 100 });

  for (let i = 0; i < " web developer".length; i++) {
    await page.keyboard.press("ArrowLeft");
  }

  await page.keyboard.down("Shift");

  for (let i = 0; i < " passionate".length; i++) {
    await page.keyboard.press("ArrowLeft");
  }

  await page.keyboard.up("Shift");

  await page.keyboard.press("Backspace");
});
