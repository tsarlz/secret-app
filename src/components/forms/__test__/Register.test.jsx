import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RegisterForm from "../RegisterForm";
import useRegister from "@/utils/hooks/useRegister";

jest.mock("../../../utils/hooks/useRegister", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handleRegister: jest.fn((e) => e.preventDefault()),
    isLoading: false,
    errors: {},
  })),
}));

describe("Register Form ", () => {
  describe("Rendering", () => {
    it("should have username, email, and password inputs and a button name Register", () => {
      render(<RegisterForm />);

      expect(screen.getByLabelText(/Your username/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Your email/)).toBeInTheDocument();
      expect(screen.getByLabelText(/Your password/)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Register" })
      ).toBeInTheDocument();
    });

    it("should have correct ATTRIBUTES AND TYPES", () => {
      render(<RegisterForm />);

      const usernameInput = screen.getByLabelText(/Your username/);
      const emailInput = screen.getByLabelText(/Your email/);
      const passwordInput = screen.getByLabelText(/Your password/);
      const button = screen.getByRole("button", { name: "Register" });

      expect(usernameInput).toHaveAttribute("name", "username");
      expect(emailInput).toHaveAttribute("type", "email");
      expect(passwordInput).toHaveAttribute("type", "password");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Register Form Behavior", () => {
    it("should display error message when invalid inputs are  submitted ", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          username: "Username must be atleast 3 characters.",
          email: "Email is required.",
          password: "Password must be at least 6 characters.",
        },
      });
      render(<RegisterForm />);

      const usernameErr = screen.findByText(
        "Username must be atleast 3 characters."
      );
      const emailErr = screen.findByText("Email is required.");
      const passwordErr = screen.findByText(
        "Password must be at least 6 characters."
      );

      expect(await usernameErr).toBeInTheDocument();
      expect(await emailErr).toBeInTheDocument();
      expect(await passwordErr).toBeInTheDocument();
    });

    it("should dispaly error message (Username must be atleast 3 characters.) if the user submit less than 3 char", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          username: "Username must be atleast 3 characters.",
        },
      });
      render(<RegisterForm />);

      const usernameErr = screen.findByText(
        "Username must be atleast 3 characters."
      );

      expect(await usernameErr).toBeInTheDocument();
    });

    it("should displat error message (Username already taken.) if the new user input existing username", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          username: "Username already taken.",
        },
      });
      render(<RegisterForm />);

      const usernameError = screen.findByText("Username already taken.");
      expect(await usernameError).toBeInTheDocument();
    });

    it("should display error message (Email is required.) if user register with no email", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          email: "Email is required.",
        },
      });

      render(<RegisterForm />);

      const emailErr = screen.findByText("Email is required.");
      expect(await emailErr).toBeInTheDocument();
    });

    it("should display error message (Invalid email format.) if user register with invali email format", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          email: "Invalid email format.",
        },
      });

      render(<RegisterForm />);

      const emailError = screen.findByText("Invalid email format.");
      expect(await emailError).toBeInTheDocument();
    });

    it("should display error message (Password must be at least 6 characters.) if user register less than 6 password", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: false,
        errors: {
          password: "Password must be at least 6 characters.",
        },
      });

      render(<RegisterForm />);

      const passwordError = screen.findByText(
        "Password must be at least 6 characters."
      );
      expect(await passwordError).toBeInTheDocument();
    });

    it("should disables button and shows loading text when logging in", async () => {
      // Mock the hook behavior
      useRegister.mockReturnValue({
        handleRegister: jest.fn((e) => e.preventDefault()),
        isLoading: true,
        errors: {},
      });
      render(<RegisterForm />);

      const button = screen.getByRole("button", { name: "Registering..." });
      expect(button).toBeInTheDocument();
    });
  });
});
