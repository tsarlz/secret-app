import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/(root)/page";
import useGetUser from "@/utils/hooks/useGetUser";

// Mock the useGetUser hook
jest.mock("../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Root Page Rendering", () => {
  it("should renders only the heading content if user falsy", () => {
    useGetUser.mockReturnValue({ user: null });
    render(<Page />);

    expect(screen.getByText("Welcome to Secret App")).toBeInTheDocument();
  });

  it("should render ListPage if the user is truthy", () => {
    useGetUser.mockReturnValue({ user: { id: "123456" } });

    render(<Page />);
    expect(screen.getByText("Welcome to Secret App")).toBeInTheDocument();
    expect(screen.getByText("secret-app-1")).toBeInTheDocument();
    expect(screen.getByText("secret-app-2")).toBeInTheDocument();
    expect(screen.getByText("secret-app-3")).toBeInTheDocument();

    const link1 = screen.getByRole("link", { name: "secret-app-1" });
    const link2 = screen.getByRole("link", { name: "secret-app-2" });
    const link3 = screen.getByRole("link", { name: "secret-app-3" });

    expect(link1).toHaveAttribute("href", "/secret-page-1");
    expect(link2).toHaveAttribute("href", "/secret-page-2");
    expect(link3).toHaveAttribute("href", "/secret-page-3");
  });
});
