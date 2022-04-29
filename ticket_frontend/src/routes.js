import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import NotFound from './pages/Page404';
import Admin from './pages/Admin';
import Client from './pages/Client';
import Staff from './pages/Staff';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="client" /> },
        { path: 'admin', element: <Admin /> },
        { path: 'client', element: <Client /> },
        { path: 'staff', element: <Staff /> },
      ]
    },
    {
      path: '/',
      // element: <LogoOnlyLayout />,
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
