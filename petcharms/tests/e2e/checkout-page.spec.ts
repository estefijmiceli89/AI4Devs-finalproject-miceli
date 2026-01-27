import { test, expect } from "@playwright/test";
import { CheckoutPage } from "./pages/CheckoutPage";
import { CartPage } from "./pages/CartPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";

test.describe("Checkout Page", () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page);
    // Navigate to a page first to establish context, then add item to cart
    await checkoutPage.goto("/");
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
  });

  test("should display checkout page look and feel", async () => {
    await checkoutPage.goto("/checkout");

    // Verify checkout heading is visible
    await expect(checkoutPage.checkoutHeading).toBeVisible();
    await expect(checkoutPage.checkoutHeading).toHaveText("Checkout");

    // Verify back to cart link is visible
    await expect(checkoutPage.backToCartLink).toBeVisible();
    await expect(checkoutPage.backToCartLink).toContainText(/back to cart/i);

    // Verify order summary heading is visible
    await expect(checkoutPage.orderSummaryHeading).toBeVisible();
    await expect(checkoutPage.orderSummaryHeading).toHaveText("Order Summary");

    // Verify order total is visible
    await expect(checkoutPage.orderTotal).toBeVisible();
    await expect(checkoutPage.orderTotal).toHaveText("$15.00");

    // Verify form fields are visible
    await expect(checkoutPage.fullNameInput).toBeVisible();
    await expect(checkoutPage.emailInput).toBeVisible();
    await expect(checkoutPage.addressInput).toBeVisible();
    await expect(checkoutPage.phoneInput).toBeVisible();

    // Verify confirm order button is visible
    await expect(checkoutPage.confirmOrderButton).toBeVisible();
    await expect(checkoutPage.confirmOrderButton).toContainText(
      /confirm order/i,
    );
  });

  test.describe("When logged in", () => {
    test.use({ storageState: "tests/e2e/.auth/storageState.json" });

    test("should prefill email with logged email", async () => {
      await checkoutPage.goto("/checkout");

      // Verify email input is visible
      await expect(checkoutPage.emailInput).toBeVisible();

      // Verify email is prefilled (should contain @ symbol indicating an email)
      const emailValue = await checkoutPage.emailInput.inputValue();
      expect(emailValue).toContain("@");
      expect(emailValue.length).toBeGreaterThan(0);
    });

    test("should fill in all fields and click on confirm order", async ({
      page,
    }) => {
      await checkoutPage.goto("/checkout");

      // Fill in all form fields
      await checkoutPage.fillForm({
        fullName: "John Doe",
        email: "john@example.com",
        address: "123 Main St, City, State, ZIP Code",
        phone: "15551234567",
      });

      // Verify all fields are filled
      await expect(checkoutPage.fullNameInput).toHaveValue("John Doe");
      await expect(checkoutPage.emailInput).toHaveValue("john@example.com");
      await expect(checkoutPage.addressInput).toHaveValue(
        "123 Main St, City, State, ZIP Code",
      );
      await expect(checkoutPage.phoneInput).toHaveValue("15551234567");

      // Click confirm order button
      await checkoutPage.confirmOrder();

      // Wait for navigation to confirmation page
      await expect(page).toHaveURL(/.*\/confirmation/, { timeout: 10000 });
    });

    test("should show confirmation page after confirming order", async ({
      page,
    }) => {
      await checkoutPage.goto("/checkout");

      // Fill in all form fields
      await checkoutPage.fillForm({
        fullName: "Jane Smith",
        email: "jane@example.com",
        address: "456 Oak Avenue, Springfield, IL 62701",
        phone: "15559876543",
      });

      // Click confirm order button
      await checkoutPage.confirmOrder();

      // Wait for navigation to confirmation page
      await expect(page).toHaveURL(/.*\/confirmation/, { timeout: 10000 });

      // Verify confirmation page is displayed
      const confirmationPage = new OrderConfirmationPage(page);
      await expect(confirmationPage.heading).toBeVisible();
      await expect(confirmationPage.heading).toHaveText(/order confirmed/i);

      // Verify success icon is visible
      await expect(confirmationPage.successIcon).toBeVisible();

      // Verify thank you message is visible
      await expect(confirmationPage.thankYouMessage).toBeVisible();
      await expect(confirmationPage.thankYouMessage).toContainText(
        /thank you for your purchase/i,
      );

      // Verify order number is visible
      await expect(confirmationPage.orderNumber).toBeVisible();
      const orderNumber = await confirmationPage.orderNumber.textContent();
      expect(orderNumber).toBeTruthy();
      expect(orderNumber?.length).toBeGreaterThan(0);

      // Verify email confirmation message is visible
      await expect(confirmationPage.emailMessage).toBeVisible();
    });
  });

  test("should navigate to cart when clicking back to cart button", async ({
    page,
  }) => {
    await checkoutPage.goto("/checkout");

    // Verify back to cart link is visible
    await expect(checkoutPage.backToCartLink).toBeVisible();

    // Click back to cart link
    await checkoutPage.goBackToCart();

    // Verify navigation to cart page
    await expect(page).toHaveURL(/.*\/cart/);

    // Verify cart page is displayed
    const cartPage = new CartPage(page);
    await expect(cartPage.orderSummary).toBeVisible();
  });
});
