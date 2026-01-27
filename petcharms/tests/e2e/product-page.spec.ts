import { test, expect } from "@playwright/test";
import { ProductPage } from "./pages/ProductPage";
import { LandingPage } from "./pages/LandingPage";
import { CartPage } from "./pages/CartPage";

test.describe("Product Page", () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto("/product");
  });

  test("should display all key elements with correct look and feel", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Verify header is visible
    await expect(productPage.header).toBeVisible();
    await expect(productPage.logo).toBeVisible();
    await expect(productPage.cartLink).toBeVisible();

    // Verify "Back to home" link is visible with expected content
    await expect(productPage.backToHomeLink).toBeVisible();
    await expect(productPage.backToHomeLink).toContainText(/back to home/i);

    // Verify product image is visible
    await expect(productPage.productImage).toBeVisible();

    // Verify product name is visible with expected content
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productName).toHaveText("Pet Charm Collar");

    // Verify product description is visible with expected content
    await expect(productPage.productDescription).toBeVisible();
    await expect(productPage.productDescription).toContainText(
      /personalize your pet's collar with custom letters/i,
    );
    await expect(productPage.productDescription).toContainText(
      /create a unique look for your furry friend/i,
    );

    // Verify price box is visible with correct styling and content
    await expect(productPage.priceBox).toBeVisible();
    await expect(productPage.priceLabel).toBeVisible();
    await expect(productPage.priceLabel).toHaveText(
      "Fixed Price (All Options)",
    );
    await expect(productPage.priceValue).toBeVisible();
    await expect(productPage.priceValue).toHaveText("$15.00");

    // Verify size selector section with expected content
    await expect(productPage.sizeSelectorLabel).toBeVisible();
    await expect(productPage.sizeSelectorLabel).toHaveText("Select Size");
    await expect(productPage.sizeSButton).toBeVisible();
    await expect(productPage.sizeSButton).toContainText(/S\s*\(XS-Small\)/i);
    await expect(productPage.sizeMButton).toBeVisible();
    await expect(productPage.sizeMButton).toContainText(/M\s*\(Medium\)/i);
    await expect(productPage.sizeLButton).toBeVisible();
    await expect(productPage.sizeLButton).toContainText(/L\s*\(Large-XL\)/i);

    // Verify collar color selector section with expected content
    await expect(productPage.collarColorLabel).toBeVisible();
    await expect(productPage.collarColorLabel).toHaveText(
      "Select Collar Color",
    );
    const colorButtonCount = await productPage.collarColorButtons.count();
    expect(colorButtonCount).toBeGreaterThan(0);

    // Verify pet name input section with expected content
    await expect(productPage.petNameLabel).toBeVisible();
    await expect(productPage.petNameLabel).toContainText(/pet name.*letters/i);
    await expect(productPage.petNameLabel).toContainText(/total max.*charms/i);
    await expect(productPage.petNameInput).toBeVisible();
    await expect(productPage.petNameInput).toBeEnabled();
    await expect(productPage.petNameInput).toHaveAttribute(
      "placeholder",
      /LUNA.*MAX.*BELLA/i,
    );

    // Verify shape charms section with expected content
    await expect(productPage.shapeCharmsLabel).toBeVisible();
    await expect(productPage.shapeCharmsLabel).toContainText(/shape charms/i);
    await expect(productPage.shapeCharmsGrid).toBeVisible();

    // Verify at least some shape buttons are visible
    const shapeButtonCount = await productPage.shapeButtons.count();
    expect(shapeButtonCount).toBeGreaterThan(0);

    // Verify Add to Cart button with expected content
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();
    await expect(productPage.addToCartButton).toContainText(/add to cart/i);

    // Verify Back to Shop link with expected content
    await expect(productPage.backToShopLink).toBeVisible();
    await expect(productPage.backToShopLink).toContainText(/back to shop/i);

    // Verify live preview section with expected content
    await expect(productPage.livePreviewSection).toBeVisible();
    await expect(productPage.customCollarHeading).toBeVisible();
    await expect(productPage.customCollarHeading).toContainText(
      /your custom collar/i,
    );

    // Verify measurements chart with expected content
    await expect(productPage.measurementsChartHeading).toBeVisible();
    await expect(productPage.measurementsChartHeading).toHaveText(
      "TABLA DE MEDIDAS",
    );
    await expect(productPage.measurementsChart).toBeVisible();

    // Verify measurements chart has all size information with expected content
    const measurementsText = await productPage.measurementsChart.textContent();
    expect(measurementsText).toContain("TALLA S:");
    expect(measurementsText).toContain("25-40 cm");
    expect(measurementsText).toContain("TALLA M:");
    expect(measurementsText).toContain("35-46 cm");
    expect(measurementsText).toContain("TALLA L:");
    expect(measurementsText).toContain("40-56 cm");
    expect(measurementsText).toContain("TALLA XL:");
    expect(measurementsText).toContain("50-66 cm");
  });

  test("should navigate to landing page when clicking back to shop link", async ({
    page,
  }) => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Verify back to shop link is visible
    await expect(productPage.backToShopLink).toBeVisible();

    // Click on back to shop link
    await productPage.backToShopLink.click();

    // Verify navigation to landing page
    await expect(page).toHaveURL("/");

    // Verify landing page content is visible
    const landingPage = new LandingPage(page);
    await expect(landingPage.heroHeading).toBeVisible();
    await expect(landingPage.heroHeading).toContainText(
      "Personalized Collars for Furry Friends",
    );
  });

  test("should display typed text in the collar preview", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Verify pet name input is visible
    await expect(productPage.petNameInput).toBeVisible();

    // Type text in the pet name input
    const testPetName = "LUNA";
    await productPage.setPetName(testPetName);

    // Verify the text appears in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);
  });

  test("should remove all letters by clicking on them in the collar preview", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Type text in the pet name input
    const testPetName = "LUNA";
    await productPage.setPetName(testPetName);

    // Verify the text appears in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);

    // Get all letter spans in the collar preview
    let letterCount = await productPage.letterSpans.count();

    // Click on each letter to remove it, starting from the last one
    // (removing from end to beginning avoids index shifting issues)
    while (letterCount > 0) {
      // Get the last letter before clicking
      const lastLetter = productPage.letterSpans.nth(letterCount - 1);
      // Click on the last letter
      await lastLetter.click();
      // Wait for the letter to be removed from the DOM
      await lastLetter.waitFor({ state: "detached" }).catch(() => {
        // If already detached, that's fine
      });
      // Re-get the count
      letterCount = await productPage.letterSpans.count();
    }

    // Verify the collar is empty (no letters remaining)
    await expect(productPage.letterSpans).toHaveCount(0);

    // Verify the input is also empty
    await expect(productPage.petNameInput).toHaveValue("");
  });

  test("should display shape charm on collar when clicking on it", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Wait for shape charms grid to be visible
    await expect(productPage.shapeCharmsGrid).toBeVisible();

    // Find and click on the first available shape charm button
    // Using shape-unicorn as a specific example (emoji: 🦄)
    const unicornShapeButton = productPage.getShapeButton("shape-unicorn");
    await expect(unicornShapeButton).toBeVisible();
    await expect(unicornShapeButton).toBeEnabled();

    // Get the emoji from the button to verify it appears in the collar
    const unicornEmoji = "🦄";
    await expect(unicornShapeButton).toContainText(unicornEmoji);

    // Click on the shape charm button
    await unicornShapeButton.click();

    // Verify the shape charm emoji appears in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText(unicornEmoji);

    // Verify the shape charm is displayed as a div (not a span which is for letters)
    const shapeCount = await productPage.shapeCharms.count();
    expect(shapeCount).toBeGreaterThan(0);
    await expect(productPage.shapeCharms.first()).toContainText(unicornEmoji);
  });

  test("should display typed text and two shape charms on collar", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Wait for shape charms grid to be visible
    await expect(productPage.shapeCharmsGrid).toBeVisible();

    // Type text in the pet name input
    const testPetName = "LUNA";
    await productPage.setPetName(testPetName);

    // Verify the text appears in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);

    // Click on first shape charm (unicorn - 🦄)
    const unicornShapeButton = productPage.getShapeButton("shape-unicorn");
    await expect(unicornShapeButton).toBeVisible();
    await expect(unicornShapeButton).toBeEnabled();
    const unicornEmoji = "🦄";
    await unicornShapeButton.click();

    // Click on second shape charm (angel wings - 👼)
    const angelWingsShapeButton =
      productPage.getShapeButton("shape-angel-wings");
    await expect(angelWingsShapeButton).toBeVisible();
    await expect(angelWingsShapeButton).toBeEnabled();
    const angelWingsEmoji = "👼";
    await angelWingsShapeButton.click();

    // Verify all elements are present in the collar preview
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);
    await expect(productPage.collarCharmsPreview).toContainText(unicornEmoji);
    await expect(productPage.collarCharmsPreview).toContainText(
      angelWingsEmoji,
    );

    // Verify letters are present (as spans)
    const letterCount = await productPage.letterSpans.count();
    expect(letterCount).toBeGreaterThan(0);
    await expect(productPage.letterSpans.first()).toContainText(testPetName[0]);

    // Verify shape charms are present (as divs)
    const shapeCount = await productPage.shapeCharms.count();
    expect(shapeCount).toBe(2);
    await expect(productPage.shapeCharms.first()).toContainText(unicornEmoji);
    await expect(productPage.shapeCharms.nth(1)).toContainText(angelWingsEmoji);
  });

  test("should change collar color when clicking on a color option", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Verify collar band is visible
    await expect(productPage.collarBand).toBeVisible();

    // Verify initial collar color (default is red: #F8A5A5)
    await expect(productPage.collarBand).toHaveCSS(
      "background-color",
      "rgb(248, 165, 165)", // RGB equivalent of #F8A5A5
    );

    // Click on blue color button (blue: #AED6F1)
    const blueColorButton = productPage.getCollarColorButton("collar-blue");
    await expect(blueColorButton).toBeVisible();
    await expect(blueColorButton).toBeEnabled();
    await blueColorButton.click();

    // Verify collar color changed to blue
    await expect(productPage.collarBand).toHaveCSS(
      "background-color",
      "rgb(174, 214, 241)", // RGB equivalent of #AED6F1
    );

    // Click on green color button (green: #ABEBC6)
    const greenColorButton = productPage.getCollarColorButton("collar-green");
    await expect(greenColorButton).toBeVisible();
    await expect(greenColorButton).toBeEnabled();
    await greenColorButton.click();

    // Verify collar color changed to green
    await expect(productPage.collarBand).toHaveCSS(
      "background-color",
      "rgb(171, 235, 198)", // RGB equivalent of #ABEBC6
    );
  });

  test("should change individual letter colors and display them correctly on collar", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Type 2 letters
    const testLetters = "AB";
    await productPage.setPetName(testLetters);

    // Verify both letters appear in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText("A");
    await expect(productPage.collarCharmsPreview).toContainText("B");

    // Wait for letter color pickers to appear
    await productPage.waitForLetterColorPickers(0);

    // Change color of first letter (A) to green
    const firstLetterGreenButton = productPage.getLetterColorButton(
      0,
      "color-green",
    );
    await expect(firstLetterGreenButton).toBeVisible();
    await expect(firstLetterGreenButton).toBeEnabled();
    await firstLetterGreenButton.click();

    // Change color of second letter (B) to blue
    const secondLetterBlueButton = productPage.getLetterColorButton(
      1,
      "color-blue",
    );
    await expect(secondLetterBlueButton).toBeVisible();
    await expect(secondLetterBlueButton).toBeEnabled();
    await secondLetterBlueButton.click();

    // Verify first letter (A) has green color in collar
    // Green: #00B359 = rgb(0, 179, 89)
    const firstLetter = productPage.getLetterInCollar("A");
    await expect(firstLetter).toBeVisible();
    await expect(firstLetter).toHaveCSS("color", "rgb(0, 179, 89)");

    // Verify second letter (B) has blue color in collar
    // Blue: #0066FF = rgb(0, 102, 255)
    const secondLetter = productPage.getLetterInCollar("B");
    await expect(secondLetter).toBeVisible();
    await expect(secondLetter).toHaveCSS("color", "rgb(0, 102, 255)");
  });

  test("should show error message when clicking add to cart without customizations", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Verify add to cart button is visible and enabled
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.addToCartButton).toBeEnabled();

    // Verify no text is entered and no charms are selected
    await expect(productPage.petNameInput).toHaveValue("");
    const letterCount = await productPage.letterSpans.count();
    expect(letterCount).toBe(0);
    const shapeCount = await productPage.shapeCharms.count();
    expect(shapeCount).toBe(0);

    // Click on add to cart button without any customizations
    await productPage.addToCart();

    // Verify error toast is displayed
    await expect(productPage.errorToast).toBeVisible();
    await expect(productPage.errorToastTitle).toBeVisible();
    await expect(productPage.errorToastTitle).toHaveText("Add customizations");
    await expect(productPage.errorToastDescription).toBeVisible();
    await expect(productPage.errorToastDescription).toHaveText(
      "Please add a pet name or shape charms to your collar.",
    );
  });

  test("should show error message when total charms exceed maximum limit", async () => {
    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Wait for shape charms grid to be visible
    await expect(productPage.shapeCharmsGrid).toBeVisible();

    // Type 5 letters (LUNA has 4, so let's use 5 letters like "LUNAA")
    const testPetName = "LUNAA";
    await productPage.setPetName(testPetName);

    // Verify the text appears in the collar preview
    await expect(productPage.collarCharmsPreview).toBeVisible();
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);

    // Verify we have 5 letters
    const initialLetterCount = await productPage.letterSpans.count();
    expect(initialLetterCount).toBe(5);

    // Add 4 shape charms to reach 9 total (5 letters + 4 shapes = 9)
    const shapesToAdd = [
      "shape-unicorn",
      "shape-angel-wings",
      "shape-fairy",
      "shape-shooting-star",
    ];

    for (const shapeId of shapesToAdd) {
      const shapeButton = productPage.getShapeButton(shapeId);
      await expect(shapeButton).toBeVisible();
      await expect(shapeButton).toBeEnabled();
      await shapeButton.click();
    }

    // Verify we have 9 total charms (5 letters + 4 shapes)
    const letterCount = await productPage.letterSpans.count();
    const shapeCount = await productPage.shapeCharms.count();
    const totalCharms = letterCount + shapeCount;
    expect(totalCharms).toBe(9);

    // Try to add a 10th charm - the button should be disabled
    const extraShapeButton = productPage.getShapeButton("shape-rainbow");
    await expect(extraShapeButton).toBeVisible();
    await expect(extraShapeButton).toBeDisabled();

    // Verify we still have exactly 9 charms (the charm wasn't added)
    const finalLetterCount = await productPage.letterSpans.count();
    const finalShapeCount = await productPage.shapeCharms.count();
    const finalTotal = finalLetterCount + finalShapeCount;
    expect(finalTotal).toBe(9);
  });

  test("should add item to cart and verify correct size and color information", async ({
    page,
  }) => {
    // Clear cart before starting
    await page.evaluate(() => {
      localStorage.setItem("cart", "[]");
    });

    // Wait for product data to load
    await expect(productPage.productName).toBeVisible();

    // Change collar color to blue
    const blueColorButton = productPage.getCollarColorButton("collar-blue");
    await expect(blueColorButton).toBeVisible();
    await expect(blueColorButton).toBeEnabled();
    await blueColorButton.click();

    // Verify collar color changed to blue
    await expect(productPage.collarBand).toHaveCSS(
      "background-color",
      "rgb(174, 214, 241)", // RGB equivalent of #AED6F1
    );

    // Change size to L
    await productPage.selectSize("L");

    // Verify size L button is selected
    await expect(productPage.sizeLButton).toHaveClass(/border-amber-600/);

    // Add text (pet name)
    const testPetName = "LUNA";
    await productPage.setPetName(testPetName);

    // Verify the text appears in the collar preview
    await expect(productPage.collarCharmsPreview).toContainText(testPetName);

    // Add a shape charm
    const unicornShapeButton = productPage.getShapeButton("shape-unicorn");
    await expect(unicornShapeButton).toBeVisible();
    await expect(unicornShapeButton).toBeEnabled();
    await unicornShapeButton.click();

    // Verify the shape charm appears in the collar preview
    await expect(productPage.collarCharmsPreview).toContainText("🦄");

    // Click on add to cart button
    await productPage.addToCart();

    // Verify success toast is displayed
    const successToast = page.getByTestId("success-toast-added-to-cart");
    await expect(successToast).toBeVisible({ timeout: 5000 });

    // Navigate to cart page
    await productPage.goToCart();

    // Verify we're redirected to cart page
    await expect(page).toHaveURL(/.*\/cart/);

    // Verify cart page is displayed
    const cartPage = new CartPage(page);
    await expect(cartPage.orderSummary).toBeVisible();

    // Verify size L is displayed in cart (first cart item, index 0)
    await expect(cartPage.getCartItemSize(0)).toBeVisible();
    await expect(cartPage.getCartItemSize(0)).toHaveText("L");

    // Verify collar color Blue is displayed in cart
    await expect(cartPage.getCartItemCollarColor(0)).toBeVisible();
    await expect(cartPage.getCartItemCollarColor(0)).toHaveText("Blue");

    // Verify pet name LUNA is displayed in cart
    await expect(cartPage.getCartItemPetName(0)).toBeVisible();
    await expect(cartPage.getCartItemPetName(0)).toHaveText(testPetName);
  });
});
