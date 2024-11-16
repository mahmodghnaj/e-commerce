import ProductCard from "@/components/productCard";
import { useMarket } from "@/services/market";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import Main from "@/components/layouts/main";

const Home: NextPageWithLayout = () => {
  //const { data: products } = useMarket();
  const products = [
    {
      id: 1,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 2,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 3,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 4,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 5,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 6,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 7,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 8,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 9,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 10,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 1,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 1,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 1,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
    {
      id: 1,
      name: "mobile",
      price: "20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe vero, pariatur nobis quo accusamus illum alias consequuntur, veniam aliquam suscipit eum natus quis. Accusantium consequuntur quo fugiat officia, aut nobis!",
      imageUrl:
        "https://ik.imagekit.io/d8vzywqrn/products/Untitled_MTTA3stU_.jpeg",
    },
  ];
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
