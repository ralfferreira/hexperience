import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@Hexperience:token',
        '@Hexperience:user'
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email: email,
      password: password
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@Hexperience:token', token],
      ['@Hexperience:user', JSON.stringify(user)]
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token: token, user: user});
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Hexperience:token', '@Hexperience:user']);

    setData({});
  }, []);

  const updateUser = useCallback(async (user) => {
    await AsyncStorage.setItem('@Hexperience:user', JSON.stringify(user));

    setData({
      token: data.token,
      user: user
    });
  }, [setData, data.token]);

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
