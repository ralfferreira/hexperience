import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from "react";
import { Alert } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInHours, parseISO } from "date-fns";

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [data, setData] = useState({
    token: null,
    user: null,
    lastLoginDate: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user, lastLogin] = await AsyncStorage.multiGet([
        '@Hexperience:token',
        '@Hexperience:user',
        '@Hexperience:lastLoginDate'
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ 
          token: token[1], 
          user: JSON.parse(user[1]), 
          lastLoginDate: parseISO(lastLogin[1]) 
        });
      }
    }

    loadStorageData().then(() => {});
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email: email,
      password: password
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Hexperience:token', token],
      ['@Hexperience:user', JSON.stringify(user)],      
      ['@Hexperience:lastLoginDate', new Date().toISOString()],      
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token: token, user: user, lastLoginDate: new Date()});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@Hexperience:token', 
      '@Hexperience:user',
      '@Hexperience:lastLoginDate',
      '@Hexperience:favorites'
    ]);

    setData({});
  }, []);

  const updateUser = useCallback(async (user) => {
    await AsyncStorage.setItem('@Hexperience:user', JSON.stringify(user));

    setData({
      token: data.token,
      user: user
    });
  }, [data.token]);  

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
