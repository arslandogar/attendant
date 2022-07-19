import { Navigate } from 'react-router-dom';

import { Login } from '@/pages/public';

export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];
