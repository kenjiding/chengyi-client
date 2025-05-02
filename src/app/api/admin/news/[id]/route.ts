// app/api/news/[id]/route.ts
import { getDb } from '@/db';
import { news } from '@/db/schema';
import { createResponse } from '@/lib/response';
import { eq } from 'drizzle-orm';
import { getNewsById } from '../service';

export async function GET(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const newsItem = await getNewsById(Number(params.id));
    
    if (!newsItem) {
      return createResponse(null, 404, '新闻不存在');
    }

    return createResponse(newsItem);
  } catch (error) {
    console.error('获取新闻详情错误:', error);
    return createResponse(null, 500, '获取新闻详情失败');
  }
}

// PUT: 更新新闻
export async function PUT(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDb();
    // 从请求中获取 body
    const body = await request.json();

    await db
      .update(news)
      .set({
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl,
        type: body.type,
        top: body.top,
      })
      .where(eq(news.id, Number(params.id)))
      .execute();

    // 查询更新后的数据
    const [updatedNews] = await db
      .select()
      .from(news)
      .where(eq(news.id, Number(params.id)))
      .execute();

    return createResponse(updatedNews);
  } catch (error) {
    console.error('更新新闻错误:', error);
    return createResponse(null, 500, '更新新闻失败');
  }
}

export async function DELETE(
  request: Request, 
  context: { params: { id: string } }
) {
  try {
    const db = await getDb();
    const { params } = context;
    const newsId = Number(params.id);

    // 先查询要删除的数据
    const [deletedNewsItem] = await db
      .select()
      .from(news)
      .where(eq(news.id, newsId))
      .execute();

    // 执行删除
    await db
      .delete(news)
      .where(eq(news.id, newsId))
      .execute();

    return createResponse(deletedNewsItem, 200, '新闻删除成功');
  } catch (error) {
    console.error('删除新闻错误:', error);
    return createResponse(null, 500, '删除新闻失败');
  }
}