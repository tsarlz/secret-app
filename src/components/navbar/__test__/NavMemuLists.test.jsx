import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import useGetUser from "../../../utils/hooks/useGetUser";
import useGetssUser from "../../../utils/supabase/admin";
import NavMenuLists from "../NavMenuLists";

// Mock the useGetUser hook
jest.mock("../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../../utils/supabase/admin", () => ({
  adminAuthClient: {
    deleteUser: jest.fn(() => Promise.resolve({ error: null })),
  },
}));

jest.mock("../../../utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signOut: jest.fn(() => Promise.resolve({ error: null })),
    },
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
    pathname: "/",
  })),
}));

describe("NavMenuLists Rendering", () => {
  it("should return Register and Login text if user is falsy", () => {
    useGetUser.mockReturnValue({ user: null });
    render(<NavMenuLists />);

    const registerButton = screen.getByRole("link", { name: "Register" });
    const loginButton = screen.getByRole("link", { name: "Login" });

    expect(registerButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toHaveAttribute("href", "/register");
    expect(loginButton).toHaveAttribute("href", "/login");
  });

  it("should return Logout and Delete text if user is truthy", () => {
    useGetUser.mockReturnValue({ user: { name: "Charles the Developer" } });
    render(<NavMenuLists />);

    const logoutButton = screen.getByRole("listitem", { name: "Logout" });
    const deleteButton = screen.getByRole("listitem", { name: "Delete" });

    expect(logoutButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
