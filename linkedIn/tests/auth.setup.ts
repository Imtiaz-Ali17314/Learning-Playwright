import { test as setup, expect } from "@playwright/test";

setup("create customer 2 auth", async ({ page }) => {
  const email = "customer2@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer2AuthFile = "./linkedIn/auth/customer2.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill(password);
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  await page.context().storageState({ path: customer2AuthFile });
});
