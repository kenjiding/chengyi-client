import React from 'react';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:px-8 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-3/12">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-6 animate-pulse"></div>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="mb-4">
                  <div className="h-6 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-9/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}