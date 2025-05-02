import { getTranslations } from 'next-intl/server';
import CategoryCard from '@/components/CategoryCard';
import Request from '@/lib/request';
import { Category } from '@/types';
import { getBrands } from '@/app/api/admin/brands/service';


export default async function CategoriesPage() {
  const t = await getTranslations('common');
  const categories = await getBrands({});

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('categories')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
} 