'use client';
import { createContext } from 'react';

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

// setting up context - https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
