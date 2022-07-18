import { Spin } from 'antd';
import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { initAuth } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { adminRoutes } from './admin';
import { publicRoutes } from './public';
import { userRoutes } from './user';

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  console.log(auth);

  useEffect(() => {
    if (!auth.isInitialized && auth.status === 'idle') dispatch(initAuth());
  }, [auth.isInitialized, auth.status, dispatch]);

  const appRoutes = auth.isLoggedIn
    ? auth.user?.role === 'admin'
      ? adminRoutes
      : userRoutes
    : publicRoutes;

  const homeLoaderRoute = [
    {
      path: '/',
      element: (
        <div className="full-page-container">
          <Spin size="large" />
        </div>
      ),
    },
  ];

  const routes = auth.isInitialized ? appRoutes : homeLoaderRoute;

  const element = useRoutes([
    ...routes,
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return <>{element}</>;
};
