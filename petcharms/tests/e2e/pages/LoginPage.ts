import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder(/you@example.com/i);
    this.passwordInput = page.getByPlaceholder(/••••••••/i);
    this.submitButton = page.getByRole("button", { name: /sign in/i });
    this.errorMessage = page.locator("p.text-red-600");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await this.errorMessage.filter({ hasText: message }).waitFor();
  }
}
