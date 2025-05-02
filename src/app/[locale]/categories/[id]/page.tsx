import { categories } from '@/data/categories';
import { featuredProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard/ClientProductCard';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function CategoryPage({ params }: { params: { id: string } }) {
  const t = useTranslations('common');
  const category = categories.find(c => c.id === params.id);
  
  if (!category) {
    notFound();
  }

  // 模拟该分类下的产品
  const categoryProducts = featuredProducts.slice(0, 8);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
} 