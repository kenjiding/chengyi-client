import { Inter } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import Header from '@/components/Header';
import RootContact from '@/components/Contact';
import Footer from '@/components/Footer';
import '../globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata() {
  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: '成益公司', url: 'https://www.chengyiauto.com' }],
    openGraph: {
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      url: 'https://www.chengyiauto.com',
      siteName: '成益',
      images: [
        {
          url: '/images/og-image.jpg', // 确保在 public/images/ 下有 og-image.jpg
          width: 1200,
          height: 630,
        },
      ],
      locale: 'zh-CN',
      type: 'website',
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://www.chengyiauto.com',
      languages: {
        'zh-CN': 'https://www.chengyiauto.com/zh',
        'en-US': 'https://www.chengyiauto.com/en',
        'en-RU': 'https://www.chengyiauto.com/ru',
      },
    },      
  }
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  
  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/i18n/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-54Y1VL86D6"></Script>
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-54Y1VL86D6');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">{props.children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <RootContact />
      </body>
    </html>
  );
}