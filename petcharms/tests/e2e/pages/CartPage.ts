import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByRole("button", {
      name: /proceed to checkout/i,
    });
    this.emptyCartMessage = page.getByText(/your cart is empty/i);
    this.orderSummary = page.getByText("Order Summary");
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}
