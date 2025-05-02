"use client";
import { useState, useEffect } from "react";
import { cartStore } from '@/store/cartStore';
import type { IProduct } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { pushGoogleAnalyticsEvent } from "@/lib/utils";
import { AnalyticeEvents } from "@/types/analytics";

export default function AddToCartButton({ product }: { product: IProduct }) {
  const t = useTranslations("common");
  const [quantity, setQuantity] = useState(0);
  const { cart, addToCart, removeFromCart } = cartStore();

  // 在组件挂载时和购物车变化时，检查当前商品的数量
  useEffect(() => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cart, product.id]);

  const handleAddToCart = () => {
    // google analytics 事件
    pushGoogleAnalyticsEvent(AnalyticeEvents.AddToCart, product);
    addToCart(product);
    setQuantity(1);
  };

  const updateQuantity = (newQuantity: number) => {
    const diff = newQuantity - quantity;
    if (diff > 0) {
      addToCart(product, diff);
    } else if (diff < 0) {
      removeFromCart(product.id);
    }
    setQuantity(newQuantity);
  };

  return (
    <div className="flex justify-center w-full">
      <AnimatePresence mode="wait">
        {quantity === 0 ? (
          <motion.button
            key="add-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg 
            bg-blue-600 text-white font-medium min-w-[120px]
            hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-6 h-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="truncate max-w-[100px]">{t("addToCart")}</span>
          </motion.button>
        ) : (
          <motion.div
            key="quantity-controls"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="inline-flex items-center h-9 bg-gray-100 rounded-lg"
          >
            <button
              onClick={() => updateQuantity(quantity - 1)}
              className="w-9 h-9 inline-flex items-center justify-center text-gray-600 hover:text-blue-600 
              hover:bg-gray-200 transition-colors rounded-l-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-10 text-center font-medium text-gray-700">{quantity}</span>
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="w-9 h-9 inline-flex items-center justify-center text-gray-600 hover:text-blue-600 
              hover:bg-gray-200 transition-colors rounded-r-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}