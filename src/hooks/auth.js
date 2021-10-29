import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInHours, parseISO } from "date-fns";

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [data, setData] = useState({});
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

        setData({ token: token[1], user: JSON.parse(user[1]), lastLoginDate: parseISO(lastLogin) });
      }
    }

    loadStorageData().then(() => renewSession());
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
      '@Hexperience:lastLoginDate'
    ]);

    setData({});
  }, []);

  const updateUser = useCallback(async (user) => {
    await AsyncStorage.setItem('@Hexperience:user', JSON.stringify(user));

    setData({
      token: data.token,
      user: user
    });
  }, [setData, data.token]);

  const renewSession = useCallback(async () => {
    if (data.user.type === 'admin') {
      if (differenceInHours(data.lastLoginDate, new Date()) > 23) {
        signOut();
      }

      return;
    }
    
    const response = await api.put('/sessions', {
      token: data.token,
      user_id: data.user.id
    });

    const { user, newToken } = response.data;

    await AsyncStorage.multiSet([
      ['@Hexperience:token', newToken],
      ['@Hexperience:user', JSON.stringify(user)],
      ['@Hexperience:lastLoginDate', new Date().toISOString()],
    ]);

    api.defaults.headers.authorization = `Bearer ${newToken}`;

    setData({ token: newToken, user: user, lastLoginDate: new Date() });

    setLoading(false);
  });

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
