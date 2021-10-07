import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateExperience from "../pages/CreateExperience";

const CreateExperienceRoute = createStackNavigator();

const createExperience = () => (
  <CreateExperienceRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <CreateExperienceRoute.Screen name="CreateExperience" component={CreateExperience} />
  </CreateExperienceRoute.Navigator>
);

export default createExperience;