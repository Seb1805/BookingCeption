import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import ButtonOwn from '@/components/ButtonOwn'

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
              asd
            </Text>
          </View>
        )
      }}
      />
    </ScrollView>
  )
}