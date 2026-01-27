import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Package, Clock } from "lucide-react";
import Header from "@/components/Header";

interface CartItem {
  product_id: string;
  product_name: string;
  size: "S" | "M" | "L";
  collarColor: string;
  petName: string;
  customizations: {
    letters: Array<{ letter: string; colorId: string }>;
    shapes: Array<{ shapeId: string }>;
  };
  total_price: number;
}

interface OrderInfo {
  orderId?: string;
  customerName: string;
  customerEmail: string;
  customerAddress?: string;
  cart: CartItem[];
  total: number;
  createdAt: string;
}

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (error) {
        console.error("Error loading order:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-neutral-300 border-t-amber-600 mb-4"></div>
          <p className="text-neutral-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="text-center py-16">
          <p className="text-neutral-600 mb-4">No order found</p>
          <Link
            to="/"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div
            data-testid="confirmation-success-icon"
            className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1
            data-testid="confirmation-heading"
            className="text-4xl font-light text-neutral-900 mb-4"
          >
            Order Confirmed!
          </h1>
          <p
            data-testid="confirmation-thank-you-message"
            className="text-lg text-neutral-600"
          >
            Thank you for your purchase, {order.customerName}!
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-amber-50 rounded-lg p-8 border border-amber-200 text-center mb-8">
          <p className="text-sm text-neutral-600 mb-2">Order Number</p>
          <p
            data-testid="confirmation-order-number"
            className="text-3xl font-bold text-amber-700 font-mono break-all"
          >
            {(() => {
              if (order?.orderId && typeof order.orderId === "string") {
                return order.orderId.substring(0, 8).toUpperCase();
              }
              return Math.random().toString(36).substring(2, 10).toUpperCase();
            })()}
          </p>
          <p
            data-testid="confirmation-email-message"
            className="text-xs text-neutral-500 mt-4"
          >
            A confirmation email has been sent to{" "}
            {order?.customerEmail || "your email"}
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* What's Next */}
          <div
            data-testid="confirmation-whats-next-section"
            className="bg-neutral-50 rounded-lg p-6 border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h3
                data-testid="confirmation-whats-next-heading"
                className="font-semibold text-neutral-900"
              >
                What's Next?
              </h3>
            </div>
            <div className="space-y-3 text-sm text-neutral-600">
              <div>
                <p
                  data-testid="confirmation-order-confirmed-step"
                  className="font-medium text-neutral-900 mb-1"
                >
                  ✓ Order Confirmed
                </p>
                <p
                  data-testid="confirmation-order-confirmed-description"
                  className="text-xs"
                >
                  You'll receive an email shortly
                </p>
              </div>
              <div>
                <p
                  data-testid="confirmation-preparing-order-step"
                  className="font-medium text-neutral-900 mb-1"
                >
                  📦 Preparing Order
                </p>
                <p
                  data-testid="confirmation-preparing-order-description"
                  className="text-xs"
                >
                  We're handcrafting your necklace
                </p>
              </div>
              <div>
                <p
                  data-testid="confirmation-delivery-step"
                  className="font-medium text-neutral-900 mb-1"
                >
                  🚚 Estimated Delivery
                </p>
                <p
                  data-testid="confirmation-delivery-description"
                  className="text-xs"
                >
                  5-7 business days
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div
            data-testid="confirmation-shipping-section"
            className="bg-neutral-50 rounded-lg p-6 border border-neutral-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-amber-600" />
              </div>
              <h3
                data-testid="confirmation-shipping-heading"
                className="font-semibold text-neutral-900"
              >
                Shipping To
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <p
                data-testid="confirmation-shipping-name"
                className="font-medium text-neutral-900"
              >
                {order.customerName}
              </p>
              <p
                data-testid="confirmation-shipping-address"
                className="text-neutral-600 text-xs whitespace-pre-wrap"
              >
                {order.customerAddress ||
                  order.cart[0]?.product_name ||
                  "Charm Necklace"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div
          data-testid="confirmation-order-summary-section"
          className="border border-neutral-200 rounded-lg p-6 mb-8"
        >
          <h3
            data-testid="confirmation-order-summary-heading"
            className="font-semibold text-neutral-900 mb-6"
          >
            Order Summary
          </h3>

          <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
            {order.cart.map((item, index) => (
              <div key={index} data-testid={`confirmation-order-item-${index}`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <p
                      data-testid={`confirmation-order-item-${index}-product-name`}
                      className="font-medium text-neutral-900"
                    >
                      {item.product_name}
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-neutral-600">
                      {item.petName && (
                        <p
                          data-testid={`confirmation-order-item-${index}-pet-name`}
                        >
                          Pet Name: {item.petName}
                        </p>
                      )}
                      <p data-testid={`confirmation-order-item-${index}-size`}>
                        Size: {item.size}
                      </p>
                      {item.collarColor && (
                        <p
                          data-testid={`confirmation-order-item-${index}-collar-color`}
                        >
                          Collar Color:{" "}
                          {item.collarColor
                            .replace("collar-", "")
                            .charAt(0)
                            .toUpperCase() +
                            item.collarColor.replace("collar-", "").slice(1)}
                        </p>
                      )}
                      {item.customizations.letters.length > 0 && (
                        <p
                          data-testid={`confirmation-order-item-${index}-letters`}
                        >
                          Letters: {item.customizations.letters.length}
                        </p>
                      )}
                      {item.customizations.shapes.length > 0 && (
                        <p
                          data-testid={`confirmation-order-item-${index}-shapes`}
                        >
                          Shape Charms: {item.customizations.shapes.length}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    data-testid={`confirmation-order-item-${index}-price`}
                    className="font-semibold text-amber-700 ml-4 flex-shrink-0"
                  >
                    ${item.total_price.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4 pb-4 border-b border-neutral-200">
            <div className="flex justify-between text-neutral-600">
              <span data-testid="confirmation-subtotal-label">Subtotal</span>
              <span data-testid="confirmation-subtotal-value">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span data-testid="confirmation-shipping-label">Shipping</span>
              <span data-testid="confirmation-shipping-value">Free</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span
              data-testid="confirmation-total-label"
              className="font-semibold text-neutral-900"
            >
              Total
            </span>
            <span
              data-testid="confirmation-total-value"
              className="text-2xl font-bold text-amber-700"
            >
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            data-testid="confirmation-create-another-necklace-button"
            to="/"
            className="w-full px-6 py-4 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition text-center"
          >
            Create Another Necklace
          </Link>
          <Link
            data-testid="confirmation-back-to-home-button"
            to="/"
            className="w-full px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg font-medium hover:border-neutral-900 transition text-center"
          >
            Back to Home
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <p className="text-sm text-neutral-600">
            <strong>💡 Note:</strong> This is a demo order. Payment is simulated
            and no actual charge has been made.
          </p>
        </div>
      </div>
    </div>
  );
}
