'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { SquarePlus, SquareMinus, ChevronUp, ChevronDown } from 'lucide-react';
import { pushGoogleAnalyticsEvent } from '@/lib/utils';
import { AnalyticeEvents } from '@/types/analytics';
import Request from '@/lib/request';
import { productStore } from '@/store/productStore';
interface Category {
  value: string;
  label: string;
  children?: Category[];
}

interface ClientCategoryMenuProps {
  initialSelected?: string[];
  initialExpanded?: Set<string>;
}

export default function ClientCategoryMenu({
  initialSelected = [],
  initialExpanded = new Set(),
}: ClientCategoryMenuProps) {
  const t = useTranslations('common');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPath, setSelectedPath] = useState<string[]>(initialSelected);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(initialExpanded);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const { changeProductsLoading } = productStore();

  // 获取类别数据
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const data = await Request.get<Category[]>('/admin/categories-tree');
        setCategories(data);
      } catch (err: Error | any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    pushGoogleAnalyticsEvent(AnalyticeEvents.SearchBrand, { brandId: categoryId });
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleCategoryClick = (path: string[]) => {
    changeProductsLoading(true);
    setSelectedPath(path);
    setExpandedCategories(new Set(path));
    const params = new URLSearchParams(searchParams);

    params.set('search', '');
    params.set('brandId', path[0] || '');
    params.set('mainCategoryId', path[1] || '');
    params.set('subCategoryId', path[2] || '');
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const toggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const renderCategory = (category: Category, parentPath: string[] = []) => {
    const currentPath = [...parentPath, category.value];
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.has(category.value);
    const isActive = currentPath.every((value, index) => selectedPath[index] === value);

    return (
      <div key={category.value} className="mb-1">
        <button
          onClick={() => {
            toggleCategory(category.value);
            handleCategoryClick(currentPath);
            toggleMenu();
          }}
          className={`flex items-center text-left w-full py-3 px-4 transition duration-150 ease-in-out
                      hover:bg-gray-100 rounded-md
                      ${isActive ? 'text-blue-600 font-medium bg-blue-50' : ''}`}
        >
          <span className="mr-3 flex-shrink-0">
            {hasChildren ? (
              isExpanded ? (
                <SquareMinus className="w-6 h-6" />
              ) : (
                <SquarePlus className="w-6 h-6" />
              )
            ) : null}
          </span>
          <span className="text-lg">{category.label}</span>
        </button>
        {hasChildren && isExpanded && (
          <div className="ml-6 mt-1 space-y-1">
            {category.children!.map((child) => renderCategory(child, currentPath))}
          </div>
        )}
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-8 w-full bg-gray-200 rounded-md animate-pulse"
          style={{ animationDelay: `${index * 150}ms` }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      className="w-full h-4/5 sm:w-3/12 bg-white shadow-md rounded-lg p-4 sm:p-6 md:top-[100px] top-[64px] sticky"
      style={{ zIndex: 10 }}
    >
      <div
        className={`flex justify-between items-center ${
          isMenuCollapsed ? 'mb-0' : 'mb-6'
        } sm:border-b sm:pb-2 transition-all duration-500 ease-in-out`}
      >
        <h2 className="text-2xl font-semibold">{t('categories')}</h2>
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={toggleMenu}
          aria-label={isMenuCollapsed ? 'Expand menu' : 'Collapse menu'}
        >
          {isMenuCollapsed ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <ChevronUp className="w-6 h-6" />
          )}
        </button>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden
          ${isMenuCollapsed ? 'max-h-0 opacity-0' : 'max-h-[1000px] opacity-100'}`}
      >
        {isLoading ? (
          renderSkeleton()
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-500">{t('noCategories')}</div>
        ) : (
          categories.map((category) => renderCategory(category))
        )}
      </div>
    </div>
  );
}