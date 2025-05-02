import Image from 'next/image';
import { ICollaboration } from '@/types';
import { getCollaborations } from '@/app/api/admin/collaborations/service';

export default async function FeaturedBrands() {
  const collaborations = await getCollaborations();

  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Trusted Brands</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We partner with leading manufacturers to provide you with the highest quality components
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {collaborations?.map((brand) => (
          <div 
            key={brand.name}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
              {
                brand.image && <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-20 w-full object-contain"
                />
              }
            </div>
            <p className='text-center py-4 font-light'>{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}