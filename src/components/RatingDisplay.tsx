import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export default function RatingDisplay({ score }: { score: number }) {
  const t = useTranslations('common');
  const maxScore = 10;
  const starCount = 5;
  const filledStars = Math.floor((score / maxScore) * starCount);
  const hasHalfStar = score % 2 !== 0 && filledStars < starCount;

  return (
    <div className="flex items-center mb-4">
      {/* <span className="text-sm font-medium mr-2">{t('score')}</span> */}
      {[...Array(starCount)].map((_, index) => {
        if (index < filledStars) {
          return <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
        } else if (index === filledStars && hasHalfStar) {
          return (
            <div key={index} className="relative w-5 h-5">
              <Star className="w-5 h-5 text-gray-300" />
              <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          );
        }
        return <Star key={index} className="w-5 h-5 text-gray-300" />;
      })}
      <span className="ml-2 text-sm text-gray-600">
        {score}
      </span>
    </div>
  );
}