// src/app/api/admin/sub-categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { subCategories, mainCategories, products, brands } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import { createResponse } from '@/lib/response';

export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const brandId = searchParams.get('brandId');

    const conditions = [];
    if (id) conditions.push(eq(mainCategories.id, Number(id)));
    if (name) conditions.push(like(mainCategories.name, `%${name}%`));
    if (brandId) conditions.push(eq(mainCategories.brandId, Number(brandId)));

    const result = await db.query.mainCategories.findMany({
      where: conditions.length > 0 ? (conditions.length === 1 ? conditions[0] : undefined) : undefined,
      with: {
        brand: true,
        subCategories: true
      }
    });

    return createResponse(result);
  } catch (error) {
    console.error('获取主类别失败:', error);
    return createResponse(null, 500, '获取主类别失败');
  }
}

// POST: 创建主类别（修复版）
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const data = await request.json();

    // 验证品牌是否存在
    const existingBrand = await db.query.brands.findFirst({
      where: eq(brands.id, data.brandId)
    });

    if (!existingBrand) {
      return createResponse(null, 400, '无效的品牌ID');
    }

    // 检查主类别是否已存在
    const existingMainCategory = await db.query.mainCategories.findFirst({
      where: eq(mainCategories.name, data.name)
    });

    if (existingMainCategory) {
      return createResponse(null, 400, '主类别名称已存在');
    }

    // 使用RETURNING获取插入结果
    const [newMainCategory] = await db.insert(mainCategories)
      .values({
        name: data.name,
        brandId: data.brandId
      })
      .returning(); // 添加RETURNING子句

    // 直接使用返回的结果
    const fullData = await db.query.mainCategories.findFirst({
      where: eq(mainCategories.id, newMainCategory.id),
      with: {
        brand: true
      }
    });

    return createResponse(fullData);
  } catch (error) {
    console.error('创建主类别失败:', error);
    return createResponse(null, 400, '创建主类别失败');
  }
}

// PUT: 更新主类别
export async function PUT(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 400, '未提供主类别ID');
    }

    const data = await request.json();

    // 验证品牌是否存在
    if (data.brandId) {
      const existingBrand = await db.query.brands.findFirst({
        where: eq(brands.id, data.brandId)
      });

      if (!existingBrand) {
        return createResponse(null, 400, '无效的品牌ID');
      }
    }

    // 检查主类别名称是否重复
    const existingMainCategory = await db.query.mainCategories.findFirst({
      where: eq(mainCategories.name, data.name)
    });

    if (existingMainCategory && existingMainCategory.id !== Number(id)) {
      return createResponse(null, 400, '主类别名称已存在');
    }

    await db.update(mainCategories)
      .set({
        name: data.name,
        brandId: data.brandId
      })
      .where(eq(mainCategories.id, Number(id)))
      .execute();

    const updatedMainCategory = await db.query.mainCategories.findFirst({
      where: eq(mainCategories.id, Number(id)),
      with: {
        brand: true
      }
    });

    return createResponse(updatedMainCategory);
  } catch (error) {
    console.error('更新主类别失败:', error);
    return createResponse(null, 500, '更新主类别失败');
  }
}

// DELETE: 删除主类别
export async function DELETE(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 400, '未提供主类别ID');
    }

    // 检查是否有关联的子类别
    const existingSubCategories = await db.select()
      .from(subCategories)
      .where(eq(subCategories.mainCategoryId, Number(id)));

    if (existingSubCategories.length > 0) {
      return createResponse(null, 400, '存在关联的子类别');
    }

    // 执行删除
    const result = await db.delete(mainCategories)
      .where(eq(mainCategories.id, Number(id)))
      .execute();

    // 检查是否成功删除
    return createResponse(null, 200, '删除成功');
  } catch (error) {
    console.error('删除主类别失败:', error);
    return createResponse(null, 500, '');
  }
}