import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../pages/Settings";
import RequestHost from "../pages/RequestHost";
import ReportBug from "../pages/ReportBug";

const SettingsRoute = createStackNavigator();

const userSettings = () => (
  <SettingsRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <SettingsRoute.Screen name="Settings" component={Settings} />
    <SettingsRoute.Screen name="RequestHost" component={RequestHost} />
    <SettingsRoute.Screen name="ReportBug" component={ReportBug} />
  </SettingsRoute.Navigator>
);

export default userSettings;