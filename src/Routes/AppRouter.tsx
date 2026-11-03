import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
