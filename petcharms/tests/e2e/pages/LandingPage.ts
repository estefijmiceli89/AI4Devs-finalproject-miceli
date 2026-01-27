import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {
  readonly designCollarButton: Locator;
  readonly seeAllCharmsButton: Locator;
  readonly heroHeading: Locator;
  readonly heroDescription: Locator;
  readonly stylesStatLabel: Locator;
  readonly stylesStatValue: Locator;
  readonly charmShapesStatLabel: Locator;
  readonly charmShapesStatValue: Locator;
  readonly colorsAvailableStatLabel: Locator;
  readonly colorsAvailableStatValue: Locator;
  readonly heroImage: Locator;
  readonly productSection: Locator;
  readonly productSectionHeading: Locator;
  readonly productSectionDescription: Locator;
  readonly productImage: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPriceBox: Locator;
  readonly productPriceLabel: Locator;
  readonly productPriceValue: Locator;
  readonly productFeaturesList: Locator;
  readonly productFeature1: Locator;
  readonly productFeature2: Locator;
  readonly productFeature3: Locator;
  readonly productFeature4: Locator;
  readonly productStartCustomizingButton: Locator;
  readonly productFooterText: Locator;
  readonly shapesSection: Locator;
  readonly shapesSectionHeading: Locator;
  readonly shapesSectionDescription: Locator;
  readonly shapesGrid: Locator;
  readonly shapesStartDesigningButton: Locator;
  readonly featuresSection: Locator;
  readonly featureFullyCustomizable: Locator;
  readonly featureFullyCustomizableTitle: Locator;
  readonly featureFullyCustomizableDescription: Locator;
  readonly featureFixedPricing: Locator;
  readonly featureFixedPricingTitle: Locator;
  readonly featureFixedPricingDescription: Locator;
  readonly featureMadeWithLove: Locator;
  readonly featureMadeWithLoveTitle: Locator;
  readonly featureMadeWithLoveDescription: Locator;
  readonly ctaSection: Locator;
  readonly ctaSectionHeading: Locator;
  readonly ctaSectionDescription: Locator;
  readonly ctaDesignYourCollarButton: Locator;

  constructor(page: Page) {
    super(page);
    this.designCollarButton = page.getByTestId("design-collar-button");
    this.seeAllCharmsButton = page.getByTestId("see-all-charms-button");
    this.heroHeading = page.getByTestId("hero-heading");
    this.heroDescription = page.getByTestId("hero-description");
    this.stylesStatLabel = page.getByTestId("stat-styles-label");
    this.stylesStatValue = page.getByTestId("stat-styles-value");
    this.charmShapesStatLabel = page.getByTestId("stat-charm-shapes-label");
    this.charmShapesStatValue = page.getByTestId("stat-charm-shapes-value");
    this.colorsAvailableStatLabel = page.getByTestId(
      "stat-colors-available-label",
    );
    this.colorsAvailableStatValue = page.getByTestId(
      "stat-colors-available-value",
    );
    this.heroImage = page.getByTestId("hero-image");
    this.productSection = page.getByTestId("product-section");
    this.productSectionHeading = page.getByTestId("product-section-heading");
    this.productSectionDescription = page.getByTestId(
      "product-section-description",
    );
    this.productImage = page.getByTestId("product-image");
    this.productName = page.getByTestId("product-name");
    this.productDescription = page.getByTestId("product-description");
    this.productPriceBox = page.getByTestId("product-price-box");
    this.productPriceLabel = page.getByTestId("product-price-label");
    this.productPriceValue = page.getByTestId("product-price-value");
    this.productFeaturesList = page.getByTestId("product-features-list");
    this.productFeature1 = page.getByTestId("product-feature-1");
    this.productFeature2 = page.getByTestId("product-feature-2");
    this.productFeature3 = page.getByTestId("product-feature-3");
    this.productFeature4 = page.getByTestId("product-feature-4");
    this.productStartCustomizingButton = page.getByTestId(
      "product-start-customizing-button",
    );
    this.productFooterText = page.getByTestId("product-footer-text");
    this.shapesSection = page.getByTestId("shapes-section");
    this.shapesSectionHeading = page.getByTestId("shapes-section-heading");
    this.shapesSectionDescription = page.getByTestId(
      "shapes-section-description",
    );
    this.shapesGrid = page.getByTestId("shapes-grid");
    this.shapesStartDesigningButton = page.getByTestId(
      "shapes-start-designing-button",
    );
    this.featuresSection = page.getByTestId("features-section");
    this.featureFullyCustomizable = page.getByTestId(
      "feature-fully-customizable",
    );
    this.featureFullyCustomizableTitle = page.getByTestId(
      "feature-fully-customizable-title",
    );
    this.featureFullyCustomizableDescription = page.getByTestId(
      "feature-fully-customizable-description",
    );
    this.featureFixedPricing = page.getByTestId("feature-fixed-pricing");
    this.featureFixedPricingTitle = page.getByTestId(
      "feature-fixed-pricing-title",
    );
    this.featureFixedPricingDescription = page.getByTestId(
      "feature-fixed-pricing-description",
    );
    this.featureMadeWithLove = page.getByTestId("feature-made-with-love");
    this.featureMadeWithLoveTitle = page.getByTestId(
      "feature-made-with-love-title",
    );
    this.featureMadeWithLoveDescription = page.getByTestId(
      "feature-made-with-love-description",
    );
    this.ctaSection = page.getByTestId("cta-section");
    this.ctaSectionHeading = page.getByTestId("cta-section-heading");
    this.ctaSectionDescription = page.getByTestId("cta-section-description");
    this.ctaDesignYourCollarButton = page.getByTestId(
      "cta-design-your-collar-button",
    );
  }

  async clickDesignCollar() {
    await this.designCollarButton.click();
  }

  async clickSeeAllCharms() {
    await this.seeAllCharmsButton.click();
  }
}
