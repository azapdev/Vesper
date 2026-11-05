import WorkElementPage from '@/Pages/workElementPage';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
        <Route path={'/works/:slug'} element={<WorkElementPage />} />
        <Route path="/test" element={<h1>Route is working!</h1>} />
      </Routes>
    </div>
  );
};

export default AppRouter;
