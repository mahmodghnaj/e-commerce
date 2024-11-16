import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Table from "@/components/table";
import { Column, TableAction } from "@/services/type";
import { useDeleteProduct, useProducts } from "@/services/products";
import { IProduct } from "@/models/product";
import DeleteIcon from "@/components/icons/delete";
import EditIcon from "@/components/icons/edit";
import { useRouter } from "next/router";
import Admin from "@/components/layouts/admin";
import { queryClient } from "@/lib/reactQuery";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries(["listProduct"]);
    },
  });

  const deleteProduct = (id: string) => {
    mutate(id);
  };
  const columns: Column<IProduct>[] = [
    {
      name: "name",
      filed: (col) => col.name,
      label: "Name",
    },
    {
      name: "price",
      filed: (col) => col.price,
      label: "Price",
    },
    {
      name: "description",
      filed: (col) => col.description,
      label: "description",
    },
  ];
  const actions: TableAction<IProduct>[] = [
    {
      name: "delete",
      icon: <DeleteIcon />,
      handler: (col) => deleteProduct(col._id as string),
    },
    {
      name: "edit",
      icon: <EditIcon />,
      handler: (col) => {
        router.push(`/admin/product/${col._id}`);
      },
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center bg-base-100  w-full h-full flex-col ">
        <div className="mx-10  mt-10 ">
          <div className="mb-3">
            <div className="flex w-full justify-between">
              <h1 className="text-4xl mb-2 text-center font-bold">
                My Products
              </h1>
              <div>
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => router.push("/admin/product/add")}
                >
                  Add New Product
                </button>
              </div>
            </div>
          </div>
          <Table columns={columns} fetchQuery={useProducts} actions={actions} />
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Admin>{page}</Admin>;
};
export default Page;
