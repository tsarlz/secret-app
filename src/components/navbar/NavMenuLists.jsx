"use client";
import { useRouter } from "next/navigation";
import { adminAuthClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";
import useGetUser from "@/utils/hooks/useGetUser";
import Link from "next/link";
import { toast } from "react-toastify";

const NavMenuLists = () => {
  const { user } = useGetUser();
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    if (!user || !user?.id) return;

    const isConfirmed = confirm(
      "Are you sure you want to delete your account?"
    );
    if (!isConfirmed) return; // Stop if the user cancels

    // Call the Supabase Admin API to delete the user
    const { error } = await adminAuthClient.deleteUser(user.id);

    if (error) {
      toast.error("Failed to delete account.");
      return;
    }

    await supabase.auth.signOut();

    // Reload the page to update state
    router.refresh();
  };

  async function handleLogout() {
    if (!user || !user.id) return;
    let { error } = await supabase.auth.signOut();

    if (!error) router.push("/");
  }

  return (
    <>
      {!user ? (
        <>
          <li className="hover:underline cursor-pointer">
            <Link href="/register">Register</Link>
          </li>
          <li className="hover:underline cursor-pointer">
            <Link href="/login">Login</Link>
          </li>
        </>
      ) : (
        <>
          <li
            aria-label="Logout"
            onClick={handleLogout}
            className="hover:underline cursor-pointer"
          >
            Logout
          </li>
          <li
            aria-label="Delete"
            onClick={handleDelete}
            className="hover:underline cursor-pointer"
          >
            Delete
          </li>
        </>
      )}
    </>
  );
};

export default NavMenuLists;
