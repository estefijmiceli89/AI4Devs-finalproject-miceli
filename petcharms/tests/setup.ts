import { beforeAll, afterAll, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock environment variables
process.env.NODE_ENV = "test";
process.env.PING_MESSAGE = "test-ping";

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;

// Mock window.matchMedia for responsive hooks
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeAll(() => {
  // Setup before all tests
});

afterAll(() => {
  // Cleanup after all tests
  vi.clearAllMocks();
});
