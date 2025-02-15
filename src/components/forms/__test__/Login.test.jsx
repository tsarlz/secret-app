import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginForm from "../LoginForm";
import useLogin from "../../../utils/hooks/useLogin";

jest.mock("../../../utils/hooks/useLogin", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handleLogin: jest.fn((e) => e.preventDefault()),
    isLoading: false,
    errors: {},
  })),
}));

jest.mock("../../../utils/supabase/client", () => ({
  createClient: jest.fn(),
}));

describe("Login Form", () => {
  describe("Rendering", () => {
    it("should have email, and password inputs and a button name Login with correct types", () => {
      render(<LoginForm />);

      const email = screen.getByLabelText(/your email/i);
      const password = screen.getByLabelText(/your password/i);
      const button = screen.getByRole("button", { name: "Login" });

      expect(email).toBeInTheDocument();
      expect(password).toBeInTheDocument();
      expect(button).toBeInTheDocument();
      expect(email).toHaveAttribute("type", "email");
      expect(password).toHaveAttribute("type", "password");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Behavior", () => {
    it("should show errors if submitted with no inputs", async () => {
      useLogin.mockReturnValue({
        handleLogin: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          email: "Email is required.",
          password: "Password is required.",
        },
      });
      render(<LoginForm />);

      const emailError = screen.findByText("Email is required.");
      const passwordError = screen.findByText("Password is required.");

      expect(await emailError).toBeInTheDocument();
      expect(await passwordError).toBeInTheDocument();
    });

    it("should show error (Email is required.) if signin with no email", async () => {
      useLogin.mockReturnValue({
        handleLogin: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          email: "Email is required.",
        },
      });
      render(<LoginForm />);

      const emailError = screen.findByText("Email is required.");
      expect(await emailError).toBeInTheDocument();
    });

    it("should show error (Password is required.) if signin with no email", async () => {
      useLogin.mockReturnValue({
        handleLogin: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          password: "Password is required.",
        },
      });
      render(<LoginForm />);

      const passwordError = screen.findByText("Password is required.");

      expect(await passwordError).toBeInTheDocument();
    });

    it("should disables button and shows loading text when logging in", async () => {
      useLogin.mockReturnValue({
        handleLogin: jest.fn((e) => e.preventDefault()),
        isLoading: true,
        errors: {},
      });
      render(<LoginForm />);

      const button = screen.getByRole("button", { name: "Logging In..." });
      expect(button).toBeInTheDocument();
    });
  });
});
