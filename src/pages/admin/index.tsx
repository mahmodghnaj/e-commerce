import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import Main from "@/components/layouts/main";
import Table from "@/components/table";
import { Column, TableAction } from "@/services/type";
import { useProducts } from "@/services/products";
import { IProduct } from "@/models/product";
import DeleteIcon from "@/components/icons/delete";
import EditIcon from "@/components/icons/edit";
import ViewIcon from "@/components/icons/view";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const router = useRouter();

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
      handler: () => {},
    },
    {
      name: "edit",
      icon: <EditIcon />,
      handler: () => {},
    },
  ];
  return (
    <>
      <div className="flex items-center justify-center bg-base-100  w-full h-full flex-col">
        <div className="mx-10  mt-10 overflow-hidden">
          <div className="mb-3">
            <div className="flex w-full justify-between">
              <h1 className="text-4xl mb-2 text-center font-bold">
                My Products
              </h1>
              <div>
                <button
                  className="btn btn-primary btn-md"
                  onClick={() => router.push("/admin/add-product")}
                >
                  Add New Product
                </button>
              </div>
            </div>
          </div>
          <Table
            className="min-h-4/6"
            columns={columns}
            fetchQuery={useProducts}
            actions={actions}
          />
        </div>
      </div>
    </>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};
export default Page;
