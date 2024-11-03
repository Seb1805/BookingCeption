import { View, Text } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index"/>
        <Stack.Screen name="locations"  options={{ headerShown: true, headerTitle: 'Mine lokationer'}} />
        <Stack.Screen name="modals/CreateLocation"  options={{ headerShown: true, headerTitle: 'Opret lokation'}} />
        <Stack.Screen name="modals/CRUDmodal" options={({route}) => ({ title: route.params.name, headerShown: true ,presentation: 'modal' })} />
    </Stack>
  )
}