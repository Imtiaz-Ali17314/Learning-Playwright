import { test, expect } from "@playwright/test";

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
