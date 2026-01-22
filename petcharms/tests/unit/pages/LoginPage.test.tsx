import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../../../client/pages/LoginPage";

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: vi.fn(),
    dismiss: vi.fn(),
    toasts: [],
  }),
}));

vi.mock("@/components/Header", () => ({
  default: () => <nav data-testid="header">Header</nav>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Sign in to view your orders")).toBeInTheDocument();
  });

  it("should render email input", () => {
    renderWithRouter(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("should render password input", () => {
    renderWithRouter(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should render submit button", () => {
    renderWithRouter(<LoginPage />);
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  it("should allow typing in email field", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);

    await user.type(emailInput, "test@example.com");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("should allow typing in password field", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    await user.type(passwordInput, "password123");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should render link to register page", () => {
    renderWithRouter(<LoginPage />);
    const registerLink = screen.getByRole("link", { name: /sign up/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });

  it("should render Header component", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
