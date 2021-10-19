import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../pages/Search";
const SearchRoute = createStackNavigator();

const SearchPage = () => (
  <SearchRoute.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <SearchRoute.Screen name="Search" component={Search} />
  </SearchRoute.Navigator>
);

export default SearchPage;