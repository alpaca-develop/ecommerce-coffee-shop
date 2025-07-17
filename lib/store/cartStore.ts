import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, Product, CartItem } from '../../types';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0,
      },
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.cart.items.findIndex(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];
          if (existingItemIndex > -1) {
            newItems = state.cart.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.cart.items, { product, quantity }];
          }

          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          return {
            ...state,
            cart: {
              items: newItems,
              total,
            },
          };
        });
      },
      removeItem: (productId: string) => {
        set((state) => {
          const newItems = state.cart.items.filter(
            (item) => item.product.id !== productId
          );
          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          return {
            ...state,
            cart: {
              items: newItems,
              total,
            },
          };
        });
      },
      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return state;
          }

          const newItems = state.cart.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );
          const total = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );

          return {
            ...state,
            cart: {
              items: newItems,
              total,
            },
          };
        });
      },
      clearCart: () => {
        set((state) => ({
          ...state,
          cart: {
            items: [],
            total: 0,
          },
        }));
      },
      getItemQuantity: (productId: string) => {
        const state = get();
        const item = state.cart.items.find(
          (item) => item.product.id === productId
        );
        return item ? item.quantity : 0;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);