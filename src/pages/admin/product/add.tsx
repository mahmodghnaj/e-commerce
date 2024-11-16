import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import EditorProduct, { Product } from "@/components/editorProduct";
import Admin from "@/components/layouts/admin";
import { useAddProduct } from "@/services/products";
import { useRouter } from "next/router";
import { queryClient } from "@/lib/reactQuery";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate: add, isLoading } = useAddProduct({
    onSuccess: () => {
      queryClient.invalidateQueries(["listProduct"]);
      router.push("/admin");
    },
  });
  const saveProduct = (product: Product) => {
    console.log(product);
    add({ body: product });
  };
  return (
    <>
      <EditorProduct
        isLoading={isLoading}
        onSubmit={(product) => saveProduct(product)}
      />
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Admin>{page}</Admin>;
};
export default Page;
