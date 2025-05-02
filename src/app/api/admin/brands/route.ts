// src/app/api/brands/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { eq, like } from 'drizzle-orm';
import { brands, mainCategories, products } from '@/db/schema';
import { createResponse } from '@/lib/response';
import { getBrands } from './service';

// GET: 查询品牌
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get('id') || undefined;
    const name = searchParams.get('name') || undefined;

    const result = await getBrands({ id, name });

    return createResponse(result);
  } catch (error) {
    console.error('获取品牌失败:', error);
    return createResponse(null, 500, '获取品牌失败');
  }
}

// POST: 创建品牌
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const data = await request.json();

    // 检查品牌是否已存在
    const existingBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.name, data.name))
      .limit(1)
      .execute();

    if (existingBrand.length > 0) {
      return createResponse(null, 500, '品牌名称已存在');
    }

    const result = await db
      .insert(brands)
      .values({
        name: data.name,
        image: data.image
      })
      .returning()
      .execute();

    const newBrand = result[0];

    return createResponse(newBrand);
  } catch (error) {
    console.error('创建品牌失败:', error);
    return createResponse(null, 500, '创建品牌失败');
  }
}

// PUT: 更新品牌
export async function PUT(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 500, '');
    }

    const data = await request.json();

    // 检查是否存在同名品牌
    const existingBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.name, data.name))
      .limit(1)
      .execute();

    if (existingBrand.length > 0 && existingBrand[0].id !== Number(id)) {
      return  createResponse(null, 500, '');
    }

    await db.update(brands)
      .set({
        name: data.name,
        image: data.image
      })
      .where(eq(brands.id, Number(id)))
      .execute();

    const updatedBrand = await db
      .select()
      .from(brands)
      .where(eq(brands.id, Number(id)))
      .execute()
      .then(res => res[0]);

    return createResponse(updatedBrand);
  } catch (error) {
    console.error('更新品牌失败:', error);
    return  createResponse(null, 500, '');
  }
}


// DELETE: 删除品牌
export async function DELETE(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 500, '缺id');
    }

    // 检查是否有关联的主类别或产品
    const [relatedMainCategories, relatedProducts] = await Promise.all([
      db.select()
        .from(mainCategories)
        .where(eq(mainCategories.brandId, Number(id)))
        .execute(),
      db.select()
        .from(products)
        .where(eq(products.brandId, Number(id)))
        .execute()
    ]);

    if (relatedMainCategories.length > 0 || relatedProducts.length > 0) {
      return  createResponse(null, 500, '该品牌有关联的产品或者类别');
    }

    await db
      .delete(brands)
      .where(eq(brands.id, Number(id)))
      .execute();

    return createResponse(null, 200, '品牌删除成功');
  } catch (error) {
    console.error('删除品牌失败:', error);
    return  createResponse(null, 500, '3');
  }
}