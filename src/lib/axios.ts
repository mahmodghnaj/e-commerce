import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

export { api };
