import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Login from "@/components/login";
import Auth from "@/components/layouts/auth";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <Login />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};
export default Page;
