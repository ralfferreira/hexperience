import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditExperience from "../pages/EditExperience";
const EditExperienceRoute = createStackNavigator();

const hostEditExperience = () => (
  <EditExperienceRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <EditExperienceRoute.Screen name="EditExperience" component={EditExperience} />
  </EditExperienceRoute.Navigator>
);

export default hostEditExperience;