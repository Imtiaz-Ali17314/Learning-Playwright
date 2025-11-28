import { test, expect } from "@playwright/test";
import { log } from "console";

const loginData = JSON.parse(JSON.stringify(require("../usersLogin.json")));

test.describe("Data driven login test", () => {
  for (const data of loginData) {
    test.describe(`Login with user ${data.id}`, () => {
      test("Login test", async ({ page }) => {
        test.setTimeout(60000);

        await page.goto("http://localhost:8000/auth/login");

        await page
          .getByRole("textbox", { name: "Email address" })
          .fill(data.email);

        await page
          .getByRole("textbox", { name: "Password" })
          .fill(data.password);

        await page.getByRole("button", { name: "Login" }).click();

        await expect(page).toHaveURL("http://localhost:8000/");
        await page.waitForLoadState("networkidle");
      });
    });
  }
});
