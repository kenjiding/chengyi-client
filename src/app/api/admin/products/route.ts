// src/app/api/products/route.ts
import { NextRequest } from 'next/server';
import { getDb } from '@/db';
import { products, brands, subCategories, NewProduct } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createResponse } from '@/lib/response';
import { ProductQueryParams, getProducts } from './service';

// 产品类型定义
interface ProductData {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: ProductQueryParams = {
      id: searchParams.get('id') || undefined,
      name: searchParams.get('name') || undefined,
      modelNumber: searchParams.get('modelNumber') || undefined,
      brandId: searchParams.get('brandId') || undefined,
      subCategoryId: searchParams.get('subCategoryId') || undefined,
      special: searchParams.get('special') || undefined,
      mainCategoryId: searchParams.get('mainCategoryId') || undefined,
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '10', 10)
    };

    const result = await getProducts(params);
    return createResponse(result);
  } catch (error) {
    console.error('获取产品失败:', error);
    return createResponse(null, 500, '获取产品失败');
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const data: NewProduct = await request.json();

    const tempData = {
      ...data,
      brandId: Number((data.brandId as any).split('-')[1]),
      subCategoryId: data.subCategoryId ? Number((data.subCategoryId as any).split('-')[1]) : undefined,
      mainCategoryId: data.mainCategoryId ? Number((data.mainCategoryId as any).split('-')[1]) : undefined,
    };

    // 验证品牌是否存在
    const brand = await db
      .select()
      .from(brands)
      .where(eq(brands.id, tempData.brandId))
      .limit(1)
      .execute()
      .then(res => res[0]);

    if (!brand) {
      return createResponse(null, 400, '无效的品牌ID');
    }

    // 如果提供了子类别ID，验证子类别
    if (tempData.subCategoryId) {
      const subCategory = await db
        .select()
        .from(subCategories)
        .where(eq(subCategories.id, tempData.subCategoryId))
        .limit(1)
        .execute()
        .then(res => res[0]);

      if (!subCategory) {
        return createResponse(null, 400, '无效的子类别ID');
      }
    }

    // 插入产品
    const result = await db
      .insert(products)
      .values(tempData)
      .returning()
      .execute();

    const newProduct = result[0];

    return createResponse(newProduct);
  } catch (error) {
    console.error('创建产品失败:', error);
    return createResponse(null, 500, '创建产品失败');
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 400, '未提供产品ID');
    }

    const data: Partial<ProductData> = await request.json();

    const tempData = {
      ...data,
      brandId: data.brandId ? Number((data.brandId as any).split('-')[1]) : undefined,
      subCategoryId: data.subCategoryId ? Number((data.subCategoryId as any).split('-')[1]) : undefined,
      mainCategoryId: data.mainCategoryId ? Number((data.mainCategoryId as any).split('-')[1]) : undefined,
    };
    const db = await getDb();
    // 验证品牌是否存在
    const brand = tempData.brandId ? await db.query.brands.findFirst({
      where: eq(brands.id, tempData.brandId as number)
    }) : null;

    if (tempData.brandId && !brand) {
      return createResponse(null, 400, '无效的品牌ID');
    }

    // 如果提供了子类别ID，验证子类别
    if (tempData.subCategoryId) {
      const subCategory = await db.query.subCategories.findFirst({
        where: eq(subCategories.id, tempData.subCategoryId)
      });

      if (!subCategory) {
        return createResponse(null, 400, '无效的子类别ID');
      }
    }

    await db.update(products)
    .set({
      name: tempData.name,
      modelNumber: tempData.modelNumber,
      brandId: tempData.brandId,
      subCategoryId: tempData.subCategoryId,
      mainCategoryId: tempData.mainCategoryId,
      description: tempData.description,
      features: tempData.features,
      special: tempData.special,
      price: tempData.price !== undefined ? String(tempData.price) : undefined,
      images: tempData.images ? tempData.images : undefined
    })
    .where(eq(products.id, Number(id)))
    .execute();

    // 获取更新后的产品
    const updatedProduct = await db.query.products.findFirst({
      where: eq(products.id, Number(id)),
      with: {
        brand: true,
        subCategory: data.subCategoryId ? {
          with: {
            mainCategory: true
          }
        } : undefined
      }
    });

    return createResponse(updatedProduct);
  } catch (error) {
    console.error('更新产品失败:', error);
    return createResponse(null, 500, '更新产品失败');
  }
}

// DELETE: 删除产品
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null);
    }
    const db = await getDb();
    await db
      .delete(products)
      .where(eq(products.id, Number(id)))
      .execute();

    return createResponse(null, 200, '产品删除成功');
  } catch (error) {
    console.error('删除产品失败:', error);
    return createResponse(null, 500, '产品删除失败');
  }
}