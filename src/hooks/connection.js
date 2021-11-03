import React, { 
  createContext, 
  useCallback, 
  useContext,
  useEffect, 
  useState 
} from 'react';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConnectionContext = createContext({});

const ConnectionProvider = ({children}) => {
  const [connecting, setConnecting] = useState(true);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    async function testConnection() {
      const network = await Network.getNetworkStateAsync();

      if (!network.isConnected) {
        setConnecting(false);
      }
    }

    testConnection()
  }, []);

  useEffect(() => {
    async function verifyIfFirstTime() {
      const isFirstTime = await AsyncStorage.getItem('@Hexperience:firstTime');

      if (isFirstTime) {
        setFirstTime(false);
      }
    }

    verifyIfFirstTime();
  }, []);

  const handleConnectivityChange = useCallback(() => {
    setConnecting(!connecting);
  }, []);

  const tryToConnect = useCallback(async () => {
    const network = await Network.getNetworkStateAsync();

    setConnecting(network.isConnected);
  }, []);

  const handleFirstTime = useCallback(() => {
    AsyncStorage.setItem('@Hexperience:firstTime', 'false').then(() => {
      setFirstTime(false);
    });
  }, [setFirstTime]);

  return (
    <ConnectionContext.Provider
      value={{ handleConnectivityChange, tryToConnect, connecting, firstTime, handleFirstTime }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

function useConnection() {
  const context = useContext(ConnectionContext);

  if (!context) {
    throw new Error('useConnection must be used within an ConnectionProvider')
  }

  return context;
}

export { ConnectionProvider, useConnection };