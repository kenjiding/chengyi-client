export const LOCALE_EN = 'en';
export const LOCALE_ZH = 'zh';
export const LOCALE_RU = 'ru';
export const locales = [LOCALE_EN, LOCALE_ZH, LOCALE_RU] as const;
export const defaultLocale = LOCALE_EN;

export const localeNames = {
  en: 'English',
  zh: '中文',
  ru: 'Русский (язык)',
} as const;

export type Locale = (typeof locales)[number]; 