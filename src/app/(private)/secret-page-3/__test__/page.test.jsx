import SecretContainer from "@/components/secretMessage/SecretContainer";
import SecretMessage from "@/components/secretMessage/SecretMessage";
import useGetUser from "@/utils/hooks/useGetUser";
import "@testing-library/jest-dom";
import { findByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Page from "../page";
import { useRouter } from "next/navigation";
import ProfileLists from "@/components/ProfileLists";

jest.mock("../../../../utils/supabase/client", () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
    },
  })),
}));

// Mock the useGetUser hook
jest.mock("../../../../utils/hooks/useGetUser", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the usePathName and useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

// Mock `react-toastify`
jest.mock("react-toastify", () => ({
  toast: { error: jest.fn(), success: jest.fn() },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

describe("Secret Page - User can Add Friend, Accept Friend Request and View Friend's Secret Message", () => {
  describe("Message Container", () => {
    it("should display secret message component Toggle Button, Add Input/Button and secret message added by user ", async () => {
      useGetUser.mockReturnValue({ user: { id: "123456" } });
      render(<SecretContainer />);

      const buttonShow = screen.getByRole("button", { name: "Show Message" }); // Rendered Button Text
      expect(buttonShow).toBeInTheDocument();

      await userEvent.click(buttonShow);

      const buttonHide = screen.getByRole("button", { name: "Hide Message" }); // Show when Button is CLicked
      expect(await screen.findByText("No Current Message")).toBeInTheDocument();
      expect(buttonHide).toBeInTheDocument();
    });
  });

  describe("SecretMessage Component", () => {
    it("should display an error for an empty message", async () => {
      usePathname.mockReturnValue("/secret-page-3");
      useGetUser.mockReturnValue({ user: { id: "123456" } });

      const supabaseMock = {
        from: jest.fn(),
      };

      // Mock setProfiles
      const mockSetProfiles = jest.fn();

      // Render Component
      render(
        <>
          <SecretMessage
            user={{ id: "123456" }}
            setProfiles={mockSetProfiles}
            profiles={{}}
            supabase={supabaseMock}
          />
          <ToastContainer />
        </>
      );

      // Click Show Message button
      const toggleButton = screen.getByRole("button", { name: "Show Message" });
      await userEvent.click(toggleButton);

      // Get Input and Button
      const inputElement = screen.getByLabelText("Input Add", {
        selector: "input",
      });
      expect(inputElement).toBeInTheDocument();

      const addButton = screen.getByRole("button", { name: "Add" });
      expect(addButton).toBeInTheDocument();

      // Test Empty Message Error
      await userEvent.click(addButton);
      await waitFor(() =>
        expect(toast.error).toHaveBeenCalledWith("Invalid Secret Message")
      );
    });
  });

  describe("Profile List Component", () => {
    it("should display profiles", async () => {
      useGetUser.mockReturnValue({ user: { id: "123456" } });

      const mockProfiles = [
        { id: "321232", username: "Alice" },
        { id: "32125422", username: "Charles" },
        { id: "1234122", username: "User" },
      ];

      render(
        <ul>
          {mockProfiles.map((profile) => (
            <ProfileLists
              key={profile.id}
              id={profile.id}
              username={profile.username}
              handleAddFriend={jest.fn()}
              handleViewMessage={jest.fn()}
              isAlreadyFriend={jest.fn().mockReturnValue(false)}
              hasPendingRequest={jest.fn().mockReturnValue(false)}
            />
          ))}
        </ul>
      );

      expect(await screen.findByText("Alice")).toBeInTheDocument();
      expect(await screen.findByText("Charles")).toBeInTheDocument();
      expect(await screen.findByText("User")).toBeInTheDocument();

      const addButton = screen.getAllByRole("button", { name: "Add friend" });
      expect(addButton).toHaveLength(3);
      expect(screen.getAllByText("View Secret Message")).toHaveLength(3);
    });
  });
});
