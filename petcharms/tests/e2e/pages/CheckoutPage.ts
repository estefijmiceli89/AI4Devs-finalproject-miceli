import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly confirmOrderButton: Locator;
  readonly backToCartLink: Locator;
  readonly checkoutHeading: Locator;
  readonly orderSummaryHeading: Locator;
  readonly orderTotal: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByTestId("checkout-full-name-input");
    this.emailInput = page.getByTestId("checkout-email-input");
    this.addressInput = page.getByTestId("checkout-address-input");
    this.phoneInput = page.getByTestId("checkout-phone-input");
    this.confirmOrderButton = page.getByTestId("checkout-confirm-order-button");
    this.backToCartLink = page.getByTestId("checkout-back-to-cart-link");
    this.checkoutHeading = page.getByTestId("checkout-heading");
    this.orderSummaryHeading = page.getByTestId(
      "checkout-order-summary-heading",
    );
    this.orderTotal = page.getByTestId("checkout-order-total");
  }

  async fillForm(data: {
    fullName: string;
    email: string;
    address: string;
    phone: string;
  }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.addressInput.fill(data.address);
    await this.phoneInput.fill(data.phone);
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }

  async goBackToCart() {
    await this.backToCartLink.click();
  }

  getCheckoutOrderItemProductName(index: number): Locator {
    return this.page.getByTestId(`checkout-order-item-${index}-product-name`);
  }

  getCheckoutOrderItemPetName(index: number): Locator {
    return this.page.getByTestId(`checkout-order-item-${index}-pet-name`);
  }

  getCheckoutOrderItemSize(index: number): Locator {
    return this.page.getByTestId(`checkout-order-item-${index}-size`);
  }

  getCheckoutOrderItemCollarColor(index: number): Locator {
    return this.page.getByTestId(`checkout-order-item-${index}-collar-color`);
  }
}
