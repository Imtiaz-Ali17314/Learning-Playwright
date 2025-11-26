import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("http://localhost:8000/auth/login");

  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("imtiazali17314@gmail.com");

  await page.getByRole("textbox", { name: "Password" }).fill("123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("http://localhost:8000/");

  await page.getByRole("link", { name: "Test Cases" }).click();
  await page.getByRole("link", { name: "󰐕 Add New" }).click();

  await expect(page).toHaveURL("http://localhost:8000/add-test-case");

  await page
    .locator("div")
    .filter({ hasText: /^Select POV$/ })
    .click();
  await page.getByText("Finaling the App").click();

  await page.waitForTimeout(1000);

  await page
    .locator("div")
    .filter({ hasText: /^Finaling the App$/ })
    .click();
  await page.locator("span").filter({ hasText: "Hello" }).first().click();

  await page.waitForTimeout(1000);

  await page.getByText("Hello").first().click();
  await page.locator("span").filter({ hasText: "testing" }).nth(2).click();

  await page.waitForTimeout(1000);

  await page.getByText("testing").first().click();
  await page.locator("span").filter({ hasText: "employee" }).first().click();

  await page.waitForTimeout(1000);

  await page
    .locator("div")
    .filter({ hasText: /^Select Test Case Name$/ })
    .click();
  await page.locator("span").filter({ hasText: "Practice" }).first().click();

  await page.waitForTimeout(1000);

  await page
    .locator("div")
    .filter({ hasText: /^Practice$/ })
    .click();
  await page.locator("span").filter({ hasText: "Testing App" }).nth(2).click();

  await page.waitForTimeout(1000);

  await page.getByText("Testing App").nth(1).click();
  await page.locator("span").filter({ hasText: "checking" }).nth(2).click();

  await page.waitForTimeout(1000);

  await page.getByText("checking").nth(1).click();
  await page.locator("span").filter({ hasText: "Bot Status" }).first().click();

  await page.waitForTimeout(1000);

  await page.getByText("Bot Status").first().click();
  await page
    .locator("span")
    .filter({ hasText: "Patient Database" })
    .nth(2)
    .click();

  await page.waitForTimeout(1000);

  await page.getByText("Patient Database").first().click();
  await page
    .locator("span")
    .filter({ hasText: "Manage Booking Provider" })
    .first()
    .click();
});
