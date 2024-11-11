import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [userId, setUserId] = useState('')

    const login = (username) => {
        setUser({ username });
    };

    const logout = () => {
        setUser(null);
    };

  const  contextData = {
    setToken: setToken,
    token: token,
    setUser: setUser,
    setUserId:setUserId
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
