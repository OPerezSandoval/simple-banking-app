import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authToken, setAuthToken] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setTokens }}>
      {children}
    </AuthContext.Provider>
  );
}
