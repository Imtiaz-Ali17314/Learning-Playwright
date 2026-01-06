import { test, expect } from "@playwright/test";

const LoginPage = require("../pages/login");
const DashboardPage = require("../pages/dashboard");
const loginData = JSON.parse(JSON.stringify(require("../login.json")));

test("Login to the Application using POM", async ({ page }) => {
  await page.goto("http://localhost:8000/auth/login");

  const loginPage = new LoginPage(page);

  await loginPage.loginToApplication(loginData.email, loginData.password);

  const dashboardPage = new DashboardPage(page);

  await dashboardPage.verfingTologin();

  await dashboardPage.logoutFromApplication();

  await page.waitForLoadState("networkidle");
});
