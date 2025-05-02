import { getDb } from '@/db';
import { eq, like } from 'drizzle-orm';
import { brands } from '@/db/schema';
import { Category } from '@/types';

export async function getBrands(params: { id?: string; name?: string }): Promise<any[]> {
  const db = await getDb();
  const { id, name } = params;
  
  const conditions = [];
  if (id) conditions.push(eq(brands.id, Number(id)));
  if (name) conditions.push(like(brands.name, `%${name}%`));

  return await db
    .select()
    .from(brands)
    .where(conditions.length > 0 ? (conditions.length === 1 ? conditions[0] : undefined) : undefined)
    .execute();
}