import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const layout = async ({ children }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default layout;
