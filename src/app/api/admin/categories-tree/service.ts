import { getDb } from '@/db';
import { brands } from '@/db/schema';

interface CategoryTreeItem {
  value: string;
  label: string;
  children?: CategoryTreeItem[];
}

export async function getCategoryTree(): Promise<CategoryTreeItem[]> {
  const db = await getDb();
  // 获取所有品牌及其主类别和子类别
  const allBrands = await db.query.brands.findMany({
    with: {
      mainCategories: {
        with: {
          subCategories: true
        }
      }
    }
  });

  // 转换为前端需要的树形结构
  return allBrands.map(brand => ({
    value: 'A-' + brand.id,
    label: brand.name,
    children: brand.mainCategories.map(mainCategory => ({
      value: 'B-' + mainCategory.id,
      label: mainCategory.name,
      children: mainCategory.subCategories.map(subCategory => ({
        value: 'C-' + subCategory.id,
        label: subCategory.name
      }))
    }))
  }));
}