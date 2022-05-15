import React, { useContext} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//pages
import NotFound from './pages/Page404';
import Admin from './pages/Admin';
import Client from './pages/Client';
import Staff from './pages/Staff';
import UserSettingsPage from './pages/UserSettingsPage';
import Page404 from './pages/Page404';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

//socket components
import MainChatPage from './components/socket/MainForm.js';
import ChatRoomPage from './components/socket/ChatRoom.js';

// ----------------------------------------------------------------------

import { AuthContext } from './firebase/Auth';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

export default function Router() {
  const { currentUser } = useContext(AuthContext);
  let page = <Navigate to="404" />;
  if (currentUser && currentUser.role === 'client'){
    page =  <Navigate to="client" />
  }
  else if( currentUser && currentUser.role === 'staff'){
    page = <Navigate to="staff" />
  }
  else if( currentUser && currentUser.role === 'admin'){
    page = <Navigate to="admin" />
  }else{
    page = <Navigate to="404" />
  }
  return useRoutes([
    {
      path: '/dashboard',
      element: currentUser? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/dashboard', element: page },
        { path: 'admin', element: (currentUser && currentUser.role === 'admin') ? <Admin /> :  <Navigate to="404" /> },
        { path: 'client', element: (currentUser && currentUser.role === 'client') ? <Client /> :  <Navigate to="404" /> },
        { path: 'mainform', element: <MainChatPage /> },
        { path: 'chatroom/:roomId', element: <ChatRoomPage /> },
        { path: 'staff', element: (currentUser && (currentUser.role === 'staff') ) ? <Staff /> :  <Navigate to="404" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="404" /> }
     
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
