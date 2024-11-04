import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function _layout() {
  return (
    <Stack screenOptions={{ headerShown: true }} >
        <Stack.Screen name="index" options={{headerShown:false }}/>
        
        <Stack.Screen name="Locations"    options={{
        headerShown: true,
        headerTitle: 'Mine lokationer',
        headerRight: () => (
        <Pressable 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: 10,
          backgroundColor: 'darkgray',
        }}
        onPress={() => router.navigate('/(tabs)/Account/modals/CreateLocation')}
      >
        <Text style={styles.Text}>Hej jeg er et barn</Text>
      </Pressable>
    )
  }}/>
        <Stack.Screen name="modals/CreateLocation"  options={{ headerShown: true, headerTitle: 'Opret lokation'}} />
        <Stack.Screen name="modals/CRUDmodal" options={({route}) => ({ title: route.params.name, headerShown: true ,presentation: 'modal' })} />
        <Stack.Screen name="modals/CampaignModal" options={{headerShown: true, headerTitle: 'Opret Kampagne'}} />
    </Stack>
  )
}


const styles = StyleSheet.create({
  Text:{
    color: '#FFF'
  }
})