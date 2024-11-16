import { api } from "@/lib/axios";
import { IProduct } from "@/models/product";
import { IPaginationOptions, InfinityPaginationResultType } from "../type";
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "react-query";
import { BodyEditorProduct } from "./type";

export const useProducts = (params: IPaginationOptions) =>
  useQuery<InfinityPaginationResultType<IProduct>>(
    ["listProduct", params],
    async () => {
      const { data } = await api.get("/api/product", { params });
      return data;
    }
  );

export const useAddProduct = (
  options?: UseMutationOptions<IProduct, unknown, BodyEditorProduct>
) =>
  useMutation(
    ["useAddProduct"],
    async (product: Omit<BodyEditorProduct, "id">) => {
      const formData = new FormData();
      formData.append("name", product.body.name);
      formData.append("description", product.body.description);
      formData.append("price", product.body.price.toString());
      formData.append("image", product.body.image);
      const { data } = await api.post("/api/product", formData);
      return data.data;
    },
    options
  );
export const useEditProduct = (
  options?: UseMutationOptions<IProduct, unknown, BodyEditorProduct>
) =>
  useMutation(
    ["useEditProduct"],
    async (product: BodyEditorProduct) => {
      const formData = new FormData();
      formData.append("name", product.body.name);
      formData.append("description", product.body.description);
      formData.append("price", product.body.price.toString());
      formData.append("image", product.body.image);
      const { data } = await api.put(`/api/product/${product.id}`, formData);
      return data.data;
    },
    options
  );

export const useDeleteProduct = (
  options?: UseMutationOptions<string, unknown, unknown>
) =>
  useMutation(
    ["useDeleteProduct"],
    async (id: string) => {
      const { data } = await api.delete(`/api/product/${id}`);
      return data.data;
    },
    options
  );

export const useProduct = (
  id: string | string[] | undefined,
  options?: UseQueryOptions<IProduct, unknown>
) =>
  useQuery<IProduct>(
    ["product", id],
    async () => {
      const { data } = await api.get(`/api/product/${id}`);
      return data.data;
    },
    options
  );
