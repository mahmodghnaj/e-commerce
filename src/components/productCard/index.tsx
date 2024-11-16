import { IProduct } from "@/models/product";
import useStore from "@/store";
import Image from "next/image";
import { useRouter } from "next/router";

function ProductCard({ product }: { product: IProduct }) {
  const { imageUrl, name, price, description } = product;
  const { addToCart, removeFromCart, cart, userInfo } = useStore();
  const router = useRouter();

  const isInCart = cart.some((cartItem) => cartItem.id === product.id);
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden border border-base-300">
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          priority
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold text-primary">{name}</h2>
        <p className="text-sm text-base-content mt-2 line-clamp-3">
          {description}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-secondary">${price}</span>
          {userInfo ? (
            <>
              {isInCart ? (
                <button
                  onClick={handleRemoveFromCart}
                  className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:border-secondary hover:text-secondary"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-secondary"
                >
                  Add to Cart
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/auth/login")}
                className="px-4 py-2 bg-primary text-primary-content rounded-md hover:bg-secondary"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
