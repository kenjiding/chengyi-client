import { getDb } from '@/db';
import { banners } from '@/db/schema';
import { Slide } from '@/types';

export async function getBanners(): Promise<any[]> {
  const db = await getDb();
  return await db
    .select()
    .from(banners)
    .execute();
}