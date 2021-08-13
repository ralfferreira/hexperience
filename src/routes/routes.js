
import React from "react";
import AuthRoute from "./auth.routes";
import Tabs from "./app.routes";
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
      </Routes.Navigator>
      </>
    );

  
};

export default Route;
