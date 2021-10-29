import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Experience from "../pages/Experience";
import ReportExperience from "../pages/ReportExperience";

const ExperienceRoute = createStackNavigator();

const experienceDetails = () => (
  <ExperienceRoute.Navigator
    screenOptions={{
      headerShown: false,
  }}>
    <ExperienceRoute.Screen name="Experience" component={Experience} />
    <ExperienceRoute.Screen name="ReportExperience" component={ReportExperience} />
  </ExperienceRoute.Navigator>
);

export default experienceDetails;