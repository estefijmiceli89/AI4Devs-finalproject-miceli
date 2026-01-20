import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

const authFile = "tests/e2e/.auth/storageState.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.goto("/login");
  
  const email = process.env.E2E_TEST_EMAIL || "test@example.com";
  const password = process.env.E2E_TEST_PASSWORD || "testpassword123";
  
  await loginPage.login(email, password);
  
  // Wait for navigation to orders page (successful login)
  await page.waitForURL("**/orders", { timeout: 10000 });
  
  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
