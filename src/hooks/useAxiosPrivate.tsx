import { useEffect } from "react";
import useAuth from "./useAuth";
import { axiosPrivate } from "@/config/axios";

const useAxiosPrivate = () => {
  const { auth, refresh } = useAuth();

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        const authHeader = config.headers.Authorization;

        if (!authHeader) {
          config.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const data = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        }

        Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptors);
      axiosPrivate.interceptors.response.eject(responseInterceptors);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
