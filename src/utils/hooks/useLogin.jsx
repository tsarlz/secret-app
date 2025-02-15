import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createClient } from "../supabase/client";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) return; // prevent log in multiple times

    setIsLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      const formData = new FormData(e.target); //Select the form
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();

      let inputsErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        inputsErrors.email = "Email is required.";
      } else if (!emailRegex.test(email)) {
        inputsErrors.email = "Invalid email format.";
      }

      if (!password) {
        inputsErrors.password = "Password is required.";
      }

      if (Object.keys(inputsErrors).length > 0) {
        setErrors(inputsErrors);
        setIsLoading(false);
        return;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (loginError) {
        // setErrors({ api: loginError.message });
        toast.error(loginError.message);
        return;
      }

      toast.success("Login Success.");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, errors };
};

export default useLogin;
