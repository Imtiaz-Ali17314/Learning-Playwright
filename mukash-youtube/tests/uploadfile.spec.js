import { test, expect } from "@playwright/test";

test("upload profile picture", async ({ page }) => {
  test.setTimeout(60000 * 2);

  await page.goto("https://tracklo.net/auth/login");

  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("imtiazali17314@gmail.com");

  await page.getByRole("textbox", { name: "Password" }).fill("12345678");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/tracklo.net/);

  await page.getByRole("button", { name: "pro" }).click();

  await page.getByRole("link", { name: "Edit Profile" }).click();

  await page
    .locator('input[type="file"]')
    .setInputFiles("C:/Users/hp/Pictures/Photos_4793F5T2ye.png");

  await page.waitForTimeout(5000);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page).toHaveURL(/user/);

  await page.waitForTimeout(5000);

  await page.getByRole("link", { name: "location_home My Dashboard" }).click();

  await page.goto("https://tracklo.net/my-dashboard");

  await page.waitForTimeout(8000);
});
