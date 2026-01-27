import { test, expect } from "@playwright/test";
import { LandingPage } from "./pages/LandingPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { OrdersPage } from "./pages/OrdersPage";

test.use({ storageState: "tests/e2e/.auth/storageState.json" });

test.describe("Purchase Flow", () => {
  test("should complete full purchase flow", async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new OrderConfirmationPage(page);

    // Step 1: Landing page
    await landingPage.goto("/");
    await landingPage.clickDesignCollar();

    // Step 2: Product page - customize (size L, collar blue)
    await expect(page).toHaveURL(/.*\/product/);
    await productPage.setPetName("MAX");
    await productPage.selectSize("L");
    await productPage.getCollarColorButton("collar-blue").click();

    // Wait for product data to load
    await page.waitForTimeout(1000);

    await productPage.addToCart();
    await productPage.goToCart();

    // Step 3: Cart page — validate pet name, size, color
    await expect(page).toHaveURL(/.*\/cart/);
    await expect(cartPage.orderSummary).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText("MAX");
    await expect(cartPage.getCartItemSize(0)).toHaveText("L");
    await expect(cartPage.getCartItemCollarColor(0)).toHaveText("Blue");
    await cartPage.goToCheckout();

    // Step 4: Checkout page — validate pet name, size, color, product name
    await expect(page).toHaveURL(/.*\/checkout/);
    await expect(checkoutPage.getCheckoutOrderItemProductName(0)).toHaveText(
      "Pet Charm Collar",
    );
    await expect(checkoutPage.getCheckoutOrderItemPetName(0)).toContainText(
      "MAX",
    );
    await expect(checkoutPage.getCheckoutOrderItemSize(0)).toContainText("L");
    await expect(checkoutPage.getCheckoutOrderItemCollarColor(0)).toContainText(
      "Blue",
    );
    await checkoutPage.fillForm({
      fullName: "Test User",
      email: "test@example.com",
      address: "123 Test St",
      phone: "1234567890",
    });

    await checkoutPage.confirmOrder();

    // Step 5: Confirmation page — validate pet name, size, color, product name
    await expect(page).toHaveURL(/.*\/confirmation/);
    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.heading).toContainText(/order confirmed/i);
    await expect(confirmationPage.getOrderItemProductName(0)).toHaveText(
      "Pet Charm Collar",
    );
    await expect(confirmationPage.getOrderItemPetName(0)).toContainText("MAX");
    await expect(confirmationPage.getOrderItemSize(0)).toContainText("L");
    await expect(confirmationPage.getOrderItemCollarColor(0)).toContainText(
      "Blue",
    );
  });

  test("should show new order on My Orders after confirming", async ({
    page,
  }) => {
    const landingPage = new LandingPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new OrderConfirmationPage(page);
    const ordersPage = new OrdersPage(page);

    const petName = "FLUFFY";
    const size = "S";
    const collarColorId = "collar-blue";

    // Step 1: Landing → Product
    await landingPage.goto("/");
    await landingPage.clickDesignCollar();
    await expect(page).toHaveURL(/.*\/product/);

    // Step 2: Customize (pet name, size, collar color)
    await productPage.setPetName(petName);
    await productPage.selectSize(size);
    await productPage.getCollarColorButton(collarColorId).click();
    await page.waitForTimeout(1000);

    await productPage.addToCart();
    await productPage.goToCart();

    // Step 3: Cart — validate pet name, size, color
    await expect(page).toHaveURL(/.*\/cart/);
    await expect(cartPage.orderSummary).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText(petName);
    await expect(cartPage.getCartItemSize(0)).toHaveText(size);
    await expect(cartPage.getCartItemCollarColor(0)).toHaveText("Blue");
    await cartPage.goToCheckout();

    // Step 4: Checkout — validate pet name, size, color, product name
    await expect(page).toHaveURL(/.*\/checkout/);
    await expect(checkoutPage.getCheckoutOrderItemProductName(0)).toHaveText(
      "Pet Charm Collar",
    );
    await expect(checkoutPage.getCheckoutOrderItemPetName(0)).toContainText(
      petName,
    );
    await expect(checkoutPage.getCheckoutOrderItemSize(0)).toContainText(size);
    await expect(checkoutPage.getCheckoutOrderItemCollarColor(0)).toContainText(
      "Blue",
    );
    await checkoutPage.fillForm({
      fullName: "Test User",
      email: "test@example.com",
      address: "123 Test St",
      phone: "1234567890",
    });
    await checkoutPage.confirmOrder();

    // Step 5: Confirmation — validate pet name, size, color, product name
    await expect(page).toHaveURL(/.*\/confirmation/, { timeout: 10000 });
    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.getOrderItemProductName(0)).toHaveText(
      "Pet Charm Collar",
    );
    await expect(confirmationPage.getOrderItemPetName(0)).toContainText(
      petName,
    );
    await expect(confirmationPage.getOrderItemSize(0)).toContainText(size);
    await expect(confirmationPage.getOrderItemCollarColor(0)).toContainText(
      "Blue",
    );
    const orderIdText = await confirmationPage.orderNumber.textContent();
    expect(orderIdText).toBeTruthy();
    const orderIdPrefix = (orderIdText ?? "").trim().toLowerCase();

    // Step 6: Go to My Orders
    await ordersPage.goto("/orders");
    await expect(page).toHaveURL(/.*\/orders/);
    await expect(ordersPage.pageHeading).toHaveText(/my orders/i);
    await expect(ordersPage.ordersList).toBeVisible();

    // Step 7: Orders page — find the new order by id and verify pet name, size, collar color
    const orderId8 = orderIdPrefix.slice(0, 8);
    const newOrderCard = ordersPage.getOrderCardByOrderIdPrefix(orderId8);
    await expect(newOrderCard).toBeVisible();
    await expect(newOrderCard.locator('[data-testid*="-pet-name"]')).toHaveText(
      petName,
    );
    await expect(newOrderCard.locator('[data-testid*="-size"]')).toHaveText(
      size,
    );
    await expect(
      newOrderCard.locator('[data-testid*="-collar-color"]'),
    ).toHaveText(collarColorId);
    await expect(
      newOrderCard.locator('[data-testid*="-order-id"]'),
    ).toContainText(/order id:/i);
    await expect(
      newOrderCard.locator('[data-testid*="-order-id"]'),
    ).toContainText(orderId8);
  });
});
