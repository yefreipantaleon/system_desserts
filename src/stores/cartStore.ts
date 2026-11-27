import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../interfaces/cart";
import type { CartState } from "../interfaces/CartStateProps";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            };
          }
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          };
          return { items: [...state.items, newItem] };
        }),

      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "desserts-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const selectTotalItems = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalPrice = (state: CartState) =>
  Math.round(state.items.reduce((total, item) => total + item.price * item.quantity, 0) * 100) / 100;