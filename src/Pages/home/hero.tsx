import { Button } from '@/components/Button';
import Section from '@/components/Section';
import Title from '@/components/Title';
import HeroOrbCanvas from '@/components/ui/HeroOrb';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import { Links } from '@/Routes/routes';

export function ShootingStarsAndStarsBackgroundDemo() {
  return (
    <Section style="relative flex min-h-[calc(100vh-60px)] w-full flex-col items-center justify-center overflow-hidden bg-black ">
      {/* Canvas Background */}
      <HeroOrbCanvas />

      {/* Main Content */}
      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-4 text-center sm:gap-5 md:gap-6">
        {/* EST */}
        <Title title="CREATIVE STUDIO — EST. 2026" />

        {/* Heading */}
        <h1 className="max-w-3xl text-2xl leading-tight font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          We build worlds beyond the dark
        </h1>

        {/* Description */}
        <p className="max-w-lg text-xs leading-relaxed text-gray-400 sm:text-base md:text-lg">
          An independent design studio crafting cinematic brands, products, and
          digital worlds for companies reaching further than before.
        </p>

        {/* CTA Button */}
        <div className="mt-2 sm:mt-4">
          <Button title="Start Project" to={Links.CONTACT} />
        </div>
      </div>

      {/* Background Animations */}
      <ShootingStars
        minSpeed={3}
        maxSpeed={6}
        minDelay={300}
        maxDelay={3500}
        starWidth={120}
        starHeight={2}
        starColor="#ffffff"
        trailColor="#a78bfa"
      />

      <StarsBackground
        starDensity={0.0005}
        allStarsTwinkle={true}
        twinkleProbability={0.9}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={2}
      />
    </Section>
  );
}
