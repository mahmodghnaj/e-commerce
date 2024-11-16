import { api } from "@/lib/axios";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";

import { RegisterBody, LoginBody, User } from "./type";

export const useLogin = (
  options?: UseMutationOptions<User, unknown, LoginBody>
) =>
  useMutation<User, unknown, LoginBody>(
    ["login"],
    async (body) => {
      const { data } = await api.post("/api/auth/login", body);
      return data.data;
    },
    options
  );

export const useRegister = (
  options?: UseMutationOptions<User, unknown, LoginBody>
) =>
  useMutation<User, unknown, RegisterBody>(
    ["register"],
    async (body) => {
      const { data } = await api.post("/api/auth/signup", {
        ...body,
        username: body.firstName + " " + body.lastName,
        firstName: undefined,
        lastName: undefined,
        confirmPassword: undefined,
      });
      return data.data;
    },
    options
  );

export const useMe = (options?: UseQueryOptions<User>) =>
  useQuery<User>(
    ["me"],
    async () => {
      const { data } = await api.get("/api/auth/me");
      return data.data;
    },
    options
  );

export const useLogout = (options?: UseMutationOptions) =>
  useMutation(
    ["logout"],
    async () => {
      const { data } = await api.post("/api/auth/logout");
      return data;
    },
    options
  );
