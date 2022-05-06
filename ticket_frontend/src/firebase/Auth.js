import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserInfo } from './DataBase';
const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userInfo = await getUserInfo(user.uid);
          setCurrentUser(userInfo);
          console.log(userInfo);
        } else {
          setCurrentUser(null);
          console.log('no user signed in')
        }
      });
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
