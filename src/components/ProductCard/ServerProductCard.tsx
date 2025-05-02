import Image from 'next/image';
import { IProduct } from "@/types";

export default function ProductCardStatic({ product }: { product: IProduct }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-40 sm:h-48 bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain p-4"
        />
      </div>
      {/* 基础内容 */}
    </div>
  );
}