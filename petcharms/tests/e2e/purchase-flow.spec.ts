import { test, expect } from "@playwright/test";
import { LandingPage } from "./pages/LandingPage";
import { ProductPage } from "./pages/ProductPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";

test.use({ storageState: "tests/e2e/.auth/storageState.json" });

test.describe("Purchase Flow", () => {
  test("should complete full purchase flow", async ({ page }) => {
    const landingPage = new LandingPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Landing page
    await landingPage.goto("/");
    await landingPage.clickDesignCollar();

    // Step 2: Product page - customize
    await expect(page).toHaveURL(/.*\/product/);
    await productPage.setPetName("MAX");
    await productPage.selectSize("M");
    
    // Wait for product data to load
    await page.waitForTimeout(1000);
    
    await productPage.addToCart();

    // Step 3: Cart page
    await expect(page).toHaveURL(/.*\/cart/);
    await expect(cartPage.orderSummary).toBeVisible();
    await cartPage.goToCheckout();

    // Step 4: Checkout page
    await expect(page).toHaveURL(/.*\/checkout/);
    await checkoutPage.fillForm({
      fullName: "Test User",
      email: "test@example.com",
      address: "123 Test St",
      phone: "1234567890",
    });
    
    await checkoutPage.confirmOrder();

    // Step 5: Confirmation page
    await expect(page).toHaveURL(/.*\/confirmation/);
    await expect(page.getByText(/order confirmed/i)).toBeVisible();
  });
});
