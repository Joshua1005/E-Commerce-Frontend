import axios, { AxiosRequestConfig } from "axios";
import { server } from "@/config/keys";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: server.url,
  withCredentials: true,
};

Object.assign(axios.defaults, axiosRequestConfig);

const axiosPrivate = axios.create(axiosRequestConfig);

export { axiosPrivate };
export default axios;
