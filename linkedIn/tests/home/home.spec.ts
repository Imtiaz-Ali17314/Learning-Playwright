import { test, expect } from "@playwright/test";

test.describe("Home Page without an auth", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("Visual Test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    const containerGrid = page.locator(".col-md-9");
    await expect(containerGrid.getByRole("link")).toHaveCount(9);
    expect(await containerGrid.getByRole("link").count()).toBe(9);
  });

  test("search for thor hammer", async ({ page }) => {
    const containerGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(containerGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

test.describe("Home Page with customer2 auth", async () => {
  test.use({
    storageState: "./auth/customer2.json",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("Visual Test Authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer2.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check customer 2 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe");
  });

  test("validate product data is visible in UI from API", async ({ page }) => {
    let products: any;
    test.step("intercept /products", async () => {
      await page.route(
        "https://api.practicesoftwaretesting.com/products**",
        async (route) => {
          const response = await route.fetch();
          products = await response.json();
          route.continue();
        }
      );
    });

    await page.goto("/");

    await expect(page.locator(".skeleton").first()).not.toBeVisible();

    const productsGrid = page.locator(".col-md-9");

    for (const product of products.data) {
      await expect(productsGrid).toContainText(product.name);
      await expect(productsGrid).toContainText(product.price.toString());
    }
  });
});

test("validate product data is visible in UI from modified API", async ({
  page,
}) => {
  test.step("overwrite /products", async () => {
    await page.route(
      "https://api.practicesoftwaretesting.com/products**",
      async (route) => {
        const response = await route.fetch();
        const json = await response.json();
        json.data[0]["name"] = "Mocked Product";
        json.data[0]["price"] = 12300.03;
        json.data[0]["in_stock"] = false;

        await route.fulfill({ response, json });
      }
    );
  });

  await page.goto("/");

  const productsGrid = page.locator(".col-md-9");

  await expect(productsGrid.getByRole("link").first()).toContainText(
    "Mocked Product"
  );

  await expect(productsGrid.getByRole("link").first()).toContainText(
    "12300.03"
  );

  await expect(productsGrid.getByRole("link").first()).toContainText(
    "Out of stock"
  );
});

test("validate product data is loaded from HAR file", async ({ page }) => {
  test.step("Mock /products", async () => {
    await page.routeFromHAR(".har/products.har", {
      url: "https://api.practicesoftwaretesting.com/products**",
      update: false,
    });
  });

  await page.goto("/");
  const productsGrid = page.locator(".col-md-9");
  await expect(productsGrid).toContainText("Happy path pliers");
  await expect(productsGrid).toContainText("1.99");
});
