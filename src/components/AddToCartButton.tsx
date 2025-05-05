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
  const { cart, addToCart, removeFromCart, updateQuantity } = cartStore();

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

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity < 0) return; // Prevent negative quantities
    updateQuantity(product.id, newQuantity);
    if (newQuantity === 0) {
      removeFromCart(product.id); // Reduce to 0, which will stay in cart with quantity 0
    }
    setQuantity(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newQuantity = parseInt(value, 10) || 0; // Default to 0 if invalid
    handleUpdateQuantity(newQuantity);
  };

  const handleInputBlur = () => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity === 0) {
      removeFromCart(product.id); // Ensure cart reflects 0 quantity
    }
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
            className="w-full inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg 
            bg-blue-600 text-white font-medium min-w-[120px]
            hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4 flex-shrink-0"
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
            <span className="text-xs truncate max-w-[100px]">{t("addToCart")}</span>
          </motion.button>
        ) : (
          <motion.div
            key="quantity-controls"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="border border-[#ddd] inline-flex items-center h-7 sm:h-9 bg-gray-100 rounded-lg"
          >
            <button
              onClick={() => handleUpdateQuantity(quantity - 1)}
              className="border-r border-r-[#ddd] w-7 h-7 sm:w-9 sm:h-9 inline-flex items-center justify-center text-gray-600 hover:text-blue-600 
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
            <input
              type="number"
              value={quantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-11 h-7 md:h-9 text-center text-xs font-medium text-gray-700 bg-gray-100 border-t border-b border-[#ddd] border-l-0 border-r-0 appearance-none focus:outline-none"
              min="0"
              style={{ 
                'appearance': 'none' 
              }}
            />
            <button
              onClick={() => handleUpdateQuantity(quantity + 1)}
              className="border-l border-l-[#ddd] w-7 h-7 sm:w-9 sm:h-9 inline-flex items-center justify-center text-gray-600 hover:text-blue-600 
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