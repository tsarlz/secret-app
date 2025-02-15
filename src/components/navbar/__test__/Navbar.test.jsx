import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../Navbar";

jest.mock("../NavMenuLists", () => () => <li>Nav Menu List</li>);

describe("Navbar Rendering", () => {
  it("should have a Link Home and href /", async () => {
    render(<Navbar />);

    const homeLink = screen.getByRole("link", { name: "Home" });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
});
