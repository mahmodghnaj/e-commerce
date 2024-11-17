import { api } from "@/lib/axios";
import { IProduct } from "@/models/product";
import { UseQueryOptions, useQuery } from "react-query";

export const useMarket = (options?: UseQueryOptions) =>
  useQuery<IProduct[]>(
    ["market"],
    async () => {
      const { data } = await api.get("/api/market");
      return data.data;
    },
    options
  );
