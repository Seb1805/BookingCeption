import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './(auth)/Login';
import SignUp from './(auth)/Signup';
import CreateLocation from './(tabs)/Account/modals/CreateLocation';
import { Stack, useFocusEffect } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';

import Index from './(tabs)/index';
import { Button, Pressable } from 'react-native';



export default function Layout() {
  useFocusEffect(
    useCallback(()=> {
    setStatusBarStyle('light')
  }, []))
  
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/Login" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="(auth)/Signup" options={{ headerTitle: "Sign up" }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="Shop" options={{ headerShown: false}} />
    </Stack>
  );
}