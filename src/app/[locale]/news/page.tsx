// app/news/page.tsx
import Request from '@/lib/request';
import { NewsItem } from '@/types';
import NewsFilter from './NewsFilter';
import { getNews } from '@/app/api/admin/news/service';

const getNewss = async () => {
  const res = await getNews({});
  return res.items;
}

export default async function NewsPage() {
  const newsData = await getNewss();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          News
        </h1>

        <NewsFilter initialNews={newsData} />
      </div>
    </div>
  );
}