import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../pages/Settings";

const SettingsRoute = createStackNavigator();

const userSettings = () => (
  <SettingsRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <SettingsRoute.Screen name="Settings" component={Settings} />
  </SettingsRoute.Navigator>
);

export default userSettings;