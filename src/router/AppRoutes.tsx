import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {privateRoutes, publicRoutes} from './index';

const AppRoutes: FC = () => {
  const {isAuth} = useTypedSelector((state) => state.auth);

  return (
    isAuth ? (
      <Routes>
        {privateRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    ) : (
      <Routes>
        {publicRoutes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    )
  );
};

export default AppRoutes;