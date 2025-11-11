import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [isGuest, setIsGuest] = useState(false);

  const login = (userData) => {
    // userData puede ser solo el id (string) o un objeto completo
    if (typeof userData === 'string') {
      setUserId(userData);
      setUserName(null);
      setUserEmail(null);
      setUserPoints(0);
    } else {
      setUserId(userData.id);
      setUserName(userData.nombre || null);
      setUserEmail(userData.email || null);
      setUserPoints(userData.puntos || 0);
    }
    setIsGuest(false);
  };

  const loginAsGuest = () => {
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserPoints(0);
    setIsGuest(true);
  };

  const logout = () => {
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserPoints(0);
    setIsGuest(false);
  };

  return (
    <UserContext.Provider value={{ 
      userId, 
      userName, 
      userEmail, 
      userPoints,
      isGuest, 
      login, 
      loginAsGuest, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

