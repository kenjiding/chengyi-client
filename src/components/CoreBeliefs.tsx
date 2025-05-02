import React from 'react';
import { Target, Eye, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CoreBeliefsProps {
  locale: string;
}

const CoreBeliefs: React.FC<CoreBeliefsProps> = ({ locale }) => {
  const t = useTranslations('culture');

  const beliefs = [
    {
      icon: <Target className="w-8 h-8" />,
      title: t('mission.title'),
      content: t('mission.content'),
      bgColor: "from-blue-50 to-blue-100/50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200/50"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: t('vision.title'),
      content: t('vision.content'),
      bgColor: "from-indigo-50 to-indigo-100/50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      hoverGradient: "hover:from-indigo-100 hover:to-indigo-200/50"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('values.title'),
      content: t('values.content'),
      bgColor: "from-purple-50 to-purple-100/50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverGradient: "hover:from-purple-100 hover:to-purple-200/50"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 
                          bg-gradient-to-r from-blue-600 to-indigo-600 
                          text-transparent bg-clip-text">
              {t('title')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('subtitle')}
            </p>
          </div>

          {/* Beliefs Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {beliefs.map((belief, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl backdrop-blur-sm
                          bg-gradient-to-br ${belief.bgColor} ${belief.hoverGradient}
                          transition-all duration-500 hover:shadow-lg
                          border border-white/50 hover:border-white
                          transform hover:-translate-y-1`}
              >
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl ${belief.iconBg} ${belief.iconColor}
                              flex items-center justify-center mb-6
                              transform group-hover:scale-110 group-hover:rotate-3
                              transition-all duration-300`}>
                  {belief.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 text-gray-800
                            group-hover:text-black transition-colors">
                  {belief.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700">
                  {belief.content}
                </p>

                {/* Decorative Elements */}
                <div className="absolute -right-2 -bottom-2 w-24 h-24 
                              bg-gradient-to-br from-white/0 to-white/20
                              rounded-full opacity-0 group-hover:opacity-100
                              transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreBeliefs;