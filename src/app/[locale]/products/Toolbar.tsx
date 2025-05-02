
'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { productStore } from '@/store/productStore';

const Toolbar: React.FC = () => {
  const searchParams = useSearchParams()
  const router = useRouter();
  const pathname = usePathname();
  const [special, setSpecial] = useState(false);
  const t = useTranslations('common')
  const { changeProductsLoading } = productStore();

  useEffect(() => {
    const s = searchParams.get('special') || '0';
    setSpecial(s === '1');
  }, [searchParams]);

  const specialHander = () => {
    changeProductsLoading(true);
    const params = new URLSearchParams(searchParams)
    const special = params.get('special') || '0';
    params.set('search', '')
    params.set('special', special === '0' ? '1' : '0');
    router.push(`?${params.toString()}`)
}

  const clearHandler = () => {
    changeProductsLoading(true);
    router.push(pathname);
    setSpecial(false);
  }

  return (
    <div className='flex justify-between px-5 sm:px-10'>
      <h1 className="text-3xl font-bold mb-8">{t('products')}</h1>
      <div>
        <Button onClick={specialHander} className={`${special ? 'bg-orange-600' : ''}`}>{t('specials')}</Button>
        <Button onClick={clearHandler} className='bg-red-500 ml-3'>All</Button>
      </div>
    </div>
  );
};

export default Toolbar;