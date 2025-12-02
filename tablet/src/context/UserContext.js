import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [isGuest, setIsGuest] = useState(false);
  const [qrToken, setQrToken] = useState(null);
  const [sessionJwt, setSessionJwt] = useState(null);
  const [sessionActive, setSessionActive] = useState(false);

  const login = (userData) => {
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
    setSessionActive(false);
  };

  const saveSession = (qrTokenValue, sessionJwtValue, userId) => {
    // Limpiar datos de usuario anterior
    setUserName(null);
    setUserEmail(null);
    setUserPoints(0);
    setIsGuest(false);
    
    // Guardar nueva sesión
    setQrToken(qrTokenValue);
    setSessionJwt(sessionJwtValue);
    setSessionActive(true);
    setUserId(userId);
  };

  const clearSession = () => {
    setQrToken(null);
    setSessionJwt(null);
    setSessionActive(false);
  };

  const logout = () => {
    // Limpiar todos los datos del usuario
    setUserId(null);
    setUserName(null);
    setUserEmail(null);
    setUserPoints(0);
    setIsGuest(false);
    
    // Limpiar sesión
    setQrToken(null);
    setSessionJwt(null);
    setSessionActive(false);
  };

  return (
    <UserContext.Provider value={{ 
      userId, 
      userName, 
      userEmail, 
      userPoints,
      isGuest,
      qrToken,
      sessionJwt,
      sessionActive,
      login, 
      loginAsGuest, 
      logout,
      saveSession,
      clearSession
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

