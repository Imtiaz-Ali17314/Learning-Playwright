import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../lib/pages/login.page";

setup("create customer 2 auth", async ({ page }) => {
  const email = "customer2@practicesoftwaretesting.com";
  const password = "welcome01";
  const customer2AuthFile = "./auth/customer2.json";

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  await page.context().storageState({ path: customer2AuthFile });
});
