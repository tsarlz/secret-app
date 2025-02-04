"use client";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SecretMessInput from "./SecretMessInput";
import ToggleMessButton from "./ToggleMessButton";
import useGetUser from "@/utils/hooks/useGetUser";

const supabase = createClient();
const SecretMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [profiles, setProfiles] = useState({});
  const [secretMessage, setSecretMessage] = useState("");
  const { user } = useGetUser();
  const pathName = usePathname();

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

        setProfiles(profiles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfiles();
  }, []);

  async function handleAddMessage() {
    if (!secretMessage.trim()) {
      alert("Invalid Secret Message");
      setSecretMessage("");
      return;
    }

    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .update({ secret_message: secretMessage })
      .eq("id", user.id)
      .select();

    if (error) return;
    setProfiles((prev) => ({ ...prev, secret_message: secretMessage }));
    setSecretMessage("");
  }

  return (
    <div
      className="bg-gray-600 w-[40rem] flex flex-col justify-center items-center p-5 text-white
      "
    >
      {/* Toggle Button */}
      <ToggleMessButton
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />

      {/* Show User Secret Message */}
      {showMessage ? (
        <div className="flex flex-col items-center justify-center mt-5 space-y-2">
          <p>
            {profiles.secret_message
              ? profiles.secret_message
              : "No Current Message"}
          </p>
          {(pathName == "/secret-page-2" || pathName == "/secret-page-3") && (
            // Set Secret Message
            <SecretMessInput
              profiles={profiles}
              handleAddMessage={handleAddMessage}
              setSecretMessage={setSecretMessage}
              secretMessage={secretMessage}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SecretMessage;
