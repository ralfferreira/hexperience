import React from 'react';
import { View, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/Admin'
import SettingsScreen from '../pages/AdminSettings'

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
      <Tab.Screen name="Home" component={HomeScreen} options={{
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

// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import Admin from "../pages/Admin";
// import HostRequests from "../pages/HostRequests";
// import ComplaintUsers from "../pages/ComplaintUsers";
// import BlockedUsers from "../pages/BlockedUsers";
// import BlockedExperiences from "../pages/BlockedExperiences";
// import ReportedExperiences from "../pages/ReportedExperiences";
// import ReportedBugs from "../pages/ReportedBugs";

// const AdminRoute = createStackNavigator();

// const AdminDetails = () => (
//   <AdminRoute.Navigator
//     screenOptions={{
//       headerShown: false,
//   }}>
//     <AdminRoute.Screen name="Admin" component={Admin} />

//     <AdminRoute.Screen name="HostRequests" component={HostRequests} />
//     <AdminRoute.Screen name="ComplaintUsers" component={ComplaintUsers} />
//     <AdminRoute.Screen name="BlockedUsers" component={BlockedUsers} />

//     <AdminRoute.Screen name="BlockedExperiences" component={BlockedExperiences} />
//     <AdminRoute.Screen name="ReportedExperiences" component={ReportedExperiences} />

//     <AdminRoute.Screen name="ReportedBugs" component={ReportedBugs} />
    
//   </AdminRoute.Navigator>
// );

// export default AdminDetails;