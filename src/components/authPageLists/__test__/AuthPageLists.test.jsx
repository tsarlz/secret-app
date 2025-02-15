import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ListPages from "../ListPages";
import AuthLists from "../AuthLists";
import { usePathname } from "next/navigation";

jest.mock("../AuthLists", () => ({ path, label, index }) => (
  <li href={path} key={index} data-testid="auth-list-item">
    {label}
  </li>
));

// Mock usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("List Pages - User navigation through pages", () => {
  describe("Redering", () => {
    it("should render", () => {
      render(<ListPages />);

      const page1 = screen.getByText("secret-app-1");
      const page2 = screen.getByText("secret-app-2");
      const page3 = screen.getByText("secret-app-3");

      // Check if all three secret apps are rendered
      expect(page1).toBeInTheDocument();
      expect(page2).toBeInTheDocument();
      expect(page3).toBeInTheDocument();
      // Check if there are exactly three list items
      expect(screen.getAllByTestId("auth-list-item")).toHaveLength(3);
    });
  });

  describe("Auth List Component", () => {
    it("should render the link correctly with given props", () => {
      usePathname.mockReturnValue("/secret-page-1");
      render(
        <AuthLists
          path="/secret-page-1"
          label="secret-app-1"
          index={0}
          pages={[{ path: "/secret-page-1", label: "secret-app-1" }]}
        />
      );

      // Check if the label appears
      expect(screen.getByText("secret-app-1")).toBeInTheDocument();

      // Check if it renders a link
      const link = screen.getByText("secret-app-1");
      expect(link).toHaveAttribute("href", "/secret-page-1");
    });
  });
});
