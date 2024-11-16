import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import EditorProduct, { Product } from "@/components/editorProduct";
import Admin from "@/components/layouts/admin";
import { useParams } from "next/navigation";
import { useEditProduct, useProduct } from "@/services/products";
import { useRouter } from "next/router";
import { queryClient } from "@/lib/reactQuery";

const Page: NextPageWithLayout = () => {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();

  const { mutate: edit, isLoading: isLoadingEdit } = useEditProduct({
    onSuccess: () => {
      queryClient.invalidateQueries(["listProduct"]);
      router.push("/admin");
    },
  });
  const editProduct = (product: Product) => {
    edit({ id: productId ?? "", body: product });
  };

  const { data, isLoading } = useProduct(productId, {
    enabled: !!productId,
  });

  if (!productId) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <EditorProduct
        isLoading={isLoadingEdit || isLoading}
        product={data}
        onSubmit={(product) => editProduct(product)}
      />
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Admin>{page}</Admin>;
};
export default Page;
