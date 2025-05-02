import { getDb } from '@/db';
import { products } from '@/db/schema';
import { IPaginatedResponse } from '@/types';
import { eq, like, and, sql } from 'drizzle-orm';

export interface ProductData {
  name: string;
  modelNumber?: string;
  brandId: number;
  special: boolean,
  subCategoryId: number;
  mainCategoryId: number,
  description?: string;
  features?: string;
  price?: number;
  images?: string[];
}

export interface ProductQueryParams {
  id?: string;
  name?: string;
  modelNumber?: string;
  brandId?: string;
  subCategoryId?: string;
  mainCategoryId?: string;
  page?: number;
  pageSize?: number;
  special?: string;
}

export async function getProducts(params: ProductQueryParams): Promise<IPaginatedResponse<any>> {
  const {
    id,
    name,
    modelNumber,
    brandId,
    subCategoryId,
    mainCategoryId,
    special,
    page = 1,
    pageSize = 10
  } = params;

  const conditions = [];
  if (id) conditions.push(eq(products.id, Number(id)));
  if (name) conditions.push(like(products.name, `%${name}%`));
  if (modelNumber) conditions.push(eq(products.modelNumber, modelNumber));
  if (special) conditions.push(eq(products.special, special === '1'));
  if (brandId) conditions.push(eq(products.brandId, Number(brandId.split('-')[1])));
  if (subCategoryId) conditions.push(eq(products.subCategoryId, Number(subCategoryId.split('-')[1])));
  if (mainCategoryId) conditions.push(eq(products.mainCategoryId, Number(mainCategoryId.split('-')[1])));
  const db = await getDb();
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .execute();

  const result = await db
    .select()
    .from(products)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .execute();

  return {
    items: result,
    pagination: {
      page,
      pageSize,
      totalCount: Number(count),
      totalPages: Math.ceil(Number(count) / pageSize)
    }
  };
}