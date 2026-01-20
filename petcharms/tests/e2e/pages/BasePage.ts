import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("nav");
    this.logo = page.locator('a[href="/"]');
  }

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async expectToast(message: string) {
    await this.page.waitForSelector(`text=${message}`, { timeout: 5000 });
  }
}
