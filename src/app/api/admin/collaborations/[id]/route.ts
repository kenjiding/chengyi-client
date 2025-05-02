import { getDb } from '@/db';
import { collaboration } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createResponse } from '@/lib/response';

// GET: 获取特定 collaboration
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const id = parseInt(params.id);
    const result = await db.select().from(collaboration).where(eq(collaboration.id, id));
    if (result.length === 0) {
      return createResponse(null, 404, 'Collaboration not found');
    }
    return createResponse(result[0]);
  } catch (error) {
    return createResponse(null, 500, 'Failed to fetch collaboration');
  }
}

// PUT: 更新特定 collaboration
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    
    // 增强ID验证
    if (!params.id || !/^\d+$/.test(params.id)) {
      return createResponse(null, 400, '无效的协作ID');
    }

    const id = parseInt(params.id, 10); // 显式指定十进制
    
    const body = await request.json();
    
    // 添加空值检查
    if (!body || Object.keys(body).length === 0) {
      return createResponse(null, 400, '请求体不能为空');
    }

    // 执行更新并返回结果
    const [updated] = await db
      .update(collaboration)
      .set(body)
      .where(eq(collaboration.id, id))
      .returning(); // 添加RETURNING子句

    if (!updated) {
      return createResponse(null, 404, '未找到指定协作');
    }

    return createResponse(updated, 200, '协作更新成功');
  } catch (error) {
    console.error('更新协作失败:', error);
    return createResponse(null, 500, '更新协作失败');
  }
}

// DELETE: 删除特定 collaboration
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const db = await getDb();
    const id = parseInt(params.id);
    const result = await db.delete(collaboration).where(eq(collaboration.id, id));
    return createResponse(null, 200, 'Collaboration deleted successfully');
  } catch (error) {
    return createResponse(null, 500, 'Failed to delete collaboration');
  }
}