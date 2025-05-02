import { IProduct } from '@/types';
import { Suspense } from 'react';
import ServerProductCard from './ServerProductCard';
import ClientProductCard from './ClientProductCard';

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Suspense fallback={<ServerProductCard product={product} />}>
      <ClientProductCard product={product} />
    </Suspense>
  );
}