import { test, expect } from "@playwright/test";
import { LandingPage } from "./pages/LandingPage";

test.describe("Landing Page", () => {
  test("should display main heading", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto("/");

    await expect(landingPage.heroHeading).toBeVisible();
  });

  test("should navigate to product page when clicking Design Collar", async ({
    page,
  }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto("/");

    await landingPage.clickDesignCollar();

    await expect(page).toHaveURL(/.*\/product/);
  });

  test("should display product section", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto("/");

    await expect(
      page.getByText(/create your pet's unique look/i),
    ).toBeVisible();
  });
});
