import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Notifications from "../pages/Notifications";

const NotificationsRoute = createStackNavigator();

const NotificationRoute = () => (
  <NotificationsRoute.Navigator
    screenOptions={{
      headerShown: false,
  }}>
    <NotificationsRoute.Screen name="Notifications" component={Notifications} />
  </NotificationsRoute.Navigator>
);

export default NotificationRoute;