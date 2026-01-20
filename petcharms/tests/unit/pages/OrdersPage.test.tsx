import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OrdersPage from "../../../client/pages/OrdersPage";
import { supabase } from "@/lib/supabase";

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

vi.mock("@/components/Header", () => ({
  default: () => <nav data-testid="header">Header</nav>,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("OrdersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("should render Header component", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: { id: "user-1", email: "test@example.com" },
        },
      },
      error: null,
    } as any);

    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: "user-1", email: "test@example.com", full_name: "Test User" },
        error: null,
      }),
      order: vi.fn().mockResolvedValue({
        data: [],
        error: null,
      }),
    });

    vi.mocked(supabase.from).mockImplementation(mockFrom as any);

    renderWithRouter(<OrdersPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/My Orders/i)).toBeInTheDocument();
    });
  });

  it("should show loading state initially", () => {
    vi.mocked(supabase.auth.getSession).mockImplementation(
      () => new Promise(() => {}) as any // Never resolves
    );
    
    renderWithRouter(<OrdersPage />);
    expect(screen.getByText("Loading your orders...")).toBeInTheDocument();
  });

  it("should navigate to login when no session", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);

    renderWithRouter(<OrdersPage />);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    }, { timeout: 3000 });
  });

  it("should show empty state when no orders", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: { id: "user-1", email: "test@example.com" },
        },
      },
      error: null,
    } as any);

    const mockFrom = vi.fn().mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: { id: "user-1", email: "test@example.com", full_name: "Test User" },
        error: null,
      }),
      order: vi.fn().mockResolvedValue({
        data: [],
        error: null,
      }),
    });

    vi.mocked(supabase.from).mockImplementation(mockFrom as any);

    renderWithRouter(<OrdersPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/haven't placed any orders/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
