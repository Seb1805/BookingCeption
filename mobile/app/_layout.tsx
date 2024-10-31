import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './(auth)/Login';
import SignUp from './(auth)/Signup';
import CreateLocation from './Profile/CreateLocation';
import { Stack } from 'expo-router';

import Index from './(tabs)/index';


export default function Layout() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="(auth)/Login"/>
        <Stack.Screen name="(auth)/Signup"/>
        <Stack.Screen name="Profile/CreateLocation"/>
      </Stack> 
  );
}