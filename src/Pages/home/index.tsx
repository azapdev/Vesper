import { ShootingStarsAndStarsBackgroundDemo } from '@/Pages/home/hero';
import Approach from './approach';
import Conclusion from './conclusion';
import HowWeWork from './howWeWork';
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
      <HowWeWork />
      <Conclusion />
    </div>
  );
};

export default Home;
