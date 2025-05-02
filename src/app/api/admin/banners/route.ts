import { getDb } from '@/db';
import { banners } from '@/db/schema';
import { createResponse } from '@/lib/response';
import { getBanners } from './service';

export async function GET() {
  try {
    const result = await getBanners();
    return createResponse(result);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return createResponse(null, 500, 'Error fetching banners');
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const body = await request.json();
    const newBanner = await db.insert(banners).values(body);
    return createResponse(newBanner);
  } catch (error) {
    return createResponse(null, 500, 'Error creating banner');
  }
}