import React, { useState } from "react";
import { toast } from "react-toastify";
import { adminAuthClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      const formData = new FormData(e.target);
      const userName = formData.get("username").trim();
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();

      const data = {
        email: email,
        password: password,
        options: {
          data: { username: userName },
        },
      };

      let inputErrors = {};
      const validEmailFormat = /^\S+@\S+\.\S+$/;

      // Validate inputs before api call
      if (userName.length < 3) {
        inputErrors.username = "Username must be atleast 3 characters.";
      }

      if (!email) {
        inputErrors.email = "Email is required.";
      } else if (!validEmailFormat.test(email)) {
        inputErrors.email = "Invalid email format.";
      }

      if (password.length < 6) {
        inputErrors.password = "Password must be at least 6 characters.";
      }

      if (Object.keys(inputErrors).length > 0) {
        setErrors(inputErrors);
        setIsLoading(false);
        return;
      }

      //Check if email already exist
      const { data: adminRes, error: adminResError } =
        await adminAuthClient.listUsers();

      if (adminResError) {
        toast.error("Error checking existing email");
        setIsLoading(false);
        return;
      }

      //Find if the user EMAIL is already in database
      const userExists = adminRes.users.some((user) => user.email === email);

      // Check if user exist
      if (!userExists) {
        // If User didn't Exist

        // Register User
        const { error } = await supabase.auth.signUp(data);

        // Handles Error Message
        if (error) {
          let errMsg = error.message;
          if (errMsg == "Database error saving new user") {
            // Modify the Error Message
            errMsg = "Username already taken.";
            setErrors({ username: errMsg });
          }
          setIsLoading(false);
          return;
        }

        toast.success("Registration successful!");
        router.push("/");
      } else {
        // If user exist

        // Store email in sessionStorage before redirecting
        sessionStorage.setItem("registeredEmail", data.email);

        toast.info("You already have an account. Please log in");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleRegister, isLoading, errors };
};

export default useRegister;
