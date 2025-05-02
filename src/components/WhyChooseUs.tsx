'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function WhyChooseUs() {
  const t = useTranslations('whyChooseUs');

  const features = [
    {
      icon: "🚚",
      title: t('shipping.title'),
      description: t('shipping.description')
    },
    {
      icon: "✨",
      title: t('quality.title'),
      description: t('quality.description')
    },
    {
      icon: "💬",
      title: t('support.title'),
      description: t('support.description')
    },
    {
      icon: "🔒",
      title: t('security.title'),
      description: t('security.description')
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}