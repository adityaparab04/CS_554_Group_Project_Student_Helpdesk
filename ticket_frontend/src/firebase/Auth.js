import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        let userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          role: 'admin'
        }
        setCurrentUser(userData);
      }else{
        setCurrentUser(null);
        console.log('no user signed in')
      }
    });
  }, []);


  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
