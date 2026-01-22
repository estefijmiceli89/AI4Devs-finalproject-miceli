import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.fullNameInput = page.getByPlaceholder(/John Doe/i);
    this.emailInput = page.getByPlaceholder(/you@example.com/i);
    const passwordInputs = page.getAllByPlaceholder(/••••••••/i);
    this.passwordInput = passwordInputs[0];
    this.confirmPasswordInput = passwordInputs[1];
    this.submitButton = page.getByRole("button", { name: /sign up/i });
    this.errorMessage = page.locator(".text-red-600");
  }

  async register(fullName: string, email: string, password: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await this.errorMessage.filter({ hasText: message }).waitFor();
  }
}
