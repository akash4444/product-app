import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { CartItem } from "@/types/productTypes";



type AppState = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],

        addToCart: (item) => {
          const existingItem = get().cartItems.find((i) => i.id === item.id);

          if (existingItem) {
            const quantityToAdd = item.quantity ?? 1;
            set((state) => ({
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + quantityToAdd } : i
              ),
            }));
          } else {
            set((state) => ({
              cartItems: [
                ...state.cartItems,
                { ...item, quantity: item.quantity ?? 1 },
              ],
            }));
          }
        },

        removeFromCart: (id) => {
          set((state) => ({
            cartItems: state.cartItems.filter((i) => i.id !== id),
          }));
        },

        incrementItem: (id) => {
          set((state) => ({
            cartItems: state.cartItems.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        },

        decrementItem: (id) => {
          set((state) => ({
            cartItems: state.cartItems
              .map((i) =>
                i.id === id ? { ...i, quantity: i.quantity - 1 } : i
              )
              .filter((i) => i.quantity > 0),
          }));
        },

        clearCart: () => {
          set({ cartItems: [] });
        },
      }),
      {
        name: "cart",
      }
    )
  )
);

export default useCartStore;
