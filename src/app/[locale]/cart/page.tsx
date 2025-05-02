"use client";

import { cartStore } from '@/store/cartStore';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types';
import { InquiryDialog } from '@/components/InquiryDialog';

// Loading 组件
function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}

// Empty Cart 组件
function EmptyCart({ t }: { t: any }) {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 text-center">
      <div className="max-w-md mx-auto">
        <svg
          className="w-16 sm:w-24 h-16 sm:h-24 mx-auto mb-4 sm:mb-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{t('emptyCart')}</h2>
        <p className="text-gray-600 mb-6 sm:mb-8">{t('emptyCartMessage')}</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('continueShopping')}
        </Link>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [isClient, setIsClient] = useState(false);
  const t = useTranslations('cart');
  const { cart, removeFromCart, updateQuantity, clearCart } = cartStore();

  // 客户端挂载检查
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 验证购物车数据
  useEffect(() => {
    console.log('cart: ', cart);

    if (!isClient) return;

    const invalidItems = cart.filter(
      (item) => !item.product
    );
    if (invalidItems.length > 0) {
      console.warn('Found invalid items in cart, clearing cart');
      clearCart();
    }
  }, [cart, clearCart, isClient]);

  // 等待客户端渲染
  if (!isClient) {
    return <Loading />;
  }

  // 空购物车状态
  if (cart.length === 0) {
    return <EmptyCart t={t} />;
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{t('title')}</h1>
      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <AnimatePresence>
              <div className="divide-y">
                {cart.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 sm:p-6 max-w-full"
                  >
                    <div className="flex flex-row items-center gap-3 sm:gap-4 w-full">
                      <div className="relative w-12 h-12 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images?.[0] || '/fallback-image.jpg'}
                          alt={item.product.name || 'Product'}
                          fill
                          className="object-contain p-1 sm:p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0 max-w-full">
                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="text-sm sm:text-lg font-semibold hover:text-blue-600 transition-colors truncate max-w-48 sm:max-w-full">
                            {item.product.name || 'Unknown Product'}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="ml-2 text-gray-400 hover:text-red-600 transition-colors flex-shrink-0"
                          >
                            <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="mb-2 sm:mb-4 line-clamp-2 text-xs sm:text-base">{item.product.description?.slice(0, 100) || 'No description'}</p>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <label className="text-gray-600 text-xs sm:text-base">{t('quantity')}:</label>
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="px-1 sm:px-3 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-10 sm:w-16 text-center border-x text-xs sm:text-base"
                            />
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-1 sm:px-3 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-20 sm:top-24">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{t('orderSummary')}</h2>
            <InquiryDialog products={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}