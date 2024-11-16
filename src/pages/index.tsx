import ProductCard from "@/components/productCard";
import { useMarket } from "@/services/market";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Main from "@/components/layouts/main";

const Home: NextPageWithLayout = () => {
  const { data: products, isLoading } = useMarket();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};

export default Home;
