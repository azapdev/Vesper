import { ShootingStarsAndStarsBackgroundDemo } from '@/Pages/home/hero';
import Approach from './approach';
import Manifesto from './manifesto';
import Services from './services';
import Works from './works';

const Home = () => {
  return (
    <div>
      <ShootingStarsAndStarsBackgroundDemo />
      <Manifesto />
      <Works />
      <Services />
      <Approach />
    </div>
  );
};

export default Home;
