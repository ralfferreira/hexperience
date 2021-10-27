import React, { 
  createContext, 
  useCallback, 
  useContext,
  useEffect, 
  useState 
} from 'react';
import * as Network from 'expo-network';

const ConnectionContext = createContext({});

const ConnectionProvider = ({children}) => {
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    async function testConnection() {
      const network = await Network.getNetworkStateAsync();

      if (!network.isConnected) {
        setConnecting(false);
      }
    }

    testConnection()
  }, []);

  const handleConnectivityChange = useCallback(() => {
    setConnecting(!connecting);
  }, []);

  const tryToConnect = useCallback(async () => {
    const network = await Network.getNetworkStateAsync();

    setConnecting(network.isConnected);
  }, []);

  return (
    <ConnectionContext.Provider
      value={{ handleConnectivityChange, tryToConnect, connecting }}
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