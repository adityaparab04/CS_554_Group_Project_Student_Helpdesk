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
import MainChatPage from './components/socket/MainForm.js';
import ChatRoomPage from './components/socket/ChatRoom.js';
import UserProfilePage from './pages/UserProfilePage';
import UserSettingsPage from './pages/UserSettingsPage';
import Page404 from './pages/Page404';
// ----------------------------------------------------------------------

import { AuthContext } from './firebase/Auth';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

export default function Router() {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser)
  return useRoutes([
    {
      path: '/dashboard',
      element: currentUser? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/dashboard', element: <Navigate to="client" /> },
        { path: 'admin', element: (currentUser && currentUser.role === 'admin') ? <Admin /> : <Navigate to="/client" /> },
        { path: 'client', element: <Client /> },
        { path: 'mainform', element: <MainChatPage /> },
        { path: 'chatroom/:roomId', element: <ChatRoomPage /> },
        { path: 'staff', element: (currentUser && (currentUser.role === 'staff' || currentUser.role === 'admin') ) ? <Staff /> : <Navigate to="/client" /> },
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

    {
      path: '/profile/:uid',
      element: !currentUser ? <Navigate to='/login'/> : <UserProfilePage />,
      children: [
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    {
      path: '/settings',
      element: !currentUser ? <Navigate to='/login'/> : <UserSettingsPage />,
      children: [
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '/404', element: <Page404 />},

    { path: '*', element: <Navigate to="/404" replace /> }

  ]);
}
