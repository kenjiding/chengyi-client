import { Suspense } from 'react';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryGrid from '@/components/CategoryGrid';
import Banner from '@/components/banner';
import FeaturedBrands from '@/components/FeaturedBrands';
import ComLoading from '@/components/ComLoading';
import WhyChooseUs from '@/components/WhyChooseUs';
import News from '@/components/News';
import { getBanners } from '../api/admin/banners/service';
import { getProducts } from '../api/admin/products/service';
import DynamicLoadingComponent from '@/components/DynamicLoading';

// export const revalidate = 3600; // 重新验证时间，单位为秒

export default async function Home() {
  const banners = await getBanners();

  return (
    <>
      <Suspense fallback={<ComLoading />}>
        <Banner data={banners} />
      </Suspense>
      <div className="container mx-auto py-12 space-y-24">
        <Suspense fallback={<DynamicLoadingComponent text='Loading Products...'></DynamicLoadingComponent>}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<DynamicLoadingComponent text='Loading Speciel Products...'></DynamicLoadingComponent>}>
          <FeaturedProducts showPrice title='specielTitle' subtitle='specielSubTitle' />
        </Suspense>
        <Suspense fallback={<DynamicLoadingComponent text='Loading News'></DynamicLoadingComponent>}>
          <News></News>
        </Suspense>
        <Suspense fallback={<DynamicLoadingComponent></DynamicLoadingComponent>}>
          <CategoryGrid />
        </Suspense>
        <FeaturedBrands />
        <WhyChooseUs />
        {/* <NewsletterSection /> */}
      </div>
    </>
  );
}