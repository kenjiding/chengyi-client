import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { getProducts } from '@/app/api/admin/products/service';

type Props = {
  params: { 
    id: string;
    locale: string;
  };
};

async function getProduct(id: string) {
  const data = await getProducts({
    id
  });

  return data.items || [];
}

async function getRelatedProducts(id: string) {
  return [];
}

export default async function ProductPage(props: Props) {
  const { id, locale } = await props.params;
  
  try {
    const products = await getProduct(id);
    const product = products[0];
    const relatedProducts = await getRelatedProducts(id);

    if (!product) {
      notFound();
    }

    return (
      <ProductDetail 
        product={product} 
        locale={locale}
        relatedProducts={relatedProducts}
      />
    );
  } catch (error) {
    console.error('Error fetching product data:', error);
    notFound();
  }
}
