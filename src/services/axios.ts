import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

import SessionStorageService from "./sessionStorage";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "text/plain",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = SessionStorageService.getItem("token");

    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;
