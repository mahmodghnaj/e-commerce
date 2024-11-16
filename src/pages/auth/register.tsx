import Auth from "@/components/layouts/auth";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import SignUp from "@/components/signUp";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative w-full h-full flex items-center justify-center">
        <SignUp />
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Auth>{page}</Auth>;
};
export default Page;
