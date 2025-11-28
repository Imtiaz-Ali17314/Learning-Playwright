import { test, expect } from "@playwright/test";

const loginData = JSON.parse(JSON.stringify(require("../login.json")));

test("Login test", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://dashboard.softleed.com/auth/login");

  await page.getByPlaceholder("Email").fill(loginData.email, { delay: 300 });

  await page.getByLabel("Password").fill(loginData.password, { delay: 200 });

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://dashboard.softleed.com/");
  await page.waitForLoadState("networkidle");

  const profile = page.getByAltText("profile");
  await expect(profile).toBeVisible();
  await profile.click();

  await page.locator(':text("Log Out")').click();

  await expect(page).toHaveURL(/auth/);
});
