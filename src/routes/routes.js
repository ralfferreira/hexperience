
import React from "react";
import AuthRoute from "./auth.routes";
import Tabs from "./app.routes";
import userSettings from "./userSettings.routes";
import userEditProfile from "./userEditProfile.routes";
import createExperience from "./createExperience.routes";
import { createStackNavigator } from "@react-navigation/stack";

const Routes = createStackNavigator()

const Route = () => {
    return (
      <>
      <Routes.Navigator screenOptions={{
      headerShown: false,
      }}>
      {/* Logged Users */}
      {/* {isLoggedIn ? ( */}
        {/* <RoutesGroup> */}
          <Routes.Screen name="AuthRoute" component={AuthRoute} />
          <Routes.Screen name="AppRoute" component={Tabs} />
          <Routes.Screen name="CreateExperienceRoute" component={createExperience} />
          <Routes.Screen name="SettingsRoute" component={userSettings} />
          <Routes.Screen name="EditProfileRoute" component={userEditProfile} />
        {/* </RoutesGroup> */}
      {/* ) : ( */}
      {/* // Authentication */}
      {/* <Routes.Group>
        <Routes.Screen name="AuthRoute" component={AuthRoute} />
      </Routes.Group> */}
      {/* )} */}
      </Routes.Navigator>
      </>
    );
};

export default Route;

// isSignedIn ? (
//   <>
//     <Stack.Screen name="Home" component={HomeScreen} />
//     <Stack.Screen name="Profile" component={ProfileScreen} />
//     <Stack.Screen name="Settings" component={SettingsScreen} />
//   </>
// ) : (
//   <>
//     <Stack.Screen name="SignIn" component={SignInScreen} />
//     <Stack.Screen name="SignUp" component={SignUpScreen} />
//   </>
// )