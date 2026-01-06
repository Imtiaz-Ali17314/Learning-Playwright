import { test, expect } from "@playwright/test";

test("work with multiple tabs", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://freelance-learn-automation.vercel.app/login");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),

    page.locator("(//a[contains(@href ,'facebook')])[1]").click(),
  ]);

  await newPage.locator("(//input[@name='email'])[2]").fill("abc@gmail.com");

  await page.waitForTimeout(2000);

  await newPage.close();

  await page.waitForTimeout(3000);

  await page.locator("#email1").fill("imtiaz.inwork@gmail.com");

  await page.waitForTimeout(2000);
});
