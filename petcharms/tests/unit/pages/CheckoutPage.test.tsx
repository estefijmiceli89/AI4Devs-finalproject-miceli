import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CheckoutPage from "../../../client/pages/CheckoutPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
    from: vi.fn(),
  },
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
    dismiss: vi.fn(),
    toasts: [],
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("CheckoutPage", () => {
  const mockCart = [
    {
      product_id: "1",
      product_name: "Test Collar",
      size: "M",
      collarColor: "collar-red",
      petName: "MAX",
      customizations: {
        letters: [],
        shapes: [],
      },
      total_price: 15.0,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock localStorage before rendering
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key: string) => {
          if (key === "cart") {
            return JSON.stringify(mockCart);
          }
          return null;
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
  });

  it("should render checkout heading", async () => {
    renderWithRouter(<CheckoutPage />);
    await waitFor(() => {
      expect(screen.getByText("Checkout")).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("should render all form fields", async () => {
    renderWithRouter(<CheckoutPage />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/123 Main St, City, State, ZIP Code/i),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/\+1 \(555\) 000-0000/i),
      ).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it("should allow typing in form fields", async () => {
    const user = userEvent.setup();
    renderWithRouter(<CheckoutPage />);
    
    const fullNameInput = screen.getByPlaceholderText(/John Doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const addressInput = screen.getByPlaceholderText(
      /123 Main St, City, State, ZIP Code/i,
    );

    await user.type(fullNameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(addressInput, "123 Main St");

    expect(fullNameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(addressInput).toHaveValue("123 Main St");
  });

  it("should render order summary", () => {
    renderWithRouter(<CheckoutPage />);
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("should render submit button", () => {
    renderWithRouter(<CheckoutPage />);
    const submitButton = screen.getByRole("button", { name: /confirm order/i });
    expect(submitButton).toBeInTheDocument();
  });
});
