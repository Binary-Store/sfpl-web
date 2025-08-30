'use client';

import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [lastId, setLastId] = useState(null);
  const [breadcrumbsEndPoint, setBreadcrumbsEndPoint] = useState([]);

  const value = {
    lastId,
    setLastId,
    breadcrumbsEndPoint,
    setBreadcrumbsEndPoint,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
