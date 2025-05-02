import { getDb } from '@/db';
import { news, NewInsert } from '@/db/schema';
import { createResponse } from '@/lib/response';
import { eq, sql } from 'drizzle-orm';
import { getNews } from './service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 构建查询参数
    const params = {
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '10'),
      title: searchParams.get('title') || undefined,
      type: searchParams.get('type') as 'news' | 'event' | undefined
    };

    const result = await getNews(params);
    return createResponse(result);
  } catch (error) {
    console.error('获取新闻列表错误:', error);
    return createResponse(null, 500, '获取新闻列表失败');
  }
}

// POST: 创建新的新闻
export async function POST(request: Request) {
  try {
    const db = await getDb();
    const body = await request.json();
    
    // 类型安全的插入
    const newNewsData: NewInsert = {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      type: body.type || 'news',
      top: body.top,
    };

    const result = await db
      .insert(news)
      .values(newNewsData)
      .returning();

    const insertedNews = result[0];

    return createResponse(insertedNews);
  } catch (error) {
    console.error('创建新闻错误:', error);
    return createResponse(null, 500, '创建新闻失败');
  }
}