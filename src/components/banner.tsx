"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slide } from '@/types';

function SlideMedia({ slide, index, isSelected }: {
  slide: Slide;
  index: number;
  isSelected: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (slide.type === 'video' && videoRef.current) {
      const videoElement = videoRef.current;

      if (isSelected) {
        videoElement.play().catch(error => {
          console.log('Video play failed:', error);
        });
      } else {
        videoElement.pause();
      }
    }
  }, [isSelected, slide.type]);

  if (slide.type === 'video') {
    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          loop
          poster={slide.media || slide.src}
        >
          <source src={slide.media || slide.src} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={slide.media || slide.src}
        alt={slide.title}
        fill
        className="object-cover"
        priority={index === 0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
    </div>
  );
}

export default function HeroCarousel({
  data
}: {
  data: Slide[]
}) {
  const autoplayOptions = {
    delay: 10000,
    stopOnInteraction: false,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  const autoplay = useRef(
    AutoPlay(autoplayOptions)
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 40
    },
    [autoplay.current]
  );

  const onMouseEnter = useCallback(() => {
    if (autoplay.current && autoplay.current.stop) {
      autoplay.current.stop();
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    // if (autoplay.current && autoplay.current.play) {
    //   autoplay.current.play();
    // }
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    }
  }, [emblaApi, onSelect, data]);

  return (
    <div
      className="relative overflow-hidden bg-gray-900"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="embla" ref={emblaRef}>
        <div className="flex">
          {data.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] relative">
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[21/9]">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r opacity-20 z-10",
                  slide.backgroundColor
                )} />

                <SlideMedia
                  slide={slide}
                  index={index}
                  isSelected={index === selectedIndex}
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="container mx-auto px-10 sm:px-6 lg:px-8">
                    <div className="max-w-4xl sm:mx-32 mx-10 text-center">
                      {/* Semi-transparent overlay box with blur and shadow */}
                      <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg">
                        <h2 className="text-sm sm:text-base lg:text-lg text-yellow-300 font-semibold uppercase tracking-wider line-clamp-1">
                          {slide.subtitle}
                        </h2>
                        <h1 className="line-clamp-1 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight my-4 sm:my-8 text-white shadow-text">
                          {slide.title}
                        </h1>
                        <p className="line-clamp-2 text-base sm:text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
                          {slide.description}
                        </p>
                        {slide.buttonLink && slide.buttonText && (
                          <Link
                            href={slide.buttonLink}
                            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black bg-white hover:bg-yellow-300 rounded-full transition-all duration-300 group shadow-md"
                          >
                            {slide.buttonText}
                            <ChevronRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all z-30"
      >
        <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all z-30"
      >
        <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === selectedIndex
                ? "bg-white w-12 sm:w-16 md:w-20"
                : "bg-white/50 hover:bg-white/75 w-8 sm:w-12"
            )}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}