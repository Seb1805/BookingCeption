import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Home from './Home';
import SignUp from './Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Index from './index';


const Tab = createBottomTabNavigator();
// function BottomNavigation() {
//   return (
//     <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
//       <Tab.Screen name="Home" component={Home} options={{ title: 'Setting Page'}}/>
//     </Tab.Navigator>
//   )
// }


export default function Layout() {
  return (
      <Stack.Navigator initialRouteName="index">
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
      </Stack.Navigator> 
  );
}