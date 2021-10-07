import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfile from "../pages/EditProfile";

const EditProfileRoute = createStackNavigator();

const userEditProfile = () => (
  <EditProfileRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <EditProfileRoute.Screen name="EditProfile" component={EditProfile} />
  </EditProfileRoute.Navigator>
);

export default userEditProfile;