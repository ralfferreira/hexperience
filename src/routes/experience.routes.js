import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Experience from "../pages/Experience";
const ExperienceRoute = createStackNavigator();

const experienceDetails = () => (
  <ExperienceRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <ExperienceRoute.Screen name="Experience" component={Experience} />
  </ExperienceRoute.Navigator>
);

export default experienceDetails;