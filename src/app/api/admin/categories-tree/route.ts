import { createResponse } from '@/lib/response';
import { getCategoryTree } from './service';

export async function GET() {
  try {
    const categoryTree = await getCategoryTree();
    return createResponse(categoryTree);
  } catch (error) {
    console.error('获取分类树失败:', error);
    return createResponse(null, 500, '获取分类树失败');
  }
}