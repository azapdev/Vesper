import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  blur: number;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00035,
  allStarsTwinkle = true,
  twinkleProbability = 0.8,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 2,
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const area = width * height;
      const numStars = Math.floor(area * starDensity);

      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          blur: Math.random() * 4 + 1,
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateStars = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      setStars(generateStars(rect.width, rect.height));
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;

      stars.forEach((star) => {
        const opacity =
          star.twinkleSpeed !== null
            ? 0.35 + Math.abs(Math.sin(time / star.twinkleSpeed) * 0.65)
            : star.opacity;

        ctx.save();

        // Soft glow
        ctx.shadowBlur = star.blur * 4;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className
      )}
    />
  );
};
