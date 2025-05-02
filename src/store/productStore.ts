import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartState {
  loading: boolean;
  changeProductsLoading: (val: boolean) => void;
}

export const productStore = create<CartState>()(
  persist(
    (set, get) => ({
      loading: false,
      changeProductsLoading: (val) => {
        set({ loading: val })
      },
    }),
    {
      name: 'product-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);