'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AddToCartButton from '../AddToCartButton';
import type { IProduct } from '@/types';
import { Link } from '@/i18n/routing';

export default function ProductCard({ product, showPrice }: { product: IProduct, showPrice?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images?.length
    );
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images?.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden group w-full hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          { product.special && <span className='absolute top-2 right-2 bg-red-500 z-20 rounded-full text-white w-10 h-10 flex justify-center items-center border'>特价</span>}
          <div className="relative w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105">
            {product.images?.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                fill
                priority={index === 0}
                className={`object-contain transition-opacity duration-300 ease-in-out
                  ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>

          {product.images?.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <button 
                onClick={handlePrevImage}
                className="bg-white/50 hover:bg-white/75 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextImage}
                className="bg-white/50 hover:bg-white/75 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {product.images?.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
              {currentImageIndex + 1} / {product.images?.length}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 sm:p-6">
        <Link href={`/products/${product.id}`} className="block">
        <h3
          className={`text-lg sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors duration-300 ease-in-out
            ${isHovered ? 'text-blue-600' : 'text-gray-900'} 
            line-clamp-2`}
        >
          {product.name}
        </h3>

        </Link>
        <p className={`text-gray-600 text-sm sm:text-base line-clamp-2 ${!showPrice ? 'mb-3' : ''}`}>
          {product.description}
        </p>
        { showPrice && 
          <div className='flex justify-between my-2 sm:my-2'>
            <span className="text-md sm:text-lg font-semibold text-green-600">
              ${product.price}
            </span>
            {product.stock && (
              <span className="ml-2 text-red-600">
                {product.stock}
              </span>
            )}
          </div>
        }
        <div className="flex items-center justify-center">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}