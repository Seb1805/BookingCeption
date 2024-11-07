import { View, Text, ScrollView, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import ButtonOwn from '@/components/ButtonOwn'
import { router } from 'expo-router'
import PlusEntity from '@/components/PlusEntity'

const datalocations = [
  {
    id: 12,
    locationName: "temp",
    address: "temp"
  },
  {
    id: 16,
    locationName: "test",
    address: "test"
  },
  {
    id: 13,
    locationName: "dummy",
    address: "dummy"
  },
]
export default function Locations() {
  return (
    <>
    <ScrollView style={{flex: 1, margin: 8}}>
      {datalocations.map((item, key) => {return (
        <Text key={key}>{item.locationName}</Text>
      )})}
    </ScrollView>
    <PlusEntity func={() => {router.navigate('/(tabs)/Account/modals/CreateLocation')}}/>

    </>
  )
}


const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 24,
    backgroundColor: 'red',
    borderRadius: 100,
    width: '10%'
  },
  card2: {
    backgroundColor: 'blue'
  }
}); 