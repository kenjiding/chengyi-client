import { getTranslations } from 'next-intl/server';
import ProductList from './ProductList';
import ClientCategoryMenu from './ClientCategoryMenu';
import { getProducts } from '@/app/api/admin/products/service';
import Toolbar from './Toolbar';

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const tempSearchParams = await searchParams;
  const { brandId, mainCategoryId, subCategoryId } = tempSearchParams;

  const title = `Products${brandId ? ` - Brand ${brandId}` : ''}`;
  const description = `Browse our selection of ${
    brandId || 'top'
  } products${mainCategoryId ? ` in ${mainCategoryId}` : ''}${
    subCategoryId ? ` - ${subCategoryId}` : ''
  }.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/products?brandId=${brandId || ''}&mainCategoryId=${
        mainCategoryId || ''
      }&subCategoryId=${subCategoryId || ''}`,
    },
  };
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const t = await getTranslations('common');
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const pageSize = Number(resolvedSearchParams.pageSize) || 12;
  const special = resolvedSearchParams.special;
  const subCategoryId = resolvedSearchParams.subCategoryId as string | undefined;
  const mainCategoryId = resolvedSearchParams.mainCategoryId as string | undefined;
  const brandId = resolvedSearchParams.brandId as string | undefined;
  const searchValue = resolvedSearchParams.search as string | undefined;

  const { items, pagination } = await getProducts({
    page,
    pageSize,
    name: searchValue,
    subCategoryId: subCategoryId ? subCategoryId : undefined,
    mainCategoryId: mainCategoryId ? mainCategoryId : undefined,
    brandId: brandId ? brandId : undefined,
    special: special ? (typeof special === 'string' ? special : special[0]) : undefined ,
  });
  const products = items.map((item) => {
    const options = [8, 8.5, 9, 9.5];
    const randomValue = options[Math.floor(Math.random() * options.length)];
    item.score = randomValue;
    return item;
  });
  const expanded = resolvedSearchParams.expanded;
  const expandedCategories = new Set(
    Array.isArray(expanded) 
      ? expanded 
      : expanded 
        ? [expanded] 
        : []
  );

  return (
    <div className="md:px-8 lg:px-8 py-8">
      <Toolbar></Toolbar>
      <div className="flex flex-col md:flex-row gap-8">
        <ClientCategoryMenu
          initialExpanded={expandedCategories}
        />
        <ProductList
          products={products} 
          pagination={pagination}
          currentPage={page}
          pageSize={pageSize}
          subCategoryId={subCategoryId}
        />
      </div>
    </div>
  );
}