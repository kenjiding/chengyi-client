"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Request from "@/lib/request";

export default function News() {
  const [news, setNews] = useState<any[]>([]);
  const newsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    const data = await Request.get<any>("/admin/news");
    // 复制两份数据以实现无缝滚动
    setNews(data?.items || []);
  };

  // 获取最新新闻（按日期排序，最新在前）
  const latestNews = news[0] || {};

  // 动态计算滚动时间（基于新闻数量和项高度）
  useEffect(() => {
    if (newsListRef.current) {
      const itemHeight = newsListRef.current.querySelector("li")?.clientHeight || 100;
      const totalItems = news.length;
      const listHeight = itemHeight * totalItems;
      const viewportHeight = 384; // 24rem ≈ 384px
      const duration = (listHeight / viewportHeight) * 20;
      newsListRef.current.style.animationDuration = `${duration}s`;
    }
  }, [news]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-center mb-8 text-3xl font-bold">News</h1>
        {/* 新闻区域（左边最新新闻 + 右边自动从下到上滚动列表，左右高度一致） */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* 左侧：最新新闻（固定一条） */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between p-6">
            {latestNews && (
              <div>
                {/* 条件渲染 Image 组件 */}
                {latestNews.imageUrl ? (
                  <Image
                    src={latestNews.imageUrl}
                    alt={latestNews.title || "News image"}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {latestNews.title || "No title available"}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {latestNews.description || "No description available"}
                </p>
                <p className="text-gray-500 text-sm">
                  {/* {new Date(latestNews.date).toLocaleDateString()} */}
                </p>
              </div>
            )}
            <Link
              href={`/news/${latestNews.id || ""}`}
              className="mt-4 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Read More →
            </Link>
          </div>

          {/* 右侧：新闻列表（自动从下到上滚动，无限循环） */}
          <div className="relative h-[24rem] overflow-hidden bg-white rounded-lg shadow-lg p-4">
            <ul
              ref={newsListRef}
              className="news-list absolute top-0 left-0 w-full animate-scroll"
            >
              {news.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer mb-4 last:mb-0 p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title || "No title available"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.description || "No description available"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {/* {new Date(item.date).toLocaleDateString()} */}
                  </p>
                  <Link
                    href={`/news/${item.id || ""}`}
                    className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
                  >
                    Read More →
                  </Link>
                </motion.li>
              ))}
              {/* 复制一份以实现无缝滚动 */}
              {news.map((item, index) => (
                <motion.li
                  key={`${item.id}-duplicate`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (news.length + index) * 0.1 }}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer mb-4 last:mb-0 p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title || "No title available"}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.description || "No description available"}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {/* {new Date(item.date).toLocaleDateString()} */}
                  </p>
                  <Link
                    href={`/news/${item.id || ""}`}
                    className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block"
                  >
                    Read More →
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}