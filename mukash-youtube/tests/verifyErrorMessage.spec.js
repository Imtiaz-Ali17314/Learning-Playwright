import { test, expect } from "@playwright/test";

test("Verify error message", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://dashboard.softleed.com/auth/login");

  await page
    .getByPlaceholder("Email")
    .type("imtiazali17314@gmail.com", { delay: 300 });

  await page.getByLabel("Password").type("12323", { delay: 200 });

  await page.locator('span:has-text("Login")').click();

  const errorMessage = await page
    .locator("//h4[contains(@class,'text-danger fw-normal')]")
    .textContent();

  // await expect(errorMessage).toContain("credentials do not match");

  await expect(errorMessage.includes("do not match")).toBeTruthy();

  await page.waitForTimeout(3000);
});
