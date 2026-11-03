import { cn } from '@/lib/utils';
import React, { useCallback, useEffect, useRef } from 'react';

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<StarProps[]>([]);

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

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const dimensions = {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight,
    };

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    starsRef.current = generateStars(dimensions.width, dimensions.height);

    let animationFrameId: number;

    const handleResize = () => {
      dimensions.width = canvas.offsetWidth;
      dimensions.height = canvas.offsetHeight;

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;

      starsRef.current = generateStars(dimensions.width, dimensions.height);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      const time = Date.now() * 0.001;

      starsRef.current.forEach((star) => {
        const opacity =
          star.twinkleSpeed !== null
            ? 0.35 + Math.abs(Math.sin(time / star.twinkleSpeed) * 0.65)
            : star.opacity;

        ctx.beginPath();

        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [generateStars]);

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
