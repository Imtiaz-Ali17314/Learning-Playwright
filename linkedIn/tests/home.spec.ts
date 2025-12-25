import { test, expect } from "@playwright/test";

test.describe("Home Page without an auth", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    const containerGrid = page.locator(".col-md-9");
    await expect(containerGrid.getByRole("link")).toHaveCount(9);
    expect(await containerGrid.getByRole("link").count()).toBe(9);
  });

  test("search for thor hammer", async ({ page }) => {
    const containerGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(containerGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

test.describe("Home Page with customer2 auth", async () => {
  test.use({
    storageState: "./linkedIn/auth/customer2.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("check customer 2 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  });
});
