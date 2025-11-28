import { test, expect } from "@playwright/test";

test.skip("handle JS alert", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", (dialogWindow) => {
    expect(dialogWindow.type()).toContain("alert");

    expect(dialogWindow.message().includes("I am a JS Alert")).toBeTruthy();

    dialogWindow.accept();
  });

  await page.getByRole("button", { name: "Click for JS Alert" }).click();
});

test.skip("handle JS confirm", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", (dialogWindow) => {
    expect(dialogWindow.type()).toContain("confirm");

    expect(dialogWindow.message()).toContain("I am a JS Confirm");

    dialogWindow.dismiss();
  });

  await page.getByText("Click for JS Confirm").click();
});

test("handle JS prompt", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

  page.on("dialog", async (dialogWindow) => {
    expect(dialogWindow.type()).toContain("prompt");

    expect(dialogWindow.message()).toContain("I am a JS prompt");

    dialogWindow.accept("Imtiaz Ali");
  });

  await page.getByText("Click for JS Prompt").click();
});
