import ProductCard from './ProductCard/ClientProductCard';
import { getTranslations } from 'next-intl/server';
import { getProducts } from '@/app/api/admin/products/service';

const getProductsHandle = async () => {
  const products = await getProducts({
    page: 1,
    pageSize: 12
  });

  return products.items || [];
}

export default async function FeaturedProducts({
  showPrice,
  title = 'title',
  subtitle = 'subtitle'
}: {
  title?: string,
  subtitle?: string,
  showPrice?: boolean
}) {
  const t = await getTranslations('home.featured');
  const products = await getProductsHandle();
  const titleText = title === 'title' ? t('title') : t('specielTitle');
  const subtitleText = subtitle === 'subtitle' ? t('subtitle') : t('specielSubtitle');
  const produtsData = products?.filter((item) => {
    if(title === 'title') {
      return !item.special;
    } else {
      return item.special;
    }
  });

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {titleText}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitleText}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 relative">
        {produtsData?.map((product, index) => (
          <div
            key={product.id}
            className="relative group hover:-translate-y-1 transition-transform duration-300"
          >
            <ProductCard product={product} showPrice={showPrice} />
          </div>
        ))}
      </div>
    </section>
  );
}