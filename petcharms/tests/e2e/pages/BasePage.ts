import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly header: Locator;
  readonly logo: Locator;
  readonly shopLink: Locator;
  readonly myOrdersLink: Locator;
  readonly logoutButton: Locator;
  readonly loginLink: Locator;
  readonly cartLink: Locator;
  readonly logoutToast: Locator;
  readonly logoutToastTitle: Locator;
  readonly logoutToastDescription: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId("header-nav");
    this.logo = page.getByTestId("header-logo");
    this.shopLink = page.getByTestId("header-shop-link");
    this.myOrdersLink = page.getByTestId("header-my-orders-link");
    this.logoutButton = page.getByTestId("header-logout-button");
    this.loginLink = page.getByTestId("header-login-link");
    this.cartLink = page.getByTestId("header-cart-link");
    this.logoutToast = page
      .locator('li[role="status"][data-state="open"]')
      .filter({ hasText: "Logged out" })
      .first();
    this.logoutToastTitle = this.logoutToast.getByText("Logged out", {
      exact: true,
    });
    this.logoutToastDescription = this.logoutToast.getByText(
      "You have been logged out successfully.",
      { exact: true },
    );
  }

  async goto(path: string = "/") {
    await this.page.goto(path);
  }

  async expectToast(message: string) {
    await this.page.waitForSelector(`text=${message}`, { timeout: 5000 });
  }
}
