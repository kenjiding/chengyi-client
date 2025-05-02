"use client";

import { Link, usePathname } from '@/i18n/routing';
import { cartStore } from '@/store/cartStore';
import { motion } from 'framer-motion';

export default function CartButton() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const cart = cartStore((state) => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href={`/cart`}
      className="relative text-gray-700 hover:text-blue-600 transition-colors"
    >
      Cart
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-4 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
        >
          {itemCount}
        </motion.span>
      )}
    </Link>
  );
} 