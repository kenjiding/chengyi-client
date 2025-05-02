"use client";

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Category } from '@/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <Link href={`/products?brandId=A-${category.id}`}>
        <div className="relative h-32 overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
        </div>
        <div className="p-4 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
          <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-600 text-center">
            {category.name}
          </h3>
          <p className="text-gray-600 font-serif transition-colors duration-300 group-hover:text-gray-800">
            {category.description}
          </p>
        </div>
      </Link>
    </div>
  );
}