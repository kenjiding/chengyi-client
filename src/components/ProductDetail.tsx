"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import { Link } from '@/i18n/routing';
import { IProduct } from '@/types';
import { formatPrice } from '@/lib/utils';

export default function ProductDetail({ 
  product, 
  relatedProducts,
  locale 
}: { 
  product: IProduct;
  relatedProducts: IProduct[];
  locale: string;
}) {
  const t = useTranslations('common');
  const [selectedImage, setSelectedImage] = useState(0);
  const features = product.features?.split(',');

  return (
    <>
      {/* <Head>
        <title>{`${product.name} | chengyi`}</title>
        <meta name="description" content={product.description.slice(0, 160)} /> 
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description.slice(0, 160)} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={canonicalUrl} />
        <link rel="canonical" href={canonicalUrl} />
      </Head> */}

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": `https://chnegyiauto.com/${locale}/products/${product.id}`,
          "@type": "IProduct",
          "name": product.name,
          "description": product.description,
          "image": product.images[0],
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.price,
          }
        })}
      </script>

      <section className="container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href={`/`} className="hover:text-blue-600">{t('home')}</Link>
          <span>/</span>
          <Link href={`/products`} className="hover:text-blue-600">{t('products')}</Link>
          <span>/</span>
          <span
            className="text-gray-900 truncate block max-w-full"
            aria-current="page"
          >
            {product.name}
          </span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 产品图片部分 */}
          <div className="space-y-6">
            <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.name} - ${selectedImage + 1}`}
                fill
                className="object-contain p-4"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-gray-100 rounded-lg overflow-hidden
                      ${selectedImage === index ? 'ring-2 ring-blue-600' : ''}`}
                    aria-label={`View image ${index + 1} of ${product.name}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 产品信息部分 */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4 truncate max-w-full" style={{ maxWidth: '90vw' }}>
                {product.name}
              </h1>

              <p className="text-gray-600">{product.description}</p>
              {
                Number(product.price) > 0 && <div className='mt-5'>
                  <span className="text-2xl font-semibold text-green-700">{formatPrice(product.price, locale)}</span>
                  {product.stock && (
                    <span className="ml-2 text-red-600">{product.stock}</span>
                  )}
                </div>
              }
            </div>

            <AddToCartButton product={product} />

            {/* 产品特点 */}
            {features && features.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">{t('features')}</h2>
                <ul className="space-y-3 text-gray-600">
                  {features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 技术规格 */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="border-t pt-8">
                <h2 className="text-xl font-semibold mb-4">{t('specifications')}</h2>
                <dl className="grid grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex flex-col">
                      <dt className="text-gray-500 text-sm">{spec.name}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* 相关产品 */}
        <section className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-8">{t('relatedProducts')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </section>
    </>
  );
}