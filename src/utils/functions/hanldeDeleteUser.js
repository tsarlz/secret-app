import { adminAuthClient } from "@/utils/supabase/admin";

export const handleDelete = async () => {
  if (!user) return;

  const isConfirmed = confirm("Are you sure you want to delete your account?");
  if (!isConfirmed) return; // Stop if the user cancels

  // Call the Supabase Admin API to delete the user
  const { error } = await adminAuthClient.deleteUser(user.id);

  if (error) {
    alert("Failed to delete account. Contact support.");
    return;
  }

  await supabase.auth.signOut();

  // Reload the page to update state
  router.refresh();
};
