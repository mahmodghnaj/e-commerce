import { create } from "zustand";
import { CartSlice, UserSlice } from "./type";

const createUserSlice = (set: unknown): UserSlice => ({
  userInfo: null,
  setUserInfo: (userInfo) => set(() => ({ userInfo })),
});

const createCartSlice = (set: unknown): CartSlice => ({
  cart: [],

  addToCart: (product) =>
    set((state: CartSlice) => {
      const existingProduct = state.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),

  removeFromCart: (id: number) =>
    set((state: CartSlice) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
});

const useStore = create((set: unknown) => ({
  ...createUserSlice(set),
  ...createCartSlice(set),
}));

export default useStore;
