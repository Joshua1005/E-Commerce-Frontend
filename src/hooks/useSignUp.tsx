import { useState } from "react";
import axios from "@/config/axios";
import { signUpSchema } from "@/schemas";
import { AxiosError } from "axios";

const useSignUp = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async (values: Zod.infer<typeof signUpSchema>) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", { ...values });

      if (res.status >= 200 && res.status < 300) {
        setErrorMessage("");
        setSuccessMessage(res.data.message);
      }
    } catch (error) {
      const axiosError = (error as AxiosError)?.response?.data as Error;
      setSuccessMessage("");
      setErrorMessage(axiosError?.message);
    } finally {
      setLoading(false);
    }
  };

  return { signUp, successMessage, errorMessage, loading };
};

export default useSignUp;
