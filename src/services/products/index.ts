import { api } from "@/lib/axios";
import { IProduct } from "@/models/product";
import { IPaginationOptions, InfinityPaginationResultType } from "../type";
import { useQuery } from "react-query";

export const useProducts = (params: IPaginationOptions) =>
  useQuery<InfinityPaginationResultType<IProduct>>(
    ["listProduct", params],
    async () => {
      const { data } = await api.get("/api/product", { params });
      return data;
    }
  );
