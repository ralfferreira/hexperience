
import React from "react";
import AuthRoute from "./auth.routes";
import Tabs from "./app.routes";
import userSettings from "./userSettings.routes";
import userEditProfile from "./userEditProfile.routes";
import { createStackNavigator } from "@react-navigation/stack";

const Routes = createStackNavigator()

const Route = () => {
    return (
      <>
      <Routes.Navigator screenOptions={{
      headerShown: false,
      }}>
        <Routes.Screen name="AuthRoute" component={AuthRoute} />
        <Routes.Screen name="AppRoute" component={Tabs} />

        <Routes.Screen name="SettingsRoute" component={userSettings} />
        <Routes.Screen name="EditProfileRoute" component={userEditProfile} />
      </Routes.Navigator>
      </>
    );
};

export default Route;
