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
      </Routes>
    </div>
  );
};

export default AppRouter;
