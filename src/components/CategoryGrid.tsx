import { getTranslations } from 'next-intl/server';
import CategoryCard from './CategoryCard';
import { Category } from '@/types';
import Request from '@/lib/request';
import { getBrands } from '@/app/api/admin/brands/service';

export default async function CategoryGrid() {
  const t = await getTranslations('home.categories');
  const brands = await getBrands({});

  return (
    <section className='px-4'>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands?.map((brand) => (
          <CategoryCard key={brand.id} category={brand} />
        ))}
      </div>
    </section>
  );
}