import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://dashboard.softleed.com/auth/login");

  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("imtiazali17314@gmail.com");

  await page.getByRole("textbox", { name: "Password" }).fill("123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://dashboard.softleed.com/");

  await page.waitForTimeout(3000);

  await page.getByRole("button", { name: "profile" }).click();

  await page.getByRole("link", { name: "Log Out" }).click();

  await expect(page).toHaveURL(/auth/);

  await page.waitForTimeout(3000);
});
