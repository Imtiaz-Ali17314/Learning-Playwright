import { test, expect } from "@playwright/test";

test("My first test", async ({ page }) => {
  expect(12).toBe(12);
});

test("My second test", async function ({ page }) {
  expect("Imtiaz Ali").toContain("Ali");
});

test.skip("My third test", async function ({ page }) {
  expect([1, 2, 3, 4, 5]).toContain(9);
});

test("My Fourth test", async ({ page }) => {
  expect(true).toBeTruthy();
});
