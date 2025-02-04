"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase/client";
const Page = () => {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const friendId = params.secret;

  useEffect(() => {
    async function fetchDatas() {
      try {
        let { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", friendId)
          .single();

        if (error) {
          console.log(error);
          return;
        }
        setProfile(profile);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDatas();
  }, [friendId]);
  return (
    <div>
      {profile.secret_message ? (
        <h1 className="font-semibold">{profile.secret_message}</h1>
      ) : (
        <h3>
          <span className="font-semibold"> {profile.username}</span>&nbsp;
          didn't add secret message yet
        </h3>
      )}
    </div>
  );
};

export default Page;
