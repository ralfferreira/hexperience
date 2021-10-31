import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const LocationContext = createContext({});

const LocationProvider = ({children}) => {
  const [permission, setPermission] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    async function verifyPermission() {      
      const { granted } = await requestForegroundPermissionsAsync();

      setPermission(granted)
    }

    verifyPermission().then(() => updateLocation());
  }, []);

  const updateLocation = useCallback(async () => {
    if (!permission) {
      const { granted } = await requestForegroundPermissionsAsync();

      setPermission(granted);
    }

    if (permission) {
      const { coords } = await getCurrentPositionAsync({
        accuracy: 4,        
      });

      const { latitude, longitude } = coords;

      setCurrentLocation({ latitude, longitude });
    }
  }, []);
  
  return (
    <LocationContext.Provider
      value={{ updateLocation, currentLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

function useLocation() {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocation must be used within a LocationContext');
  }

  return context
}

export { LocationProvider, useLocation };