import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class OrdersPage extends BasePage {
  readonly pageHeading: Locator;
  readonly ordersList: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByTestId("orders-page-heading");
    this.ordersList = page.getByTestId("orders-list");
  }

  getOrderCard(index: number): Locator {
    return this.page.getByTestId(`orders-order-card-${index}`);
  }

  getOrderPetName(index: number): Locator {
    return this.page.getByTestId(`orders-order-card-${index}-pet-name`);
  }

  getOrderId(index: number): Locator {
    return this.page.getByTestId(`orders-order-card-${index}-order-id`);
  }

  getOrderSize(index: number): Locator {
    return this.page.getByTestId(`orders-order-card-${index}-size`);
  }

  getOrderCollarColor(index: number): Locator {
    return this.page.getByTestId(`orders-order-card-${index}-collar-color`);
  }

  /** Returns the order card that contains this order id prefix (e.g. first 8 chars). Use this when the new order may not be at index 0. */
  getOrderCardByOrderIdPrefix(prefix8: string): Locator {
    const id = prefix8.slice(0, 8);
    return this.page
      .locator('[data-testid^="orders-order-card-"]')
      .filter({
        has: this.page
          .locator('[data-testid$="-order-id"]')
          .filter({ hasText: id }),
      })
      .first();
  }

  async goToMyOrders() {
    await this.myOrdersLink.click();
  }
}
