import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import GettingStartedOne from "../pages/GettingStartedOne";
import GettingStartedTwo from "../pages/GettingStartedTwo";
import GettingStartedThree from "../pages/GettingStartedThree";
import { useConnection } from "../hooks/connection";

const Auth = createStackNavigator();

const AuthRoute = () => {
  const { firstTime } = useConnection();
  
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* {
        firstTime === true
        && (
          <> */}
            <Auth.Screen name="GettingStartedOne" component={GettingStartedOne} />
            <Auth.Screen name="GettingStartedTwo" component={GettingStartedTwo} />
            <Auth.Screen name="GettingStartedThree" component={GettingStartedThree} />
          {/* </>
        )
      } */}
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  )
};

export default AuthRoute;