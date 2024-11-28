import { View, Text, ScrollView, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import ButtonOwn from '@/components/ButtonOwn'
import { router, useFocusEffect } from 'expo-router'
import PlusEntity from '@/components/PlusEntity'
import locationApi from '@/api/axios/routes/location'
import { LocationsOwn } from '@/constants/DBDatatypes'

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
  const [ownLocations, setOwnLocations] = useState<LocationsOwn[]>([])

  useFocusEffect(
    useCallback(() => {
      FillLocationList()
    }, [])
  )

  async function FillLocationList() {
    try {
      const response = await locationApi.getMyLocations()
    if(response.status == 200) {
      setOwnLocations(() => response.data.locations)
    }
    } catch (error) {
      console.log("Error getting own locations: ", error);
     return; 
    }
  }

  return (
    <>
    <ScrollView style={{flex: 1, margin: 8}}>
      {ownLocations.map((item, key) => {return (
        <View key={key}>
          <Text>
            {item.locationName ? item.locationName : "Intet navn"}
          </Text>
          <Text>
            {item.address}
          </Text>
        </View>
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