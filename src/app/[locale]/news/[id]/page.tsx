// app/[locale]/news/[id]/page.tsx
import Request from '@/lib/request';
import { NewsItem } from '@/types';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { getNewsById } from '@/app/api/admin/news/service';
import { notFound } from 'next/navigation';

export default async function NewsDetailPage({ 
  params 
}: { 
  params: { 
    locale: string, 
    id: string 
  } 
}) {
  const paramsData = await params;
  if (!/^\d+$/.test(paramsData.id)) {
    notFound()
  }
  const newsDetail = await getNewsById(Number(paramsData.id));
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 头部背景 */}
      <div className="relative h-[50vh] overflow-hidden">
        { newsDetail.imageUrl && <Image
          src={newsDetail.imageUrl || ''}
          alt={newsDetail.title}
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {newsDetail.title}
            </h1>
            <div className="flex justify-center space-x-4 text-gray-200">
              <span>{formatDate(String(newsDetail.publishDate))}</span>
              <span className="border-l border-gray-300 pl-4">
                {newsDetail.type === 'news' ? '新闻' : '活动'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 内容区域 */}
      <div className="max-w-4xl mx-auto px-4 py-16 relative">
        {/* 内容卡片 */}
        <div
          className="bg-white rounded-xl shadow-2xl p-8 md:p-12 relative z-10"
        >
          {/* 可选视频内容 */}
          {newsDetail.videoUrl && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <video 
                src={newsDetail.videoUrl}
                controls
                className="w-full"
                playsInline
              />
            </div>
          )}
          {/* 文字内容 */}
          <article className="prose lg:prose-xl max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {newsDetail.description}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}