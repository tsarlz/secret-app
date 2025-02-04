import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(error);
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <html>
      <body>
        <h1 className="text-4xl font-bold">404 | Page not found</h1>
      </body>
    </html>
  );
};

export default Page;
