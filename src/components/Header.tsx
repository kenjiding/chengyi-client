"use client";

import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, X } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { cartStore } from '@/store/cartStore';
import { CartItem } from '@/types';
import Image from 'next/image';

export default function Header() {
  const { cart } = cartStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { scrollY } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const t = useTranslations('common');

  const total = cart.reduce((sum: number, item: CartItem) => {
    if (!item.product) {
      return sum;
    }
    return sum + item.quantity;
  }, 0);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = latest / (documentHeight - windowHeight) || 0;
      setScrollProgress(progress);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const headerOpacity = useTransform(scrollY, [0, 50], [0.9, 1]);
  const headerShadow = useTransform(scrollY, [0, 50], ['none', '0 4px 6px -1px rgb(0 0 0 / 0.1)']);

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`text-center transition-colors font-medium
          ${isActive
            ? 'text-blue-600'
            : 'text-gray-700 hover:text-blue-600'
          } ${className}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-200 w-full
                ${isScrolled ? 'bg-white' : 'bg-white/90'}`}
      style={{
        opacity: headerOpacity,
        boxShadow: headerShadow,
      }}
    >
      <nav className="w-full px-5 sm:px-10 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 relative">
            <div className="absolute w-20 h-20">
              <Image
                alt="CHENGYI 公司 Logo"
                src="/logo.png"
                fill
                sizes="(max-width: 768px) 40px, 40px"
                className="object-contain"
              />
            </div>
          </Link>
          <span className={`text-xl font-bold transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}>
              {/* CHENGYI */}
          </span>

          {/* Right side menu */}
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 mr-4">
              {/* Search Input */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center border border-gray-200 rounded-full px-3 py-1 transition-all duration-300 
                  focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <Search className="w-5 h-7 text-gray-400 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-48 outline-none bg-transparent text-sm placeholder-gray-400"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>

              <NavLink href="/categories">{t('categories')}</NavLink>
              <NavLink href="/products">{t('products')}</NavLink>
              <NavLink href="/news">{t('news')}</NavLink>
              <NavLink href="/about">{t('about')}</NavLink>
              <NavLink href="/cart" className='w-10'>
                <div className='relative'>
                  <span className='absolute -top-3 right-2 text-red-600'>{total}</span>
                  <ShoppingCart />
                </div>
              </NavLink>
            </div>

            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 ml-4 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}<AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 mt-2 space-y-1 border-t border-gray-100">
                {/* Search for Mobile */}
                <form onSubmit={handleSearch} className="px-4 mb-2">
                  {/* ... (search input code remains unchanged) ... */}
                </form>
                <Link
                  href="/cart"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center
            ${pathname === '/cart'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('cart')}
                </Link>
                <Link
                  href="/categories"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center
            ${pathname === '/categories'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('categories')}
                </Link>
                <Link
                  href="/products"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center
            ${pathname === '/products'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('products')}
                </Link>
                <Link
                  href="/news"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center
            ${pathname === '/news'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('news')}
                </Link>
                <Link
                  href="/about"
                  className={`block px-4 py-2 rounded-lg transition-colors text-center
            ${pathname === '/about'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('about')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Progress Bar */}
      <motion.div
        className="h-0.5 bg-blue-600 origin-left"
        style={{
          scaleX: scrollProgress
        }}
      />
    </motion.header>
  );
}