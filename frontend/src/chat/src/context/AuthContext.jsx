import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../../../firebase/fire";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // const checkUserLoggedIn = () => {
  //   if (currentUser) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
