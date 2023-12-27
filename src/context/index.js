'use client';
import { createContext, useEffect, useState } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// setting up context - https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
