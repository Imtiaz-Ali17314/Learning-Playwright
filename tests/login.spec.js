import { test, expect } from "@playwright/test";
import { waitForDebugger } from "inspector";

test("Login test", async ({ page }) => {
  test.setTimeout(60000);

  await page.goto("https://dashboard.softleed.com/auth/login");

  await page
    .getByPlaceholder("Email")
    .type("imtiazali17314@gmail.com", { delay: 300 });

  await page.getByLabel("Password").type("123", { delay: 200 });

  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(5000);

  await expect(page).toHaveURL("https://dashboard.softleed.com/");

  await page.waitForTimeout(3000);
});
