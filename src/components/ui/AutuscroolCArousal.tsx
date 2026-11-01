import { cn } from '@/lib/utils';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import React, { useRef } from 'react';

interface TrustedBrandsProps {
  className?: string;
}

const brands = [
  'ATLAS',
  'ZENITH',
  'NEBULA',
  'AXIOM',
  'HALCYON',
  'VERTEX',
  'PULSAR',
  'SYNAPSE',
];

const TrustedBrands: React.FC<TrustedBrandsProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // بنستخدم MotionValue عشان نحرك العنصر بسلاسة على الـ Compositor Thread من غير Re-render
  const baseX = useMotionValue(0);

  // بنكرر الماركي عشان نعمل Loop لا نهائي ناعم
  const duplicatedBrands = [...brands, ...brands, ...brands];

  // دالة الحركة المستمرة (تم تقليل السرعة لأقصى درجة عشان تكون هادية جداً)
  useAnimationFrame((_, delta) => {
    let moveBy = -0.001 * delta;

    // بنحرك الـ base بنسبة تتناسب مع الوقت المنقرض
    baseX.set(baseX.get() + moveBy);
  });

  // بنربط القيمة بنسبة مئوية عشان يعمل Loop لما يخلص النصف
  const x = useTransform(baseX, (v) => `${v % 33.33}%`);

  return (
    <section
      className={cn(
        'w-full overflow-hidden bg-black py-16 text-white',
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4">
        {/* Subtitle with dots */}
        <div className="flex items-center gap-3 text-xs font-medium tracking-[0.25em] text-gray-400 uppercase sm:text-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
          <span>Trusted by teams shaping what comes next</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
        </div>

        {/* Marquee Container */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
        >
          <motion.div
            style={{ x }}
            className="flex w-max cursor-grab items-center gap-16 active:cursor-grabbing md:gap-24"
          >
            {duplicatedBrands.map((brand, index) => (
              <span
                key={index}
                className="text-xl font-extrabold tracking-wider text-gray-500 transition-colors duration-300 select-none hover:text-white sm:text-2xl md:text-3xl"
              >
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;