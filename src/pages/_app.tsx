import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/reactQuery";

export type NextPageWithLayout<P, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Page = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const PageComponentWithLayout = () => getLayout(<Component {...pageProps} />);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageComponentWithLayout />
      </QueryClientProvider>
    </>
  );
};
export default Page;
