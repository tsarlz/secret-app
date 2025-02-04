import React, { useEffect, useState } from "react";
import { createClient } from "../supabase/client";

const supabase = createClient();

const useGetUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Listen for authentication state changes
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe(); // Cleanup listener correctly
    };
  }, []);

  return { user };
};

export default useGetUser;
