import { DefaultOptions, QueryClient } from "react-query";

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 30,
    keepPreviousData: true,
    cacheTime: 1000 * 30,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
