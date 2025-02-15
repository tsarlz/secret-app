"use client";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import ToggleMessButton from "./ToggleMessButton";
import SecretMessInput from "./SecretMessInput";
import { toast } from "react-toastify";

const SecretMessage = ({ user, setProfiles, profiles, supabase }) => {
  if (!user) return;
  const pathName = usePathname();
  const [showMessage, setShowMessage] = useState(false);
  const [secretMessage, setSecretMessage] = useState("");

  const handleAddMessage = useCallback(async () => {
    if (!secretMessage.trim()) {
      toast.error("Invalid Secret Message");
      setSecretMessage("");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ secret_message: secretMessage })
      .eq("id", user.id)
      .select();

    if (error) return;
    setProfiles((prev) => ({
      ...prev,
      secret_message: data?.[0]?.secret_message || secretMessage, // Ensure update
    }));
    setSecretMessage("");
  }, [user.id, secretMessage]);

  return (
    <>
      {/* Toggle Button */}
      <ToggleMessButton
        setShowMessage={setShowMessage}
        showMessage={showMessage}
      />
      {/* Secret Message */}
      {showMessage ? (
        <SecretMessInput
          secretMessage={secretMessage}
          setSecretMessage={setSecretMessage}
          handleAddMessage={handleAddMessage}
          profiles={profiles}
          pathName={pathName}
        />
      ) : null}
    </>
  );
};

export default SecretMessage;
