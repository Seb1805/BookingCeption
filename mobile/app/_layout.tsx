import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import Home from './Home';
import SignUpScreen from './SignupScreen'
// import { Stack } from 'expo-router';
// import RegisterScreen from './RegisterScreen';
// import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function Layout() {
  return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignUpScreen} />

        {/* <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
  );
}