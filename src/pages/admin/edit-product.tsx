import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Main from "@/components/layouts/main";
import EditorProduct from "@/components/editorProduct";

const Page: NextPageWithLayout = () => {
  return (
    <>
      <EditorProduct onSubmit={() => {}} />
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};
export default Page;
