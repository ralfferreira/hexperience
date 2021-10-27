import React from "react";

import { AuthProvider } from "./auth";
import { ConnectionProvider } from './connection';
import { LocationProvider } from "./location";

const AppProvider = ({children}) => (
  <ConnectionProvider>    
    <AuthProvider>
      <LocationProvider>
        {children}
      </LocationProvider>
    </AuthProvider>
  </ConnectionProvider>
);

export default AppProvider;