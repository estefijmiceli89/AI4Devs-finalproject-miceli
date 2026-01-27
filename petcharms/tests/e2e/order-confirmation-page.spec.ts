import { test, expect } from "@playwright/test";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { LandingPage } from "./pages/LandingPage";

test.describe("Order Confirmation Page", () => {
  let confirmationPage: OrderConfirmationPage;

  test.beforeEach(async ({ page }) => {
    confirmationPage = new OrderConfirmationPage(page);
    // Navigate to a page first to establish context, then set up order in localStorage
    await confirmationPage.goto("/");
    await page.evaluate(() => {
      const order = {
        orderId: "test-order-123",
        customerName: "John Doe",
        customerEmail: "john@example.com",
        customerAddress: "123 Main St, City, State, ZIP Code",
        cart: [
          {
            product_id: "test-product-1",
            product_name: "Pet Charm Collar",
            size: "M",
            collarColor: "collar-blue",
            petName: "LUNA",
            customizations: {
              letters: [
                { letter: "L", colorId: "color-red" },
                { letter: "U", colorId: "color-blue" },
              ],
              shapes: [],
            },
            total_price: 15.0,
          },
        ],
        total: 15.0,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("lastOrder", JSON.stringify(order));
    });
  });

  test.describe("Look and Feel", () => {
    test("should display confirmation page look and feel", async () => {
      await confirmationPage.goto("/confirmation");

      // Verify success icon is visible
      await expect(confirmationPage.successIcon).toBeVisible();

      // Verify heading is visible
      await expect(confirmationPage.heading).toBeVisible();
      await expect(confirmationPage.heading).toHaveText(/order confirmed/i);

      // Verify thank you message is visible
      await expect(confirmationPage.thankYouMessage).toBeVisible();
      await expect(confirmationPage.thankYouMessage).toContainText(
        /thank you for your purchase/i,
      );

      // Verify order number is visible
      await expect(confirmationPage.orderNumber).toBeVisible();
      const orderNumber = await confirmationPage.orderNumber.textContent();
      expect(orderNumber).toBeTruthy();
      expect(orderNumber?.length).toBeGreaterThan(0);

      // Verify email confirmation message is visible
      await expect(confirmationPage.emailMessage).toBeVisible();
      await expect(confirmationPage.emailMessage).toContainText(
        /confirmation email has been sent/i,
      );

      // Verify "What's Next?" section is visible
      await expect(confirmationPage.whatsNextSection).toBeVisible();
      await expect(confirmationPage.whatsNextHeading).toBeVisible();
      await expect(confirmationPage.whatsNextHeading).toHaveText(
        /what's next/i,
      );

      // Verify order steps are visible
      await expect(confirmationPage.orderConfirmedStep).toBeVisible();
      await expect(confirmationPage.orderConfirmedStep).toContainText(
        /order confirmed/i,
      );
      await expect(confirmationPage.orderConfirmedDescription).toBeVisible();
      await expect(confirmationPage.orderConfirmedDescription).toContainText(
        /you'll receive an email shortly/i,
      );

      await expect(confirmationPage.preparingOrderStep).toBeVisible();
      await expect(confirmationPage.preparingOrderStep).toContainText(
        /preparing order/i,
      );
      await expect(confirmationPage.preparingOrderDescription).toBeVisible();
      await expect(confirmationPage.preparingOrderDescription).toContainText(
        /handcrafting your necklace/i,
      );

      await expect(confirmationPage.deliveryStep).toBeVisible();
      await expect(confirmationPage.deliveryStep).toContainText(
        /estimated delivery/i,
      );
      await expect(confirmationPage.deliveryDescription).toBeVisible();
      await expect(confirmationPage.deliveryDescription).toContainText(
        /5-7 business days/i,
      );

      // Verify "Shipping To" section is visible
      await expect(confirmationPage.shippingSection).toBeVisible();
      await expect(confirmationPage.shippingHeading).toBeVisible();
      await expect(confirmationPage.shippingHeading).toHaveText(/shipping to/i);

      // Verify order summary section is visible
      await expect(confirmationPage.orderSummarySection).toBeVisible();
      await expect(confirmationPage.orderSummaryHeading).toBeVisible();
      await expect(confirmationPage.orderSummaryHeading).toHaveText(
        /order summary/i,
      );

      // Verify order totals are visible
      await expect(confirmationPage.subtotalLabel).toBeVisible();
      await expect(confirmationPage.subtotalLabel).toHaveText(/subtotal/i);
      await expect(confirmationPage.subtotalValue).toBeVisible();

      await expect(confirmationPage.shippingLabel).toBeVisible();
      await expect(confirmationPage.shippingLabel).toHaveText(/shipping/i);
      await expect(confirmationPage.shippingValue).toBeVisible();
      await expect(confirmationPage.shippingValue).toHaveText(/free/i);

      await expect(confirmationPage.totalLabel).toBeVisible();
      await expect(confirmationPage.totalLabel).toHaveText(/total/i);
      await expect(confirmationPage.totalValue).toBeVisible();

      // Verify action buttons are visible
      await expect(confirmationPage.createAnotherNecklaceButton).toBeVisible();
      await expect(confirmationPage.createAnotherNecklaceButton).toContainText(
        /create another necklace/i,
      );

      await expect(confirmationPage.backToHomeButton).toBeVisible();
      await expect(confirmationPage.backToHomeButton).toContainText(
        /back to home/i,
      );
    });
  });

  test.describe("Correct Address and Cart Information", () => {
    test("should display correct address and cart information", async ({
      page,
    }) => {
      const customerName = "Jane Smith";
      const customerEmail = "jane@example.com";
      const customerAddress = "456 Oak Avenue, Springfield, IL 62701";
      const petName = "MAX";
      const productName = "Pet Charm Collar";
      const size = "L";
      const price = 20.0;
      const total = 20.0;

      // Set up a completed order in localStorage
      await page.evaluate(
        ({
          customerName,
          customerEmail,
          customerAddress,
          petName,
          productName,
          size,
          price,
          total,
        }) => {
          const order = {
            orderId: "test-order-456",
            customerName,
            customerEmail,
            customerAddress,
            cart: [
              {
                product_id: "test-product-2",
                product_name: productName,
                size,
                collarColor: "collar-red",
                petName,
                customizations: {
                  letters: [
                    { letter: "M", colorId: "color-blue" },
                    { letter: "A", colorId: "color-green" },
                    { letter: "X", colorId: "color-yellow" },
                  ],
                  shapes: [{ shapeId: "shape-star" }],
                },
                total_price: price,
              },
            ],
            total,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem("lastOrder", JSON.stringify(order));
        },
        {
          customerName,
          customerEmail,
          customerAddress,
          petName,
          productName,
          size,
          price,
          total,
        },
      );

      await confirmationPage.goto("/confirmation");

      // Verify customer name is displayed correctly
      await expect(confirmationPage.shippingName).toBeVisible();
      await expect(confirmationPage.shippingName).toHaveText(customerName);

      // Verify shipping address is displayed correctly
      await expect(confirmationPage.shippingAddress).toBeVisible();
      await expect(confirmationPage.shippingAddress).toHaveText(
        customerAddress,
      );

      // Verify email is displayed in confirmation message
      await expect(confirmationPage.emailMessage).toContainText(customerEmail);

      // Verify order item details are displayed correctly
      await expect(confirmationPage.getOrderItem(0)).toBeVisible();
      await expect(confirmationPage.getOrderItemProductName(0)).toHaveText(
        productName,
      );
      await expect(confirmationPage.getOrderItemPetName(0)).toContainText(
        petName,
      );
      await expect(confirmationPage.getOrderItemSize(0)).toContainText(size);
      await expect(confirmationPage.getOrderItemLetters(0)).toContainText(
        "Letters: 3",
      );
      await expect(confirmationPage.getOrderItemShapes(0)).toContainText(
        "Shape Charms: 1",
      );
      await expect(confirmationPage.getOrderItemPrice(0)).toHaveText(
        `$${price.toFixed(2)}`,
      );

      // Verify order totals are correct
      await expect(confirmationPage.subtotalValue).toHaveText(
        `$${total.toFixed(2)}`,
      );
      await expect(confirmationPage.totalValue).toHaveText(
        `$${total.toFixed(2)}`,
      );
    });
  });

  test.describe("Order Summary with Multiple Products", () => {
    test("should display order summary correctly when there are multiple products in cart", async ({
      page,
    }) => {
      // Set up an order with multiple products
      await page.evaluate(() => {
        const order = {
          orderId: "test-order-789",
          customerName: "Bob Johnson",
          customerEmail: "bob@example.com",
          customerAddress: "789 Pine Street, Denver, CO 80202",
          cart: [
            {
              product_id: "test-product-1",
              product_name: "Pet Charm Collar",
              size: "S",
              collarColor: "collar-blue",
              petName: "BUDDY",
              customizations: {
                letters: [
                  { letter: "B", colorId: "color-red" },
                  { letter: "U", colorId: "color-blue" },
                ],
                shapes: [],
              },
              total_price: 12.0,
            },
            {
              product_id: "test-product-2",
              product_name: "Pet Charm Collar",
              size: "M",
              collarColor: "collar-green",
              petName: "MAX",
              customizations: {
                letters: [
                  { letter: "M", colorId: "color-green" },
                  { letter: "A", colorId: "color-yellow" },
                  { letter: "X", colorId: "color-red" },
                ],
                shapes: [{ shapeId: "shape-heart" }],
              },
              total_price: 18.0,
            },
            {
              product_id: "test-product-3",
              product_name: "Pet Charm Collar",
              size: "L",
              collarColor: "collar-red",
              petName: "CHARLIE",
              customizations: {
                letters: [
                  { letter: "C", colorId: "color-blue" },
                  { letter: "H", colorId: "color-red" },
                  { letter: "A", colorId: "color-green" },
                  { letter: "R", colorId: "color-yellow" },
                  { letter: "L", colorId: "color-blue" },
                  { letter: "I", colorId: "color-red" },
                  { letter: "E", colorId: "color-green" },
                ],
                shapes: [{ shapeId: "shape-star" }, { shapeId: "shape-moon" }],
              },
              total_price: 25.0,
            },
          ],
          total: 55.0,
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem("lastOrder", JSON.stringify(order));
      });

      await confirmationPage.goto("/confirmation");

      // Wait for order summary to be visible before counting items
      await expect(confirmationPage.orderSummarySection).toBeVisible();

      // Verify all order items are displayed
      const itemsCount = await confirmationPage.getOrderItemsCount();
      expect(itemsCount).toBe(3);

      // Verify first item details
      await expect(confirmationPage.getOrderItem(0)).toBeVisible();
      await expect(confirmationPage.getOrderItemProductName(0)).toHaveText(
        "Pet Charm Collar",
      );
      await expect(confirmationPage.getOrderItemPetName(0)).toContainText(
        "BUDDY",
      );
      await expect(confirmationPage.getOrderItemSize(0)).toContainText("S");
      await expect(confirmationPage.getOrderItemLetters(0)).toContainText(
        "Letters: 2",
      );
      await expect(confirmationPage.getOrderItemPrice(0)).toHaveText("$12.00");

      // Verify second item details
      await expect(confirmationPage.getOrderItem(1)).toBeVisible();
      await expect(confirmationPage.getOrderItemProductName(1)).toHaveText(
        "Pet Charm Collar",
      );
      await expect(confirmationPage.getOrderItemPetName(1)).toContainText(
        "MAX",
      );
      await expect(confirmationPage.getOrderItemSize(1)).toContainText("M");
      await expect(confirmationPage.getOrderItemLetters(1)).toContainText(
        "Letters: 3",
      );
      await expect(confirmationPage.getOrderItemShapes(1)).toContainText(
        "Shape Charms: 1",
      );
      await expect(confirmationPage.getOrderItemPrice(1)).toHaveText("$18.00");

      // Verify third item details
      await expect(confirmationPage.getOrderItem(2)).toBeVisible();
      await expect(confirmationPage.getOrderItemProductName(2)).toHaveText(
        "Pet Charm Collar",
      );
      await expect(confirmationPage.getOrderItemPetName(2)).toContainText(
        "CHARLIE",
      );
      await expect(confirmationPage.getOrderItemSize(2)).toContainText("L");
      await expect(confirmationPage.getOrderItemLetters(2)).toContainText(
        "Letters: 7",
      );
      await expect(confirmationPage.getOrderItemShapes(2)).toContainText(
        "Shape Charms: 2",
      );
      await expect(confirmationPage.getOrderItemPrice(2)).toHaveText("$25.00");

      // Verify order totals are correct (sum of all items)
      await expect(confirmationPage.subtotalValue).toHaveText("$55.00");
      await expect(confirmationPage.totalValue).toHaveText("$55.00");
    });
  });

  test.describe("Button Clicks", () => {
    test.use({ storageState: "tests/e2e/.auth/storageState.json" });

    test("should navigate to home when clicking Create Another Necklace button", async ({
      page,
    }) => {
      await confirmationPage.goto("/confirmation");

      // Verify button is visible
      await expect(confirmationPage.createAnotherNecklaceButton).toBeVisible();

      // Click Create Another Necklace button
      await confirmationPage.clickCreateAnotherNecklace();

      // Verify navigation to home page
      await expect(page).toHaveURL(/.*\/$/);

      // Verify landing page is displayed
      const landingPage = new LandingPage(page);
      await expect(landingPage.header).toBeVisible();
    });

    test("should navigate to home when clicking Back to Home button", async ({
      page,
    }) => {
      await confirmationPage.goto("/confirmation");

      // Verify button is visible
      await expect(confirmationPage.backToHomeButton).toBeVisible();

      // Click Back to Home button
      await confirmationPage.clickBackToHome();

      // Verify navigation to home page
      await expect(page).toHaveURL(/.*\/$/);

      // Verify landing page is displayed
      const landingPage = new LandingPage(page);
      await expect(landingPage.header).toBeVisible();
    });
  });
});
