import { test, expect } from "@playwright/test";
import { CartPage } from "./pages/CartPage";
import { ProductPage } from "./pages/ProductPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckoutPage } from "./pages/CheckoutPage";

test.describe("Cart Page", () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    // Navigate to a page first to establish context, then clear cart
    await cartPage.goto("/");
    await page.evaluate(() => {
      localStorage.setItem("cart", "[]");
    });
  });

  test("should display empty cart look and feel", async () => {
    await cartPage.goto("/cart");

    // Verify header is visible
    await expect(cartPage.header).toBeVisible();
    await expect(cartPage.logo).toBeVisible();
    await expect(cartPage.cartLink).toBeVisible();

    // Verify empty cart container is visible
    await expect(cartPage.emptyCartContainer).toBeVisible();

    // Verify empty cart message is visible
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toHaveText(/your cart is empty/i);

    // Verify empty cart description is visible
    await expect(cartPage.emptyCartDescription).toBeVisible();
    await expect(cartPage.emptyCartDescription).toContainText(
      /start designing a custom collar for your pet/i,
    );

    // Verify empty cart icon is visible
    await expect(cartPage.emptyCartIcon).toBeVisible();

    // Verify "Design Now" button is visible
    await expect(cartPage.designNowButton).toBeVisible();
    await expect(cartPage.designNowButton).toContainText(/design now/i);

    // Verify order summary is NOT visible when cart is empty
    await expect(cartPage.orderSummary).not.toBeVisible();

    // Verify checkout button is NOT visible when cart is empty
    await expect(cartPage.checkoutButton).not.toBeVisible();
  });

  test("should navigate to product page when clicking design collar button", async ({
    page,
  }) => {
    await cartPage.goto("/cart");

    // Verify design now button is visible
    await expect(cartPage.designNowButton).toBeVisible();

    // Click on design now button
    await cartPage.designNowButton.click();

    // Verify navigation to product page
    await expect(page).toHaveURL(/.*\/product/);

    // Verify product page content is visible
    const productPage = new ProductPage(page);
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productName).toHaveText("Pet Charm Collar");
  });

  test("should display non-empty cart look and feel", async ({ page }) => {
    // Add an item to cart
    await page.evaluate(() => {
      const cartItem = {
        product_id: "test-product-1",
        product_name: "Pet Charm Collar",
        size: "M",
        collarColor: "collar-blue",
        petName: "LUNA",
        customizations: {
          letters: [
            { letter: "L", colorId: "color-red" },
            { letter: "U", colorId: "color-blue" },
            { letter: "N", colorId: "color-green" },
            { letter: "A", colorId: "color-yellow" },
          ],
          shapes: [{ shapeId: "shape-unicorn" }],
        },
        total_price: 15.0,
      };
      localStorage.setItem("cart", JSON.stringify([cartItem]));
    });

    await cartPage.goto("/cart");

    // Verify header is visible
    await expect(cartPage.header).toBeVisible();
    await expect(cartPage.logo).toBeVisible();
    await expect(cartPage.cartLink).toBeVisible();

    // Verify empty cart message is NOT visible
    await expect(cartPage.emptyCartMessage).not.toBeVisible();

    // Verify order summary is visible
    await expect(cartPage.orderSummary).toBeVisible();

    // Verify checkout button is visible
    await expect(cartPage.checkoutButton).toBeVisible();

    // Verify clear cart button is visible
    await expect(cartPage.clearCartButton).toBeVisible();

    // Verify cart item is visible
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText("LUNA");

    // Verify cart item size is visible
    await expect(cartPage.getCartItemSize(0)).toBeVisible();
    await expect(cartPage.getCartItemSize(0)).toHaveText("M");

    // Verify cart item collar color is visible
    await expect(cartPage.getCartItemCollarColor(0)).toBeVisible();
    await expect(cartPage.getCartItemCollarColor(0)).toHaveText("Blue");

    // Verify delete button is visible
    await expect(cartPage.getDeleteItemButton(0)).toBeVisible();

    // Verify subtotal and total are visible
    await expect(cartPage.subtotal).toBeVisible();
    await expect(cartPage.subtotal).toHaveText("$15.00");

    await expect(cartPage.total).toBeVisible();
    await expect(cartPage.total).toHaveText("$15.00");
  });

  test("should remove item from cart when clicking delete button", async ({
    page,
  }) => {
    // Add two items to cart
    await page.evaluate(() => {
      const cartItems = [
        {
          product_id: "test-product-1",
          product_name: "Pet Charm Collar",
          size: "M",
          collarColor: "collar-blue",
          petName: "LUNA",
          customizations: {
            letters: [{ letter: "L", colorId: "color-red" }],
            shapes: [],
          },
          total_price: 15.0,
        },
        {
          product_id: "test-product-2",
          product_name: "Pet Charm Collar",
          size: "L",
          collarColor: "collar-red",
          petName: "MAX",
          customizations: {
            letters: [{ letter: "M", colorId: "color-blue" }],
            shapes: [],
          },
          total_price: 15.0,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cartItems));
    });

    await cartPage.goto("/cart");

    // Verify both items are visible
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText("LUNA");
    await expect(cartPage.getCartItemPetName(1)).toBeVisible();
    await expect(cartPage.getCartItemPetName(1)).toHaveText("MAX");

    // Verify total shows $30.00 (2 items)
    await expect(cartPage.total).toHaveText("$30.00");

    // Click delete button on first item
    await cartPage.deleteItem(0);

    // Wait for toast notification
    await page.waitForTimeout(500);

    // Verify first item is removed (MAX should now be at index 0)
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText("MAX");

    // Verify LUNA is no longer in cart - there should be only one item left
    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(1);

    // Verify total shows $15.00 (1 item remaining)
    await expect(cartPage.total).toHaveText("$15.00");
  });

  test("should clear all items from cart when clicking clear cart button", async ({
    page,
  }) => {
    // Add multiple items to cart
    await page.evaluate(() => {
      const cartItems = [
        {
          product_id: "test-product-1",
          product_name: "Pet Charm Collar",
          size: "M",
          collarColor: "collar-blue",
          petName: "LUNA",
          customizations: {
            letters: [{ letter: "L", colorId: "color-red" }],
            shapes: [],
          },
          total_price: 15.0,
        },
        {
          product_id: "test-product-2",
          product_name: "Pet Charm Collar",
          size: "L",
          collarColor: "collar-red",
          petName: "MAX",
          customizations: {
            letters: [{ letter: "M", colorId: "color-blue" }],
            shapes: [],
          },
          total_price: 15.0,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cartItems));
    });

    await cartPage.goto("/cart");

    // Verify items are visible
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(1)).toBeVisible();

    // Verify clear cart button is visible
    await expect(cartPage.clearCartButton).toBeVisible();

    // Click clear cart button
    await cartPage.clearCart();

    // Wait for toast notification
    await page.waitForTimeout(500);

    // Verify empty cart message is now visible
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.emptyCartMessage).toHaveText(/your cart is empty/i);

    // Verify order summary is no longer visible
    await expect(cartPage.orderSummary).not.toBeVisible();

    // Verify checkout button is no longer visible
    await expect(cartPage.checkoutButton).not.toBeVisible();

    // Verify design now button is visible
    await expect(cartPage.designNowButton).toBeVisible();
  });

  test("should calculate subtotal and total correctly with multiple items", async ({
    page,
  }) => {
    // Add multiple items to cart with different prices
    await page.evaluate(() => {
      const cartItems = [
        {
          product_id: "test-product-1",
          product_name: "Pet Charm Collar",
          size: "S",
          collarColor: "collar-blue",
          petName: "LUNA",
          customizations: {
            letters: [{ letter: "L", colorId: "color-red" }],
            shapes: [],
          },
          total_price: 15.0,
        },
        {
          product_id: "test-product-2",
          product_name: "Pet Charm Collar",
          size: "M",
          collarColor: "collar-red",
          petName: "MAX",
          customizations: {
            letters: [{ letter: "M", colorId: "color-blue" }],
            shapes: [{ shapeId: "shape-unicorn" }],
          },
          total_price: 15.0,
        },
        {
          product_id: "test-product-3",
          product_name: "Pet Charm Collar",
          size: "L",
          collarColor: "collar-green",
          petName: "BELLA",
          customizations: {
            letters: [
              { letter: "B", colorId: "color-red" },
              { letter: "E", colorId: "color-blue" },
            ],
            shapes: [
              { shapeId: "shape-unicorn" },
              { shapeId: "shape-angel-wings" },
            ],
          },
          total_price: 15.0,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cartItems));
    });

    await cartPage.goto("/cart");

    // Verify all items are visible
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText("LUNA");
    await expect(cartPage.getCartItemPetName(1)).toBeVisible();
    await expect(cartPage.getCartItemPetName(1)).toHaveText("MAX");
    await expect(cartPage.getCartItemPetName(2)).toBeVisible();
    await expect(cartPage.getCartItemPetName(2)).toHaveText("BELLA");

    // Verify subtotal is correct (3 items × $15.00 = $45.00)
    await expect(cartPage.subtotal).toBeVisible();
    await expect(cartPage.subtotal).toHaveText("$45.00");

    // Verify total is correct (should match subtotal since shipping is free)
    await expect(cartPage.total).toBeVisible();
    await expect(cartPage.total).toHaveText("$45.00");

    // Verify order summary is visible
    await expect(cartPage.orderSummary).toBeVisible();
  });

  test("should show login screen when clicking proceed to checkout without login", async ({
    page,
  }) => {
    // Add an item to cart
    await page.evaluate(() => {
      const cartItem = {
        product_id: "test-product-1",
        product_name: "Pet Charm Collar",
        size: "M",
        collarColor: "collar-blue",
        petName: "LUNA",
        customizations: {
          letters: [{ letter: "L", colorId: "color-red" }],
          shapes: [],
        },
        total_price: 15.0,
      };
      localStorage.setItem("cart", JSON.stringify([cartItem]));
    });

    await cartPage.goto("/cart");

    // Verify checkout button is visible
    await expect(cartPage.checkoutButton).toBeVisible();

    // Click proceed to checkout
    await cartPage.goToCheckout();

    // Verify navigation to login page
    await expect(page).toHaveURL(/.*\/login/);

    // Verify login page is displayed
    const loginPage = new LoginPage(page);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();

    // Verify redirect parameter is in URL
    const url = page.url();
    expect(url).toContain("redirect=/checkout");

    // Login with test credentials
    const email = process.env.E2E_TEST_EMAIL || "test@example.com";
    const password = process.env.E2E_TEST_PASSWORD || "testpassword123";
    await loginPage.login(email, password);

    // Verify navigation to checkout page after login
    await expect(page).toHaveURL(/.*\/checkout/);

    // Verify checkout page is displayed
    const checkoutPage = new CheckoutPage(page);
    await expect(checkoutPage.fullNameInput).toBeVisible();
    await expect(checkoutPage.emailInput).toBeVisible();
    await expect(checkoutPage.addressInput).toBeVisible();
    await expect(checkoutPage.phoneInput).toBeVisible();
    await expect(checkoutPage.confirmOrderButton).toBeVisible();
  });

  test.describe("When logged in", () => {
    test.use({ storageState: "tests/e2e/.auth/storageState.json" });

    test("should show checkout screen when clicking proceed to checkout with login", async ({
      page,
    }) => {
      // Add an item to cart
      await page.evaluate(() => {
        const cartItem = {
          product_id: "test-product-1",
          product_name: "Pet Charm Collar",
          size: "M",
          collarColor: "collar-blue",
          petName: "LUNA",
          customizations: {
            letters: [{ letter: "L", colorId: "color-red" }],
            shapes: [],
          },
          total_price: 15.0,
        };
        localStorage.setItem("cart", JSON.stringify([cartItem]));
      });

      await cartPage.goto("/cart");

      // Verify checkout button is visible
      await expect(cartPage.checkoutButton).toBeVisible();

      // Click proceed to checkout
      await cartPage.goToCheckout();

      // Verify navigation to checkout page
      await expect(page).toHaveURL(/.*\/checkout/);

      // Verify checkout page is displayed
      const checkoutPage = new CheckoutPage(page);
      await expect(checkoutPage.fullNameInput).toBeVisible();
      await expect(checkoutPage.emailInput).toBeVisible();
      await expect(checkoutPage.addressInput).toBeVisible();
      await expect(checkoutPage.phoneInput).toBeVisible();
      await expect(checkoutPage.confirmOrderButton).toBeVisible();
    });
  });
});
