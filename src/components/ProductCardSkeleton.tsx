
const ProductCardSkeleton = () => (
  <div className="rounded-lg border shadow p-4 animate-pulse">
    <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
  </div>
);

export default ProductCardSkeleton;
