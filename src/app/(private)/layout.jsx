import "../globals.css";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import ListPages from "@/components/ListPages";

const Layout = async ({ children }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <html>
      <body>
        <Navbar />
        <div className="flex flex-col justify-center items-center mt-8 space-y-5">
          <ListPages />
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
