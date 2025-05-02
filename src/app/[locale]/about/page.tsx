import React from 'react';
import { LightbulbIcon, TrendingUpIcon, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import CoreBeliefs from '@/components/CoreBeliefs';
import Image from 'next/image';

interface CulturePageProps {
  locale: string;
}

const CulturePage: React.FC<CulturePageProps> = ({ locale }) => {
  const t = useTranslations('culture');
  const cultureValues = [
    {
      id: 1,
      title: t('inheritance.title'),
      subtitle: t('inheritance.subtitle'),
      description: t('inheritance.description'),
      extended_content: [
        t('inheritance.points.0'),
        t('inheritance.points.1'),
        t('inheritance.points.2'),
        t('inheritance.points.3')
      ],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: <ChevronRight className="w-6 h-6" />
    },
    {
      id: 2,
      title: t('cooperation.title'),
      subtitle: t('cooperation.subtitle'),
      description: t('cooperation.description'),
      extended_content: [
        t('cooperation.points.0'),
        t('cooperation.points.1'),
        t('cooperation.points.2'),
        t('cooperation.points.3')
      ],
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: <TrendingUpIcon className="w-6 h-6" />
    },
    {
      id: 3,
      title: t('innovation.title'),
      subtitle: t('innovation.subtitle'),
      description: t('innovation.description'),
      extended_content: [
        t('innovation.points.0'),
        t('innovation.points.1'),
        t('innovation.points.2'),
        t('innovation.points.3')
      ],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      icon: <LightbulbIcon className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Core Beliefs Section */}
      <CoreBeliefs locale={locale} />

      {/* Culture Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {cultureValues.map((value, index) => (
            <div key={value.id} 
                className={`relative group mb-24 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex flex-col md:flex-row items-center gap-12`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative">
                <div className="relative overflow-hidden rounded-2xl shadow-xl
                              group-hover:shadow-2xl transition-shadow duration-500">
                  <Image 
                    src={value.image}
                    alt={value.title}
                    width={800}
                    height={400}
                    className="w-full h-[400px] object-cover transform 
                              group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r 
                                from-blue-900/20 to-blue-800/20 group-hover:opacity-0 
                                transition-opacity duration-500" />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center
                                text-blue-600 group-hover:bg-blue-600 group-hover:text-white
                                transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">{value.title}</h2>
                </div>
                <p className="text-blue-600 text-lg mb-4">{value.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{value.description}</p>
                <div className="space-y-2">
                  {value.extended_content.map((point, idx) => (
                    <p key={idx} className="text-gray-600">• {point}</p>
                  ))}
                </div>
                <button className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-700
                  group/btn transition-colors">
                  {t('learnMore')}
                  <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 opacity-10">
                <div className="absolute top-1/2 -right-20 w-40 h-40 
                              bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 -left-20 w-40 h-40 
                              bg-purple-500/30 rounded-full blur-3xl" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{t('cta.title')}</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg
          hover:bg-blue-700 transition-colors duration-300
            shadow-lg hover:shadow-xl">
            {t('cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
};

export default CulturePage;