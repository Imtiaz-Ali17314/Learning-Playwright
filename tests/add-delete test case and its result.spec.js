import { test, expect } from "@playwright/test";

test("add-delete test case and its result", async ({ page }) => {
  test.setTimeout(60000 * 3);

  await page.goto("http://localhost:8000/auth/login");

  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("imtiazali17314@gmail.com");

  await page.getByRole("textbox", { name: "Password" }).fill("123");

  await page.getByRole("checkbox", { name: "Remember me" }).check();

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("http://localhost:8000/");

  await page.waitForLoadState("domcontentloaded");

  await page.getByRole("link", { name: "Test Cases" }).click();
  await page.getByRole("link", { name: "󰐕 Add New" }).click();

  await expect(page).toHaveURL("http://localhost:8000/add-test-case");

  await page.waitForLoadState("networkidle");

  await page.locator('select[name="test_document_id"]').selectOption("1");
  await page.locator('select[name="version"]').selectOption("1");

  await page.locator('input[name="feature_name"]').fill("Playwright ");
  await page.locator('input[name="actions"]').fill("practice");

  await page
    .locator("div")
    .filter({ hasText: /^Select POV$/ })
    .click();
  await page.getByRole("textbox", { name: "Select POV" }).fill("Playwright");
  await page.getByRole("textbox", { name: "Select POV" }).press("Enter");

  await page.getByText("Select Test Case Name").click();
  await page
    .getByRole("textbox", { name: "Select Test Case Name" })
    .fill("Practice");
  await page
    .getByRole("textbox", { name: "Select Test Case Name" })
    .press("Enter");

  await page.locator("#desc").fill("playwright");

  await page
    .locator("#test_steps_editor_ifr")
    .contentFrame()
    .locator("html")
    .click();
  await page
    .locator("#test_steps_editor_ifr")
    .contentFrame()
    .getByLabel("Rich Text Area. Press ALT-0")
    .type("playwright", { delay: 100 });

  await page
    .locator("#expected_result_editor_ifr")
    .contentFrame()
    .locator("html")
    .click();
  await page
    .locator("#expected_result_editor_ifr")
    .contentFrame()
    .getByLabel("Rich Text Area. Press ALT-0")
    .type("palywright", { delay: 100 });

  await page.getByRole("button", { name: "Save" }).click();

  // Wait longer for the app to complete save and redirect to the list page
  await expect(page).toHaveURL("http://localhost:8000/show-test-cases", {
    timeout: 30000,
  });

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Add Result" }).first().click();

  await expect(page).toHaveURL(/add/);

  await page.waitForLoadState("networkidle");

  await page
    .locator('iframe[title="Rich Text Area"]')
    .contentFrame()
    .locator("html")
    .click();
  await page
    .locator('iframe[title="Rich Text Area"]')
    .contentFrame()
    .getByLabel("Rich Text Area. Press ALT-0")
    .type("I am Practicing playwright right know..");

  await page.locator("#statusPass").check();

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page).toHaveURL("http://localhost:8000/show-test-results");

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "󰆴" }).first().click();
  await page.getByRole("button", { name: "Yes, Delete it!" }).click();

  await page.goto("http://localhost:8000/show-test-results");

  await page.waitForLoadState("networkidle");

  await page.getByRole("link", { name: "Test Cases" }).click();

  await expect(page).toHaveURL("http://localhost:8000/show-test-cases");

  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "󰆴" }).first().click();
  await page.getByRole("button", { name: "Yes, Delete it!" }).click();

  await page.goto("http://localhost:8000/show-test-cases", {
    setTimeout: 30000,
  });
});
