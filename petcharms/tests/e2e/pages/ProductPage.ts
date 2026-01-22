import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  readonly petNameInput: Locator;
  readonly addToCartButton: Locator;
  readonly sizeButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.petNameInput = page.getByPlaceholder(/LUNA|MAX/i);
    this.addToCartButton = page.getByRole("button", { name: /add to cart/i });
    this.sizeButtons = page.locator(
      'button:has-text("S"), button:has-text("M"), button:has-text("L")',
    );
  }

  async setPetName(name: string) {
    await this.petNameInput.fill(name);
  }

  async selectSize(size: "S" | "M" | "L") {
    const sizeLabel =
      size === "S"
        ? /S\s+\(XS-Small\)/
        : size === "M"
          ? /M\s+\(Medium\)/
          : /L\s+\(Large-XL\)/;
    await this.page.getByRole("button", { name: sizeLabel }).click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
