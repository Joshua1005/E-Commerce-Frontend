import { signInSchema } from "@/schemas";
import { useState } from "react";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import useAuth from "./useAuth";

const useSignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();

  const signIn = async (values: Zod.infer<typeof signInSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", { ...values });

      if (res.status >= 200 && res.status < 300) {
        setErrorMessage("");
        setAuth(res.data);
      }
    } catch (error) {
      const axiosError = (error as AxiosError)?.response?.data as Error;
      setErrorMessage(axiosError?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMessage, signIn };
};

export default useSignIn;
