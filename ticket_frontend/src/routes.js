import { Navigate, useRoutes } from 'react-router-dom';
import React, { useContext} from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import NotFound from './pages/Page404';
import Admin from './pages/Admin';
import Client from './pages/Client';
import Staff from './pages/Staff';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// ----------------------------------------------------------------------

import { AuthContext } from './firebase/Auth';
import AuthLayout from './layouts/AuthLayout';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

export default function Router() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return useRoutes([
    {
      path: '/dashboard',
      element: currentUser? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/dashboard', element: <Navigate to="client" /> },
        { path: 'admin', element: <Admin /> },
        { path: 'client', element: <Client /> },
        { path: 'staff', element: <Staff /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    {
      path: '/',
      element: !currentUser ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <LoginPage />},
        { path: 'register', element: <RegisterPage />},
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
