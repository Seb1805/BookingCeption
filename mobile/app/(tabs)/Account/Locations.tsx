import { View, Text, ScrollView, FlatList, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import ButtonOwn from '@/components/ButtonOwn'
import { router } from 'expo-router'

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
    <ScrollView>
      <FlatList 
      data={datalocations} 
      renderItem={({item}) => {
        return (
          <View>
            <Text> 
              {item.locationName}
            </Text>

          </View>
        )
      }}
      />
    </ScrollView>
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