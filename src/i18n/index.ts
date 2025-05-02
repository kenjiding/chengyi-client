// i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    throw new Error(`Locale ${locale} is not supported`);
  }

  try {
    // Load messages for the requested locale
    const messages = (await import(`./locales/${locale}.json`)).default;
    return {
      messages: messages,
      // Add timeZone if needed
      timeZone: 'Asia/Shanghai',
    };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to English if loading fails
    const fallbackMessages = (await import(`./locales/en.json`)).default;
    return {
      messages: fallbackMessages,
      timeZone: 'Asia/Shanghai',
    };
  }
});