// src/app/api/admin/sub-categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { subCategories, mainCategories, products } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import { createResponse } from '@/lib/response';

// GET: 查询子类别
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const mainCategoryId = searchParams.get('mainCategoryId');

    const conditions = [];
    if (id) conditions.push(eq(subCategories.id, Number(id)));
    if (name) conditions.push(like(subCategories.name, `%${name}%`));
    if (mainCategoryId) conditions.push(eq(subCategories.mainCategoryId, Number(mainCategoryId)));
    const db = await getDb();
    const result = await db.query.subCategories.findMany({
      where: conditions.length > 0 ? (conditions.length === 1 ? conditions[0] : undefined) : undefined,
      with: {
        mainCategory: {
          with: {
            brand: true
          }
        },
        products: true
      }
    });

    return createResponse(result);
  } catch (error) {
    console.error('获取子类别失败:', error);
    return createResponse(null, 500, '获取子类别失败');
  }
}

// POST: 创建子类别
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const db = await getDb();

    // 验证主类别是否存在
    const existingMainCategory = await db.query.mainCategories.findFirst({
      where: eq(mainCategories.id, data.mainCategoryId)
    });

    if (!existingMainCategory) {
      return createResponse(null, 400, '无效的主类别ID');
    }

    // 检查子类别是否已存在
    const existingSubCategory = await db.query.subCategories.findFirst({
      where: eq(subCategories.name, data.name)
    });

    if (existingSubCategory) {
      return createResponse(null, 400, '子类别名称已存在');
    }

    // 使用RETURNING直接获取插入结果
    const [newSubCategory] = await db.insert(subCategories)
      .values({
        name: data.name,
        mainCategoryId: data.mainCategoryId
      })
      .returning(); // 添加RETURNING子句

    // 如果需要关联数据，可以直接查询（或优化为一次查询）
    const fullData = await db.query.subCategories.findFirst({
      where: eq(subCategories.id, newSubCategory.id),
      with: {
        mainCategory: {
          with: {
            brand: true
          }
        }
      }
    });

    return createResponse(fullData);
  } catch (error) {
    console.error('创建子类别失败:', error);
    return createResponse(null, 500, '创建子类别失败');
  }
}
// PUT: 更新子类别
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 500, '未提供子类别ID');
    }

    const data = await request.json();
    const db = await getDb();
    // 验证主类别是否存在
    if (data.mainCategoryId) {
      const existingMainCategory = await db.query.mainCategories.findFirst({
        where: eq(mainCategories.id, data.mainCategoryId)
      });

      if (!existingMainCategory) {
        return createResponse(null, 500, '无效的主类别ID');
      }
    }

    // 检查子类别名称是否重复
    const existingSubCategory = await db.query.subCategories.findFirst({
      where: eq(subCategories.name, data.name)
    });

    if (existingSubCategory && existingSubCategory.id !== Number(id)) {
      return createResponse(null, 500, '子类别名称已存在');
    }

    await db.update(subCategories)
      .set({
        name: data.name,
        mainCategoryId: data.mainCategoryId
      })
      .where(eq(subCategories.id, Number(id)))
      .execute();

    const updatedSubCategory = await db.query.subCategories.findFirst({
      where: eq(subCategories.id, Number(id)),
      with: {
        mainCategory: {
          with: {
            brand: true
          }
        }
      }
    });

    return createResponse(updatedSubCategory);
  } catch (error) {
    console.error('更新子类别失败:', error);
    return createResponse(null, 500, '更新子类别失败');
  }
}

// DELETE: 删除子类别
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return createResponse(null, 500, '未提供子类别ID');
    }
    const db = await getDb();
    // 检查是否有关联的产品
    const existingProducts = await db.select()
      .from(products)
      .where(eq(products.subCategoryId, Number(id)));

    if (existingProducts.length > 0) {
      return createResponse(null, 400, '无法删除子类别');
    }

    // 执行删除
    const result = await db.delete(subCategories)
      .where(eq(subCategories.id, Number(id)))
      .execute();

    // 检查是否成功删除
    return createResponse(null, 200, '删除成功');
  } catch (error) {
    console.error('删除子类别失败:', error);
    return createResponse(null, 500, '删除失败');
  }
}