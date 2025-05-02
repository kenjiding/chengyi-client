"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function ProductShowcase3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const translateX = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-blue-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-white"
          >
            Latest Technology
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative h-[400px] flex items-center justify-center">
          {/* 3D Product Grid */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                style={{
                  rotateY: rotate,
                  scale,
                  x: translateX,
                }}
                className="relative w-48 h-48 bg-white/10 rounded-xl backdrop-blur-md 
                         shadow-2xl transform-gpu transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-xl" />
                <Image
                  src={`/products/showcase-${item}.png`}
                  alt={`Product ${item}`}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center bg-black/30 backdrop-blur-sm rounded-b-xl">
                  <div className="text-sm font-medium">Featured Product {item}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 400,
                  scale: 0
                }}
                animate={{
                  x: Math.random() * 1000,
                  y: Math.random() * 400,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 