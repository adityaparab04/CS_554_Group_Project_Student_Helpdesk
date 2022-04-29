import React, { useState, useEffect } from 'react';
import firebaseApp from './Firebase';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
        // setLoadingUser(false);
      }else{
        setCurrentUser(null);
        console.log('no user signed in')
      }
    });
  }, []);

  // if (loadingUser) {
  //   return (
  //     <div>
  //       <h1>Loading....Loading....Loading....Loading....Loading....</h1>
  //     </div>
  //   );
  // }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
