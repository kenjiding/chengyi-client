import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { banners } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createResponse } from '@/lib/response';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const id = parseInt(params.id);
    const result = await db
      .select()
      .from(banners)
      .where(eq(banners.id, id))
      .execute();
    if (result.length === 0) {
      return createResponse(null, 404, 'Banner not found');
    }
    return createResponse(result[0]);
  } catch (error) {
    return createResponse(null, 500, 'Error fetching banner');
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const id = parseInt(params.id);
    const body = await request.json();
    await db
      .update(banners)
      .set(body)
      .where(eq(banners.id, id))
      .execute();
    return createResponse({ message: 'Banner updated successfully' });
  } catch (error) {
    return createResponse(null, 500, 'Error updating banner');
  }
}


export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    
    // 添加参数验证
    if (!params?.id || !/^\d+$/.test(params.id)) {
      return createResponse(null, 400, '无效的Banner ID');
    }

    const id = parseInt(params.id, 10);

    // 使用RETURNING验证删除结果
    const [deletedBanner] = await db
      .delete(banners)
      .where(eq(banners.id, id))
      .returning(); // 添加PostgreSQL的返回验证

    if (!deletedBanner) {
      return createResponse(null, 404, '未找到指定Banner');
    }

    return createResponse(
      { deletedId: deletedBanner.id },
      200,
      'Banner删除成功'
    );
  } catch (error) {
    console.error('删除Banner失败:', error);
    return createResponse(
      null,
      500,
      error instanceof Error ? error.message : '删除Banner失败'
    );
  }
}