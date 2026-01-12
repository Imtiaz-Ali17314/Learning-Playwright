import { test, expect } from "@fixtures/page.fixture";
import { LoginPage } from "@pages/login.page";
import { registerUser } from "@dataFactory/register";

test("Login without Page Object", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/");
  await page.locator('[data-test="nav-sign-in"]').click();
  await page
    .locator('[data-test="email"]')
    .fill("customer2@practicesoftwaretesting.com");
  await page.locator('[data-test="password"]').fill("welcome01");
  await page.locator('[data-test="login-submit"]').click();
  await expect(page.locator('[data-test="nav-menu"]')).toContainText(
    "Jack Howe"
  );
  await expect(page.locator('[data-test="page-title"]')).toContainText(
    "My account"
  );
});

test("Login with Page Object", async ({ page }) => {
  const email = "customer2@practicesoftwaretesting.com";
  const password = "welcome01";

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("Login with newly registered user", async ({ page }) => {
  const email = `test1${Date.now()}@gmail.com`;
  const password = "TessssssT@123";

  await registerUser(email, password);

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Imtiaz Ali");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});

test("Login with fixture", async ({ page, loginPage }) => {
  const email = `test1${Date.now()}@gmail.com`;
  const password = "TessssssT@123";

  await registerUser(email, password);

  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.getByTestId("nav-menu")).toContainText("Imtiaz Ali");
  await expect(page.getByTestId("page-title")).toContainText("My account");
});
