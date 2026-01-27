import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrderConfirmationPage extends BasePage {
  readonly successIcon: Locator;
  readonly heading: Locator;
  readonly thankYouMessage: Locator;
  readonly orderNumber: Locator;
  readonly emailMessage: Locator;
  readonly whatsNextSection: Locator;
  readonly whatsNextHeading: Locator;
  readonly orderConfirmedStep: Locator;
  readonly orderConfirmedDescription: Locator;
  readonly preparingOrderStep: Locator;
  readonly preparingOrderDescription: Locator;
  readonly deliveryStep: Locator;
  readonly deliveryDescription: Locator;
  readonly shippingSection: Locator;
  readonly shippingHeading: Locator;
  readonly shippingName: Locator;
  readonly shippingAddress: Locator;
  readonly orderSummarySection: Locator;
  readonly orderSummaryHeading: Locator;
  readonly subtotalLabel: Locator;
  readonly subtotalValue: Locator;
  readonly shippingLabel: Locator;
  readonly shippingValue: Locator;
  readonly totalLabel: Locator;
  readonly totalValue: Locator;
  readonly createAnotherNecklaceButton: Locator;
  readonly backToHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.successIcon = page.getByTestId("confirmation-success-icon");
    this.heading = page.getByTestId("confirmation-heading");
    this.thankYouMessage = page.getByTestId("confirmation-thank-you-message");
    this.orderNumber = page.getByTestId("confirmation-order-number");
    this.emailMessage = page.getByTestId("confirmation-email-message");
    this.whatsNextSection = page.getByTestId("confirmation-whats-next-section");
    this.whatsNextHeading = page.getByTestId("confirmation-whats-next-heading");
    this.orderConfirmedStep = page.getByTestId(
      "confirmation-order-confirmed-step",
    );
    this.orderConfirmedDescription = page.getByTestId(
      "confirmation-order-confirmed-description",
    );
    this.preparingOrderStep = page.getByTestId(
      "confirmation-preparing-order-step",
    );
    this.preparingOrderDescription = page.getByTestId(
      "confirmation-preparing-order-description",
    );
    this.deliveryStep = page.getByTestId("confirmation-delivery-step");
    this.deliveryDescription = page.getByTestId(
      "confirmation-delivery-description",
    );
    this.shippingSection = page.getByTestId("confirmation-shipping-section");
    this.shippingHeading = page.getByTestId("confirmation-shipping-heading");
    this.shippingName = page.getByTestId("confirmation-shipping-name");
    this.shippingAddress = page.getByTestId("confirmation-shipping-address");
    this.orderSummarySection = page.getByTestId(
      "confirmation-order-summary-section",
    );
    this.orderSummaryHeading = page.getByTestId(
      "confirmation-order-summary-heading",
    );
    this.subtotalLabel = page.getByTestId("confirmation-subtotal-label");
    this.subtotalValue = page.getByTestId("confirmation-subtotal-value");
    this.shippingLabel = page.getByTestId("confirmation-shipping-label");
    this.shippingValue = page.getByTestId("confirmation-shipping-value");
    this.totalLabel = page.getByTestId("confirmation-total-label");
    this.totalValue = page.getByTestId("confirmation-total-value");
    this.createAnotherNecklaceButton = page.getByTestId(
      "confirmation-create-another-necklace-button",
    );
    this.backToHomeButton = page.getByTestId(
      "confirmation-back-to-home-button",
    );
  }

  getOrderItem(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}`);
  }

  getOrderItemProductName(index: number): Locator {
    return this.page.getByTestId(
      `confirmation-order-item-${index}-product-name`,
    );
  }

  getOrderItemPetName(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}-pet-name`);
  }

  getOrderItemSize(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}-size`);
  }

  getOrderItemCollarColor(index: number): Locator {
    return this.page.getByTestId(
      `confirmation-order-item-${index}-collar-color`,
    );
  }

  getOrderItemLetters(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}-letters`);
  }

  getOrderItemShapes(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}-shapes`);
  }

  getOrderItemPrice(index: number): Locator {
    return this.page.getByTestId(`confirmation-order-item-${index}-price`);
  }

  async getOrderItemsCount(): Promise<number> {
    // Count only container elements (confirmation-order-item-0, confirmation-order-item-1, etc.)
    // but not child elements (confirmation-order-item-0-product-name, etc.)
    return this.page.evaluate(() => {
      const allElements = document.querySelectorAll(
        '[data-testid^="confirmation-order-item-"]',
      );
      let count = 0;
      allElements.forEach((element) => {
        const testId = element.getAttribute("data-testid");
        // Match pattern: confirmation-order-item-{number} exactly (no additional hyphens)
        if (testId && /^confirmation-order-item-\d+$/.test(testId)) {
          count++;
        }
      });
      return count;
    });
  }

  async clickCreateAnotherNecklace() {
    await this.createAnotherNecklaceButton.click();
  }

  async clickBackToHome() {
    await this.backToHomeButton.click();
  }
}
