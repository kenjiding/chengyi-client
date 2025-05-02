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

      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {produtsData?.map((product, index) => (
            <div
              key={product.id}
              className="relative group hover:-translate-y-1 transition-transform duration-300"
            >
              <ProductCard product={product} showPrice={showPrice} />
            </div>
          ))}
        </div>

        {/* 装饰性元素 - 使用固定位置替代随机位置 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[20%] left-[15%] animate-pulse" />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[65%] left-[25%] animate-pulse delay-75" />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[40%] left-[75%] animate-pulse delay-100" />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[80%] left-[85%] animate-pulse delay-150" />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[30%] left-[45%] animate-pulse delay-200" />
          <div className="absolute w-2 h-2 rounded-full bg-blue-400/20 top-[70%] left-[65%] animate-pulse delay-300" />
        </div>
      </div>
    </section>
  );
}