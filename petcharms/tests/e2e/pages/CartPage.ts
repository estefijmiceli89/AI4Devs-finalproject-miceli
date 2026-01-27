import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;
  readonly orderSummary: Locator;
  readonly designNowButton: Locator;
  readonly emptyCartDescription: Locator;
  readonly emptyCartIcon: Locator;
  readonly clearCartButton: Locator;
  readonly emptyCartContainer: Locator;
  readonly subtotal: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutButton = page.getByTestId("proceed-to-checkout-button");
    this.emptyCartMessage = page.getByTestId("empty-cart-message");
    this.orderSummary = page.getByTestId("order-summary-heading");
    this.designNowButton = page.getByTestId("design-now-button");
    this.emptyCartDescription = page.getByTestId("empty-cart-description");
    this.emptyCartIcon = page.getByTestId("empty-cart-icon");
    this.clearCartButton = page.getByTestId("clear-cart-button");
    this.emptyCartContainer = page.getByTestId("empty-cart-container");
    this.subtotal = page.getByTestId("order-subtotal");
    this.total = page.getByTestId("order-total");
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  getCartItemPetName(index: number): Locator {
    return this.page.getByTestId(`cart-item-${index}-pet-name`);
  }

  getCartItemSize(index: number): Locator {
    return this.page.getByTestId(`cart-item-${index}-size`);
  }

  getCartItemCollarColor(index: number): Locator {
    return this.page.getByTestId(`cart-item-${index}-collar-color`);
  }

  getCartItemContainer(index: number): Locator {
    return this.page.getByTestId(`cart-item-container-${index}`);
  }

  getDeleteItemButton(index: number): Locator {
    return this.page.getByTestId(`cart-item-${index}-delete-button`);
  }

  getCartItemsCount(): Promise<number> {
    return this.page.locator('[data-testid^="cart-item-container-"]').count();
  }

  async deleteItem(index: number) {
    const deleteButton = this.getDeleteItemButton(index);
    await deleteButton.click();
  }

  async clearCart() {
    await this.clearCartButton.click();
  }
}
