import { test, expect } from "@playwright/test";

test("Home Page", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com");

  // Ensure the sign-in link is present
  await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");

  // Check the title of the page
  await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");

  // Check the count of items displayed
  const containerGrid = page.locator(".col-md-9");
  await expect(containerGrid.getByRole("link")).toHaveCount(9);
  expect(await containerGrid.getByRole("link").count()).toBe(9);

  // Search for Thor Hammer and check the result
  await page.getByTestId("search-query").fill("Thor Hammer");
  await page.getByTestId("search-submit").click();
  await expect(containerGrid.getByRole("link")).toHaveCount(1);
  await expect(page.getByAltText("Thor Hammer")).toBeVisible();
});
