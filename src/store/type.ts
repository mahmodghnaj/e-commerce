import { IProduct } from "@/models/product";
import { User } from "@/services/auth/type";

export interface UserSlice {
  userInfo: User | null;
  setUserInfo: (userInfo: User) => void;
}

interface IProductCard extends IProduct {
  quantity?: number;
}
export interface CartSlice {
  cart: IProductCard[];
  addToCart: (product: IProductCard) => void;
  removeFromCart: (id: number) => void;
}
