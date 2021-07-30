import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../pages/Home'
import CalendarScreen from '../../pages/Calendar'
import FavoritesScreen from '../../pages/Favorites'
import ProfileScreen from '../../pages/Profile'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator tabBarOptions={{
      showLabel: false,
      style: {
        position: 'absolute',
        elevation: 0,
        backgroundColor: '#fff',
        height: 90,
      }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => (
          <View style={{alignItems: 'center', justifyContent:'center', top: 10}}>
            <Image 
            source={require('../../assets/img/home.png')} 
            resizeMode= "contain"
            style={{
              width: 30,
              height: 30,
              tintColor: focused ? '#01BE94' : '#000',
              marginBottom: 20,
            }}
            />
          </View>
        ),
      }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image 
            source={require('../../assets/img/calendar.png')} 
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
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image 
            source={require('../../assets/img/favorites.png')} 
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
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image 
            source={require('../../assets/img/profile.png')}
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

export default Tabs;