import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  readonly petNameInput: Locator;
  readonly addToCartButton: Locator;
  readonly sizeButtons: Locator;
  readonly productImage: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly priceBox: Locator;
  readonly priceLabel: Locator;
  readonly priceValue: Locator;
  readonly sizeSelectorLabel: Locator;
  readonly sizeSButton: Locator;
  readonly sizeMButton: Locator;
  readonly sizeLButton: Locator;
  readonly collarColorLabel: Locator;
  readonly collarColorButtons: Locator;
  readonly petNameLabel: Locator;
  readonly shapeCharmsLabel: Locator;
  readonly shapeCharmsGrid: Locator;
  readonly backToShopLink: Locator;
  readonly backToHomeLink: Locator;
  readonly livePreviewSection: Locator;
  readonly customCollarHeading: Locator;
  readonly measurementsChart: Locator;
  readonly measurementsChartHeading: Locator;
  readonly collarCharmsPreview: Locator;
  readonly collarBand: Locator;
  readonly shapeButtons: Locator;
  readonly letterSpans: Locator;
  readonly shapeCharms: Locator;
  readonly errorToast: Locator;
  readonly errorToastTitle: Locator;
  readonly errorToastDescription: Locator;
  readonly maxCharmsErrorToast: Locator;
  readonly maxCharmsErrorToastTitle: Locator;
  readonly maxCharmsErrorToastDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.petNameInput = page.getByTestId("pet-name-input");
    this.addToCartButton = page.getByTestId("add-to-cart-button");
    this.sizeButtons = page.locator('[data-testid^="size-"]');
    this.productImage = page.getByTestId("product-image");
    this.productName = page.getByTestId("product-name");
    this.productDescription = page.getByTestId("product-description");
    this.priceBox = page.getByTestId("price-box");
    this.priceLabel = page.getByTestId("price-label");
    this.priceValue = page.getByTestId("price-value");
    this.sizeSelectorLabel = page.getByTestId("size-selector-label");
    this.sizeSButton = page.getByTestId("size-S-button");
    this.sizeMButton = page.getByTestId("size-M-button");
    this.sizeLButton = page.getByTestId("size-L-button");
    this.collarColorLabel = page.getByTestId("collar-color-label");
    this.collarColorButtons = page.locator('[data-testid^="collar-color-"]');
    this.petNameLabel = page.getByTestId("pet-name-label");
    this.shapeCharmsLabel = page.getByTestId("shape-charms-label");
    this.shapeCharmsGrid = page.getByTestId("shape-charms-grid");
    this.backToShopLink = page.getByTestId("back-to-shop-link");
    this.backToHomeLink = page.getByTestId("back-to-home-link");
    this.customCollarHeading = page.getByTestId("custom-collar-heading");
    this.livePreviewSection = page.getByTestId("live-preview-section");
    this.measurementsChartHeading = page.getByTestId(
      "measurements-chart-heading",
    );
    this.measurementsChart = page.getByTestId("measurements-chart");
    this.collarCharmsPreview = page.getByTestId("collar-charms-preview");
    this.collarBand = page.getByTestId("collar-band");
    this.shapeButtons = page.locator('[data-testid^="shape-button-"]');
    this.letterSpans = this.collarCharmsPreview.locator("span");
    this.shapeCharms = this.collarCharmsPreview.locator("div");
    this.errorToast = page.getByTestId("error-toast-add-customizations");
    this.errorToastTitle = page.getByTestId(
      "error-toast-add-customizations-title",
    );
    this.errorToastDescription = page.getByTestId(
      "error-toast-add-customizations-description",
    );
    this.maxCharmsErrorToast = page.getByTestId("error-toast-max-charms");
    this.maxCharmsErrorToastTitle = page.getByTestId(
      "error-toast-max-charms-title",
    );
    this.maxCharmsErrorToastDescription = page.getByTestId(
      "error-toast-max-charms-description",
    );
  }

  getShapeButton(shapeId: string): Locator {
    return this.page.getByTestId(`shape-button-${shapeId}`);
  }

  getCollarColorButton(colorId: string): Locator {
    return this.page.getByTestId(`collar-color-${colorId}`);
  }

  getLetterColorButton(letterIndex: number, colorId: string): Locator {
    return this.page.getByTestId(`letter-${letterIndex}-color-${colorId}`);
  }

  async waitForLetterColorPickers(letterIndex: number): Promise<void> {
    await this.page.waitForSelector(
      `[data-testid^="letter-${letterIndex}-color-"]`,
      {
        timeout: 5000,
      },
    );
  }

  getLetterInCollar(letter: string): Locator {
    return this.letterSpans.filter({ hasText: letter }).first();
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
