import React, {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native"

import AuthRoute from "./auth.routes";
import Tabs from "./app.routes";
import userSettings from "./userSettings.routes";
import userEditProfile from "./userEditProfile.routes";
import hostCreateExperience from "./hostCreateExperience.routes";
import hostEditExperience from "./hostEditExperience.routes";
import experienceDetails from "./experience.routes";
import AdminDetails from './admin.routes';
import SearchPage from './search.routes';
import NotificationsPage from './notifications.routes';

import { useAuth } from '../hooks/auth';

const Routes = createStackNavigator();

const Route = () => {
  const { user } = useAuth();
  const [processingTimeEnded, setProcessingTimeEnded] = useState(false);

  if (!user) {
    setTimeout(() => {
      setProcessingTimeEnded(true);
    }, 300);
    return (
      <>
        {processingTimeEnded === true ? (
          <AuthRoute />
        ): (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        )}
      </>
    );
  }

  if (user.type === 'admin') {
    return <AdminDetails />
  }

  return (
    <>
      <Routes.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Routes.Screen name="AppRoute" component={Tabs} />
        <Routes.Screen name="ExperienceRoute" component={experienceDetails} />
        <Routes.Screen name="SearchRoute" component={SearchPage} />
        <Routes.Screen name="NotificationsRoute" component={NotificationsPage} />
        <Routes.Screen name="CreateExperienceRoute" component={hostCreateExperience} />
        <Routes.Screen name="EditExperienceRoute" component={hostEditExperience} />
        <Routes.Screen name="SettingsRoute" component={userSettings} />
        <Routes.Screen name="EditProfileRoute" component={userEditProfile} />
      </Routes.Navigator>
    </>
  );
};

export default Route;
