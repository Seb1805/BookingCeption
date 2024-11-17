import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import CartIcon from '@/components/CartIcon'
import { Colors } from '@/constants/Colors'

export default function _layout() {
  return (
    <Stack  screenOptions={{ headerShown: true }}>
      <Stack.Screen name='index' options={{headerTitle: "Bestilling"}}/>
      <Stack.Screen name='[id]' options={{headerTitle: "", headerRight: () => <View style={{marginHorizontal: 4}}><CartIcon color={Colors.light.text}/></View>}}/>
    </Stack>
  )
}