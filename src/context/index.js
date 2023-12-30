'use client';
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: ''
  });

  useEffect(() => {
    if (Cookies.get('token') !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// setting up context - https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
