import { ShootingStarsAndStarsBackgroundDemo } from '@/Pages/home/hero';
import Manifesto from './manifesto';
import Services from './services';
import Works from './works';

const Home = () => {
  return (
    <div className="">
      <ShootingStarsAndStarsBackgroundDemo />
      <Manifesto />
      <Works />
      <Services />
    </div>
  );
};

export default Home;
