import { test, expect } from "@playwright/test";

test.describe("Challenge 1", () => {
  test.use({ storageState: "./auth/customer2.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("by now pay later", async ({ page }) => {
    await page.getByText("Bolt Cutters").click();
    await expect(page.locator('[data-test="product-name"]')).toContainText(
      "Bolt Cutters"
    );
    await page.getByTestId("add-to-cart").click();

    await expect(page.getByTestId("cart-quantity")).toHaveText("1");

    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();
    await expect(
      page.locator("div.step-indicator").filter({ hasText: "2" })
    ).toHaveCSS("background-color", "rgb(51, 153, 51)");
    await expect(page.getByTestId("proceed-3")).toBeDisabled();

    await page.getByTestId("street").fill("Test street 654");
    await page.getByTestId("city").fill("Frankfurt");
    await page.getByTestId("state").fill("Nagar");
    await page.getByTestId("country").fill("Germany");
    await page.getByTestId("postal_code").fill("7600");
    await page.getByTestId("proceed-3").click();

    await expect(page.getByTestId("finish")).toBeDisabled();
    await page.getByTestId("payment-method").selectOption("cash-on-delivery");
    await page.getByTestId("finish").click();

    await expect(page.getByTestId("payment-success-message")).toContainText(
      "Payment was successful"
    );
  });
});

test.describe("API Challenge", () => {
  test.use({ storageState: "./auth/customer2.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("Get /product/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(
      `${apiUrl}/products/search?q=thor%20hammer`
    );

    expect(getProductResponse.status()).toBe(200);

    const prductBody = await getProductResponse.json();
    const productId = prductBody.data[0].id;

    const response = await request.get(`${apiUrl}/products/${productId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_location_offer).toBe(false);
    expect(body.name).toBe("Thor Hammer");
    expect(body.price).toBe(11.14);

  });
});
