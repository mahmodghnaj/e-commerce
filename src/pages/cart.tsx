import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Main from "@/components/layouts/main";
import useStore from "@/store";
import ProductCard from "@/components/productCard";
import { useRouter } from "next/router";

const Page: NextPageWithLayout = () => {
  const { cart, addToCart, removeFromCart } = useStore();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleIncrease = (productId: number) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      addToCart({ ...product, quantity: (product.quantity || 1) + 1 });
    }
  };

  const handleDecrease = (productId: number) => {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
      addToCart({ ...product, quantity: product.quantity - 1 });
    } else {
      removeFromCart(productId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-primary text-primary-content rounded-md hover:bg-secondary"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 overflow-y-auto max-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cart.map((product) => (
          <div
            key={product.id}
            className="bg-base-100 shadow-lg rounded-lg border border-base-300 p-4"
          >
            <ProductCard product={product} />
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleDecrease(product.id)}
                className="px-4 py-2 border rounded-md text-secondary hover:bg-secondary hover:text-secondary-content"
              >
                -
              </button>
              <span className="text-lg font-semibold">
                {product.quantity || 1}
              </span>
              <button
                onClick={() => handleIncrease(product.id)}
                className="px-4 py-2 border rounded-md text-primary hover:bg-primary hover:text-primary-content"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-base-100 shadow-lg rounded-lg w-full lg:w-1/4 h-fit sticky top-6 self-start">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id} className="flex justify-between mb-2">
              <span>
                {product.name} (x{product.quantity || 1})
              </span>
              <span>
                ${(product.price * (product.quantity || 1)).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          onClick={() => console.log("Checkout Clicked")}
          className="mt-6 w-full py-2 bg-primary text-primary-content rounded-md hover:bg-secondary"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

Page.getLayout = (page: ReactElement) => {
  return <Main>{page}</Main>;
};

export default Page;
