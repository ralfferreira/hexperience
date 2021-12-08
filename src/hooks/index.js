import React from "react";

import { AuthProvider } from "./auth";
import { ConnectionProvider } from './connection';
import { FavoritesProvider } from "./favorites";
import { LocationProvider } from "./location";

const AppProvider = ({children}) => (
  <ConnectionProvider>    
    <AuthProvider>
      <LocationProvider>
        <FavoritesProvider>     
          {children}
        </FavoritesProvider>
      </LocationProvider>
    </AuthProvider>
  </ConnectionProvider>
);

export default AppProvider;