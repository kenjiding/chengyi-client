'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard/ClientProductCard';
import { IProduct } from '@/types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { productStore } from '@/store/productStore';

interface ProductListProps {
  products: IProduct[];
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  currentPage: number;
  pageSize: number;
  subCategoryId?: string;
}

export default function ProductList({
  products,
  pagination,
  currentPage,
  pageSize,
  subCategoryId
}: ProductListProps) {
  const router = useRouter();
  const query = useSearchParams();
  const [loadedProducts, setLoadedProducts] = useState(products);
  const { loading, changeProductsLoading } = productStore();

  useEffect(() => {
    // 更新产品数据并结束加载状态
    setLoadedProducts(products);
    changeProductsLoading(false);
  }, [products]);

  const handlePageChange = (newPage: number, e?: any) => {
    if(e) e.preventDefault();
    changeProductsLoading(true);
    const searchParams = new URLSearchParams(query);
    searchParams.set('page', newPage.toString());
    searchParams.set('pageSize', pageSize.toString());
    if (subCategoryId) searchParams.set('subCategoryId', subCategoryId);
    router.push(`/products?${searchParams.toString()}`);
  };

  const formatPageHref = (page: number) => {
    const searchParams = new URLSearchParams(query);
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    if (subCategoryId) searchParams.set('subCategoryId', subCategoryId);
    return `/products?${searchParams.toString()}`;
  }

  // 添加路由变化监听
  useEffect(() => {
    const handleRouteChangeStart = () => {
      changeProductsLoading(true);
    };

    const handleRouteChangeComplete = () => {
      // 路由变化结束后的处理会由products变化的useEffect处理
    };

    // 添加Next.js路由事件监听器
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
    };
  }, []);

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 4;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisible, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, pagination.totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink href={formatPageHref(1)} onClick={(e) => handlePageChange(1, e)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={formatPageHref(i)}
            onClick={(e) => handlePageChange(i, e)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < pagination.totalPages) {
      if (endPage < pagination.totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="last">
          <PaginationLink href={formatPageHref(pagination.totalPages)} onClick={(e) => handlePageChange(pagination.totalPages, e)}>
            {pagination.totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 mb-8">
        {loading ? (
          // 显示骨架屏
          Array(8).fill(0).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          // 显示产品列表
          loadedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showPrice={!!product.special} />
          ))
        )}
      </div>
      <Pagination className="w-full mt-8 flex">
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages || loading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}