import React from 'react';
import { View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Admin from "../pages/Admin";
import AdminHostRequest from "../pages/AdminHostRequest";
import AdminComplaintUsers from "../pages/AdminComplaintUsers";
import AdminBlockedUsers from "../pages/AdminBlockedUsers";
import AdminBlockedExperiences from "../pages/AdminBlockedExperiences";
import AdminReportedExperiences from "../pages/AdminReportedExperiences";
import AdminReportedBugs from "../pages/AdminReportedBugs";
import SettingsScreen from '../pages/AdminSettings'

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return(
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Admin" component={Admin} />
      <HomeStack.Screen name="AdminHostRequests" component={AdminHostRequest} options={{
        headerShown: true, 
        title: 'Solicitações de Anfitrião',
        headerTitleAlign: 'center',
        }} />
      <HomeStack.Screen name="AdminComplaintUsers" component={AdminComplaintUsers} options={{
        headerShown: true, 
        title: 'Usuários Denunciados',
        headerTitleAlign: 'center',
        }} />
      <HomeStack.Screen name="AdminBlockedUsers" component={AdminBlockedUsers} options={{
        headerShown: true, 
        title: 'Usuários Bloqueados',
        headerTitleAlign: 'center',
        }} />
      <HomeStack.Screen name="AdminBlockedExperiences" component={AdminBlockedExperiences} options={{
        headerShown: true, 
        title: 'Experiências Bloqueadas',
        headerTitleAlign: 'center',
        }} />
      <HomeStack.Screen name="AdminReportedExperiences" component={AdminReportedExperiences} options={{
        headerShown: true, 
        title: 'Experiências Reportadas',
        headerTitleAlign: 'center',
        }} />
      <HomeStack.Screen name="AdminReportedBugs" component={AdminReportedBugs} options={{
        headerShown: true, 
        title: 'Problemas Relatados',
        headerTitleAlign: 'center',
        }} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return(
    <Tab.Navigator tabBarOptions={{
      showLabel: false,
      style: {
        position: 'absolute',
        elevation: 0,
        backgroundColor: '#fff',
        height: 80,
      }
    }}>
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent:'center', top: 10}}>
            <Image 
            source={require('../assets/img/home.png')} 
            resizeMode= "contain"
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#01BE94' : '#000',
              marginBottom: 18,
            }}
            />
          </View>
        ),
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image 
            source={require('../assets/img/settings-icon.png')} 
            resizeMode= "contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? '#01BE94' : '#000',
              margin: 0,
            }}
            />
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}

export default AdminTabs;