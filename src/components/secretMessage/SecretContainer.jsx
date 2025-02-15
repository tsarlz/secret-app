"use client";
import SecretMessage from "./SecretMessage";
import useGetUser from "@/utils/hooks/useGetUser";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const SecretContainer = () => {
  const supabase = useMemo(() => createClient(), []);
  const { user } = useGetUser();
  const [profiles, setProfiles] = useState({});

  useEffect(() => {
    if (!user) return;
    const fetchProfiles = async () => {
      try {
        // Get logged-in user profile
        let { data: profiles, error: profileErr } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileErr) throw profileErr.message;

        setProfiles(profiles);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchProfiles();
  }, [user, supabase]);

  return (
    <div
      className="bg-gray-600 w-[40rem] flex flex-col justify-center items-center p-5 text-white
      "
    >
      {/* Show User Secret Message */}
      <SecretMessage
        setProfiles={setProfiles}
        profiles={profiles}
        user={user}
        supabase={supabase}
      />
      <ToastContainer />
    </div>
  );
};

export default SecretContainer;
