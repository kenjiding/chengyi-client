// app/news/NewsFilter.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsItem } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function NewsFilter({ initialNews }: { initialNews: NewsItem[] }) {
  const [filter, setFilter] = useState<'all' | 'news' | 'event'>('all');
  // 过滤新闻并按置顶属性排序
  const filteredNews = initialNews
    .filter(item => filter === 'all' || item.type === filter)
    .sort((a, b) => {
      // 先按置顶属性排序，置顶的放在前面
      if (a.top && !b.top) return -1;
      if (!a.top && b.top) return 1;
      
      // 如果置顶属性相同，按发布时间降序排序（最新的在前）
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  return (
    <>
      {/* 筛选器 */}
      <div className="flex justify-center mb-8 space-x-4">
        {['all', 'news', 'event'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as 'all' | 'news' | 'event')}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${filter === type 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }
            `}
          >
            {type === 'all' ? '全部' : type === 'news' ? '新闻' : '活动'}
          </button>
        ))}
      </div>

      {/* 新闻列表 */}
      <AnimatePresence>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="relative h-56 overflow-hidden">
                {item.videoUrl ? (
                  <video 
                    src={item.videoUrl} 
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    muted
                    loop
                  />
                ) : (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                )}
                <div className="absolute top-4 right-4 flex">
                  { 
                    item.top && <div className="bg-orange-600 mr-3 text-white px-3 py-1 rounded-full text-sm">
                      置顶
                    </div> 
                  }
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {item.type === 'news' ? '新闻' : '活动'}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {formatDate(item.publishDate)}
                  </span>
                  <button className="text-blue-600 hover:underline">
                    <Link href={`/news/${item.id}`}>了解更多</Link>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* 无数据提示 */}
      {filteredNews.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          暂无相关新闻和动态
        </div>
      )}
    </>
  );
}