import { test, expect } from "@playwright/test";
import { LandingPage } from "./pages/LandingPage";

test.describe("Landing Page", () => {
  let landingPage: LandingPage;

  test.beforeEach(async ({ page }) => {
    landingPage = new LandingPage(page);
    await landingPage.goto("/");
  });

  test.describe("When logged in", () => {
    test.use({ storageState: "tests/e2e/.auth/storageState.json" });

    test("should display and have clickable header elements when logged in", async () => {
      // Verify all header elements are visible
      await expect(landingPage.logo).toBeVisible();
      await expect(landingPage.shopLink).toBeVisible();
      await expect(landingPage.myOrdersLink).toBeVisible();
      await expect(landingPage.logoutButton).toBeVisible();
      await expect(landingPage.cartLink).toBeVisible();

      // Verify all header elements are clickable
      await expect(landingPage.logo).toBeEnabled();
      await expect(landingPage.shopLink).toBeEnabled();
      await expect(landingPage.myOrdersLink).toBeEnabled();
      await expect(landingPage.logoutButton).toBeEnabled();
      await expect(landingPage.cartLink).toBeEnabled();
    });

    test("should redirect correctly when clicking each header element when logged in", async ({
      page,
    }) => {
      // Test Logo redirects to home page
      await landingPage.logo.click();
      await expect(page).toHaveURL("/");

      // Test Shop link redirects to home page
      await landingPage.shopLink.click();
      await expect(page).toHaveURL("/");

      // Test My Orders link redirects to orders page
      await landingPage.myOrdersLink.click();
      await expect(page).toHaveURL(/.*\/orders/);

      // Navigate back to landing page
      await landingPage.goto("/");

      // Test Cart link redirects to cart page
      await landingPage.cartLink.click();
      await expect(page).toHaveURL(/.*\/cart/);

      // Navigate back to landing page
      await landingPage.goto("/");

      // Test Logout button redirects to home page after logout
      await landingPage.logoutButton.click();

      // Verify logout toast popup is displayed
      await expect(landingPage.logoutToast).toBeVisible();
      await expect(landingPage.logoutToastTitle).toBeVisible();
      await expect(landingPage.logoutToastDescription).toBeVisible();

      // Verify redirect to home page
      await expect(page).toHaveURL("/");
    });
  });

  test.describe("When not logged in", () => {
    test.use({ storageState: undefined });

    test("should display header elements when not logged in", async () => {
      // Verify header elements visible when not logged in
      await expect(landingPage.logo).toBeVisible();
      await expect(landingPage.shopLink).toBeVisible();
      await expect(landingPage.loginLink).toBeVisible();
      await expect(landingPage.cartLink).toBeVisible();

      // Verify elements that should NOT be visible when not logged in
      await expect(landingPage.myOrdersLink).not.toBeVisible();
      await expect(landingPage.logoutButton).not.toBeVisible();
    });

    test("should redirect correctly when clicking header elements when not logged in", async ({
      page,
    }) => {
      // Test Logo redirects to home page
      await landingPage.logo.click();
      await expect(page).toHaveURL("/");

      // Test Shop link redirects to home page
      await landingPage.shopLink.click();
      await expect(page).toHaveURL("/");

      // Test Login link redirects to login page
      await landingPage.loginLink.click();
      await expect(page).toHaveURL(/.*\/login/);

      // Navigate back to landing page
      await landingPage.goto("/");

      // Test Cart link redirects to cart page
      await landingPage.cartLink.click();
      await expect(page).toHaveURL(/.*\/cart/);
    });
  });

  test("should display all elements from Personalized Collars for Furry Friends section", async () => {
    // Verify main heading
    await expect(landingPage.heroHeading).toBeVisible();
    await expect(landingPage.heroHeading).toContainText(
      /personalized collars for/i,
    );
    await expect(landingPage.heroHeading).toContainText(/furry friends/i);

    // Verify description text
    await expect(landingPage.heroDescription).toBeVisible();
    await expect(landingPage.heroDescription).toContainText(
      /create a unique, colorful collar/i,
    );

    // Verify action buttons
    await expect(landingPage.designCollarButton).toBeVisible();
    await expect(landingPage.designCollarButton).toBeEnabled();
    await expect(landingPage.designCollarButton).toContainText(
      /design collar/i,
    );

    await expect(landingPage.seeAllCharmsButton).toBeVisible();
    await expect(landingPage.seeAllCharmsButton).toBeEnabled();
    await expect(landingPage.seeAllCharmsButton).toContainText(
      /see all charms/i,
    );

    // Verify statistics section
    await expect(landingPage.stylesStatLabel).toBeVisible();
    await expect(landingPage.stylesStatLabel).toContainText(/styles/i);
    await expect(landingPage.stylesStatValue).toBeVisible();
    await expect(landingPage.stylesStatValue).toHaveText("1");

    await expect(landingPage.charmShapesStatLabel).toBeVisible();
    await expect(landingPage.charmShapesStatLabel).toContainText(
      /charm shapes/i,
    );
    await expect(landingPage.charmShapesStatValue).toBeVisible();
    // Charm shapes value is dynamic, just verify it's a number
    const charmShapesText =
      await landingPage.charmShapesStatValue.textContent();
    expect(charmShapesText).toMatch(/^\d+$/);

    await expect(landingPage.colorsAvailableStatLabel).toBeVisible();
    await expect(landingPage.colorsAvailableStatLabel).toContainText(
      /colors available/i,
    );
    await expect(landingPage.colorsAvailableStatValue).toBeVisible();
    await expect(landingPage.colorsAvailableStatValue).toHaveText("10");

    // Verify hero image
    await expect(landingPage.heroImage).toBeVisible();
  });

  test("should navigate to shapes section when clicking See All Charms", async () => {
    await landingPage.clickSeeAllCharms();

    // Verify URL contains #shapes hash
    await expect(landingPage.page).toHaveURL(/.*#shapes/);
  });

  test("should navigate to product page when clicking Design Collar", async () => {
    await landingPage.clickDesignCollar();

    await expect(landingPage.page).toHaveURL(/.*\/product/);
  });

  test("should display all elements from Create Your Pet's Unique Look section", async () => {
    // Verify section container
    await expect(landingPage.productSection).toBeVisible();

    // Verify section heading
    await expect(landingPage.productSectionHeading).toBeVisible();
    await expect(landingPage.productSectionHeading).toContainText(
      /create your pet's unique look/i,
    );

    // Verify section description
    await expect(landingPage.productSectionDescription).toBeVisible();
    await expect(landingPage.productSectionDescription).toContainText(
      /choose your pet's name as letters/i,
    );
    await expect(landingPage.productSectionDescription).toContainText(
      /fixed price of just \$15/i,
    );

    // Verify product image
    await expect(landingPage.productImage).toBeVisible();

    // Verify product name
    await expect(landingPage.productName).toBeVisible();
    await expect(landingPage.productName).toContainText(/pet charm collar/i);

    // Verify product description
    await expect(landingPage.productDescription).toBeVisible();
    await expect(landingPage.productDescription).toContainText(
      /personalize your pet's collar/i,
    );

    // Verify price box container
    await expect(landingPage.productPriceBox).toBeVisible();

    // Verify price label
    await expect(landingPage.productPriceLabel).toBeVisible();
    await expect(landingPage.productPriceLabel).toContainText(/fixed price/i);

    // Verify price value
    await expect(landingPage.productPriceValue).toBeVisible();
    await expect(landingPage.productPriceValue).toContainText(/\$15\.00/);

    // Verify features list
    await expect(landingPage.productFeaturesList).toBeVisible();

    // Verify all feature items
    await expect(landingPage.productFeature1).toBeVisible();
    await expect(landingPage.productFeature1).toContainText(
      /custom letters with colors/i,
    );

    await expect(landingPage.productFeature2).toBeVisible();
    await expect(landingPage.productFeature2).toContainText(
      /up to 9 total charm shapes/i,
    );

    await expect(landingPage.productFeature3).toBeVisible();
    await expect(landingPage.productFeature3).toContainText(
      /10 vibrant colors for letters/i,
    );

    await expect(landingPage.productFeature4).toBeVisible();
    await expect(landingPage.productFeature4).toContainText(/3 sizes/i);

    // Verify Start Customizing button
    await expect(landingPage.productStartCustomizingButton).toBeVisible();
    await expect(landingPage.productStartCustomizingButton).toBeEnabled();
    await expect(landingPage.productStartCustomizingButton).toContainText(
      /start customizing/i,
    );

    // Verify footer text
    await expect(landingPage.productFooterText).toBeVisible();
    await expect(landingPage.productFooterText).toContainText(
      /personalize with your pet's name and favorite shapes/i,
    );
  });

  test("should navigate to product page when clicking Start Customizing", async () => {
    // Wait for product section to be visible
    await expect(landingPage.productStartCustomizingButton).toBeVisible();

    // Click on Start Customizing button
    await landingPage.productStartCustomizingButton.click();

    // Verify navigation to product page
    await expect(landingPage.page).toHaveURL(/.*\/product/);
  });

  test("should display all elements from Choose Your Charm Shapes section", async () => {
    // Navigate to shapes section
    await landingPage.clickSeeAllCharms();
    await expect(landingPage.page).toHaveURL(/.*#shapes/);

    // Verify section container is visible
    await expect(landingPage.shapesSection).toBeVisible();

    // Verify section heading
    await expect(landingPage.shapesSectionHeading).toBeVisible();
    await expect(landingPage.shapesSectionHeading).toContainText(
      /choose your charm shapes/i,
    );

    // Verify section description
    await expect(landingPage.shapesSectionDescription).toBeVisible();
    await expect(landingPage.shapesSectionDescription).toContainText(
      /add up to 9 fun charm shapes/i,
    );
    await expect(landingPage.shapesSectionDescription).toContainText(
      /mix with custom letters/i,
    );

    // Verify shapes grid is visible
    await expect(landingPage.shapesGrid).toBeVisible();

    // Verify at least some shape cards are visible (checking for multiple cards)
    const shapeCards = landingPage.page.locator('[data-testid^="shape-card-"]');
    const cardCount = await shapeCards.count();
    expect(cardCount).toBeGreaterThan(0);

    // Verify at least the first few shape cards have their elements visible
    const firstCard = shapeCards.first();
    await expect(firstCard).toBeVisible();

    // Verify Start Designing button is visible and clickable
    await expect(landingPage.shapesStartDesigningButton).toBeVisible();
    await expect(landingPage.shapesStartDesigningButton).toBeEnabled();
    await expect(landingPage.shapesStartDesigningButton).toContainText(
      /start designing/i,
    );
  });

  test("should navigate to product page when clicking Start Designing in shapes section", async () => {
    // Navigate to shapes section
    await landingPage.clickSeeAllCharms();
    await expect(landingPage.page).toHaveURL(/.*#shapes/);

    // Wait for shapes section to load
    await expect(landingPage.shapesStartDesigningButton).toBeVisible();

    // Click on Start Designing button
    await landingPage.shapesStartDesigningButton.click();

    // Verify navigation to product page
    await expect(landingPage.page).toHaveURL(/.*\/product/);
  });

  test("should display all elements from Features section", async () => {
    // Scroll to features section
    await landingPage.featuresSection.scrollIntoViewIfNeeded();

    // Verify features section is visible
    await expect(landingPage.featuresSection).toBeVisible();

    // Verify Fully Customizable feature
    await expect(landingPage.featureFullyCustomizable).toBeVisible();
    await expect(landingPage.featureFullyCustomizableTitle).toBeVisible();
    await expect(landingPage.featureFullyCustomizableTitle).toContainText(
      /fully customizable/i,
    );
    await expect(landingPage.featureFullyCustomizableDescription).toBeVisible();
    await expect(landingPage.featureFullyCustomizableDescription).toContainText(
      /add your pet's name with colored letters/i,
    );

    // Verify Fixed Pricing feature
    await expect(landingPage.featureFixedPricing).toBeVisible();
    await expect(landingPage.featureFixedPricingTitle).toBeVisible();
    await expect(landingPage.featureFixedPricingTitle).toContainText(
      /fixed pricing/i,
    );
    await expect(landingPage.featureFixedPricingDescription).toBeVisible();
    await expect(landingPage.featureFixedPricingDescription).toContainText(
      /one price for all options/i,
    );

    // Verify Made with Love feature
    await expect(landingPage.featureMadeWithLove).toBeVisible();
    await expect(landingPage.featureMadeWithLoveTitle).toBeVisible();
    await expect(landingPage.featureMadeWithLoveTitle).toContainText(
      /made with love/i,
    );
    await expect(landingPage.featureMadeWithLoveDescription).toBeVisible();
    await expect(landingPage.featureMadeWithLoveDescription).toContainText(
      /quality collars designed/i,
    );
  });

  test("should display all elements from CTA section and navigate to product page", async () => {
    // Scroll to CTA section
    await landingPage.ctaSection.scrollIntoViewIfNeeded();

    // Verify CTA section is visible
    await expect(landingPage.ctaSection).toBeVisible();

    // Verify CTA heading
    await expect(landingPage.ctaSectionHeading).toBeVisible();
    await expect(landingPage.ctaSectionHeading).toContainText(
      /ready to make your pet shine/i,
    );

    // Verify CTA description
    await expect(landingPage.ctaSectionDescription).toBeVisible();
    await expect(landingPage.ctaSectionDescription).toContainText(
      /create a custom collar that shows off your pet's unique personality/i,
    );

    // Verify Design Your Collar button
    await expect(landingPage.ctaDesignYourCollarButton).toBeVisible();
    await expect(landingPage.ctaDesignYourCollarButton).toBeEnabled();
    await expect(landingPage.ctaDesignYourCollarButton).toContainText(
      /design your collar/i,
    );

    // Test clicking the button navigates to product page
    await landingPage.ctaDesignYourCollarButton.click();
    await expect(landingPage.page).toHaveURL(/.*\/product/);
  });
});
