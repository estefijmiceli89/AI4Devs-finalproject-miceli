import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LandingPage extends BasePage {
  readonly designCollarButton: Locator;
  readonly seeAllCharmsButton: Locator;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.designCollarButton = page.getByRole("link", {
      name: /design collar/i,
    });
    this.seeAllCharmsButton = page.getByRole("link", {
      name: /see all charms/i,
    });
    this.heroHeading = page.getByRole("heading", { level: 1 });
  }

  async clickDesignCollar() {
    await this.designCollarButton.click();
  }

  async clickSeeAllCharms() {
    await this.seeAllCharmsButton.click();
  }
}
