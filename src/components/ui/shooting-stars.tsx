import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
  opacity: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

const getRandomStartPoint = () => {
  const side = Math.floor(Math.random() * 4);
  const offset = Math.random() * window.innerWidth;

  switch (side) {
    case 0:
      return { x: offset, y: 0, angle: 45 };
    case 1:
      return { x: window.innerWidth, y: offset, angle: 135 };
    case 2:
      return { x: offset, y: window.innerHeight, angle: 225 };
    default:
      return { x: 0, y: offset, angle: 315 };
  }
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 3,
  maxSpeed = 6,
  minDelay = 1200,
  maxDelay = 3000,
  starColor = '#ffffff',
  trailColor = '#a78bfa',
  starWidth = 100,
  starHeight = 2,
  className,
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const createStar = () => {
      if (cancelled) return;

      const { x, y, angle } = getRandomStartPoint();

      setStar({
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
        opacity: 1,
      });

      const delay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutRef.current = setTimeout(createStar, delay);
    };

    createStar();

    return () => {
      cancelled = true;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    let animationFrame: number;
    let previousTime = 0;

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;

      setStar((prevStar) => {
        if (!prevStar) return null;

        const radians = (prevStar.angle * Math.PI) / 180;

        const newX = prevStar.x + prevStar.speed * Math.cos(radians) * delta;

        const newY = prevStar.y + prevStar.speed * Math.sin(radians) * delta;

        const newDistance = prevStar.distance + prevStar.speed * delta;

        // Fade gradually near the end of the screen
        const maxDistance =
          Math.max(window.innerWidth, window.innerHeight) * 1.5;

        const fadeStart = maxDistance * 0.65;
        const fadeProgress = Math.max(
          0,
          (newDistance - fadeStart) / (maxDistance - fadeStart)
        );

        const opacity = 1 - Math.min(fadeProgress, 1);

        if (
          newX < -150 ||
          newX > window.innerWidth + 150 ||
          newY < -150 ||
          newY > window.innerHeight + 150 ||
          opacity <= 0
        ) {
          return null;
        }

        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: 1 + newDistance / 500,
          opacity,
        };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        className
      )}
    >
      <defs>
        <linearGradient id="shooting-star-gradient">
          <stop offset="0%" stopColor={trailColor} stopOpacity="0" />
          <stop offset="70%" stopColor={trailColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={starColor} stopOpacity="1" />
        </linearGradient>

        <filter
          id="shooting-star-glow"
          x="-100%"
          y="-300%"
          width="300%"
          height="700%"
        >
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {star && (
        <g opacity={star.opacity}>
          {/* Long shooting trail */}
          <rect
            x={star.x - starWidth * star.scale}
            y={star.y - starHeight / 2}
            width={starWidth * star.scale}
            height={starHeight}
            rx={starHeight}
            fill="url(#shooting-star-gradient)"
            filter="url(#shooting-star-glow)"
            transform={`rotate(${star.angle}, ${star.x}, ${star.y})`}
          />

          {/* Bright star head */}
          <circle
            cx={star.x}
            cy={star.y}
            r={2}
            fill={starColor}
            filter="url(#shooting-star-glow)"
          />
        </g>
      )}
    </svg>
  );
};
