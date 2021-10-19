import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../pages/Settings";
import RequestHost from "../pages/RequestHost";

const SettingsRoute = createStackNavigator();

const userSettings = () => (
  <SettingsRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <SettingsRoute.Screen name="Settings" component={Settings} />
    <SettingsRoute.Screen name="RequestHost" component={RequestHost} />
  </SettingsRoute.Navigator>
);

export default userSettings;