"use client";

import { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { locales, localeNames } from '@/i18n/config';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={`Current language: ${localeNames[currentLocale as keyof typeof localeNames]}`}
      >
        <span>{localeNames[currentLocale as keyof typeof localeNames]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg py-1 min-w-[120px] z-50 transform transition-all duration-200"
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              className={`block w-full px-4 py-2 text-left bg-white transition-colors
              ${currentLocale === locale ? 'text-blue-600 font-medium' : 'text-gray-700'}`}
              onClick={() => setIsOpen(false)}
            >
              {localeNames[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}