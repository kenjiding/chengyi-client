import { getDb } from '@/db';
import { collaboration } from '@/db/schema';

export async function getCollaborations() {
  const db = await getDb();
  return await db
    .select()
    .from(collaboration)
    .execute();
}