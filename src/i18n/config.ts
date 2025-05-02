export const locales = ['en', 'zh', 'ru'] as const;
export const defaultLocale = 'en' as const;

export const localeNames = {
  en: 'English',
  zh: '中文',
  ru: 'Русский (язык)',
} as const;

export type Locale = (typeof locales)[number]; 