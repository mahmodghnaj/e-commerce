import { api } from "@/lib/axios";
import { IProduct } from "@/models/product";
import { useQuery } from "react-query";

export const useMarket = () =>
  useQuery<IProduct[]>(["market"], async () => {
    const { data } = await api.get("/api/market");
    return data.data;
  });
