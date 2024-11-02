import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index"/>
        <Stack.Screen name="CreateLocation"  options={{ headerShown: true, headerTitle: 'Create location'}} />
        <Stack.Screen name="CRUDmodal" options={{ presentation: 'modal' }} />
    </Stack>
  )
}