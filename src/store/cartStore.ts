import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IProduct } from '@/types';

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: IProduct, quantity?: number) => void;
  reduceFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const cartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          }));
        } else {
          set((state) => ({
            cart: [...state.cart, { product, quantity }],
          }));
        }
      },
      reduceFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          ),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);