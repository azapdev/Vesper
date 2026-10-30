import AppRouter from '../Routes/AppRouter';
import Footer from './footer';
import Header from './header';

const Index = () => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default Index;
