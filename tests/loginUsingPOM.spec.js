import { test, expect } from "@playwright/test";

const LoginPage = require("../pages/login");
const DashboardPage = require("../pages/dashboard");

test("Login to the Application using POM", async ({ page }) => {
  await page.goto("http://localhost:8000/auth/login");

  const loginPage = new LoginPage(page);

  await loginPage.loginToApplication();

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.verfingTologin();

  await dashboardPage.logoutFromApplication();

  await page.waitForLoadState("networkidle");
});
