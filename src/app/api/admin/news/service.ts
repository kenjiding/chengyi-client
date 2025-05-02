import { getDb } from '@/db';
import { news, NewInsert } from '@/db/schema';
import { eq, sql, like, desc, and } from 'drizzle-orm';
import { IPaginatedResponse, NewsItem } from '@/types';

interface NewsQueryParams {
  title?: string;
  type?: 'news' | 'event';
  page?: number;
  pageSize?: number;
}

export async function getNews(params: NewsQueryParams): Promise<IPaginatedResponse<any>> {
  const {
    title,
    type,
    page = 1,
    pageSize = 10
  } = params;

  // 构建查询条件
  const conditions = [];
  if (title) conditions.push(like(news.title, `%${title}%`));
  if (type) conditions.push(eq(news.type, type));
  const db = await getDb();
  // 先获取总数
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(news)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .execute();

  // 获取分页数据
  const result = await db
    .select()
    .from(news)
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

export async function createNews(newNewsData: NewInsert) {
  const db = await getDb();
  const [insertedNews] = await db
    .insert(news)
    .values(newNewsData)
    .returning()
    .execute();

  return insertedNews;
}

export async function getNewsById(id: number) {
  const db = await getDb();
  const [newsItem] = await db
    .select()
    .from(news)
    .where(eq(news.id, id))
    .execute();
  
  return newsItem;
}