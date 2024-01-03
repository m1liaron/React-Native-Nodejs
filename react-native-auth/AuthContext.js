import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [forgotEmail, setForgotEmail] = useState('');

  return (
    <AuthContext.Provider value={{ forgotEmail, setForgotEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
