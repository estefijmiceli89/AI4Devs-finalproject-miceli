import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly confirmOrderButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByLabel(/full name/i);
    this.emailInput = page.getByLabel(/email/i);
    this.addressInput = page.getByLabel(/shipping address/i);
    this.phoneInput = page.getByLabel(/phone/i);
    this.confirmOrderButton = page.getByRole("button", {
      name: /confirm order/i,
    });
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
}
