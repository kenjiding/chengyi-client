import { getDb } from '@/db';
import { collaboration } from '@/db/schema';
import { createResponse } from '@/lib/response';
import { getCollaborations } from './service';

export async function GET() {
  try {
    const allCollaborations = await getCollaborations();
    return createResponse(allCollaborations);
  } catch (error) {
    console.error('Failed to fetch collaborations:', error);
    return createResponse(null, 500, 'Failed to fetch collaborations');
  }
}

// POST: 创建新的 collaboration
export async function POST(request: Request) {
  try {
    const db = await getDb();
    const body = await request.json();
    const result = await db
      .insert(collaboration)
      .values(body)
      .returning()
      .execute();
    return createResponse(result[0]);
  } catch (error) {
    return createResponse(null, 500, 'Failed to create collaboration');
  }
}