export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 面包屑导航骨架 */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* 产品图片骨架 */}
        <div className="md:w-2/6 mb-6 md:mb-0">
          <div className="w-full aspect-square bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* 产品信息骨架 */}
        <div className="md:w-1/2">
          {/* 产品标题骨架 */}
          <div className="h-8 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-8"></div>
          
          {/* 价格骨架 */}
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>
          
          {/* 数量选择器骨架 */}
          <div className="h-10 w-full max-w-xs bg-gray-200 rounded animate-pulse mb-8"></div>
          
          {/* 特性骨架 */}
          <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      
      {/* 相关产品骨架 */}
      <div className="mt-16">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
}