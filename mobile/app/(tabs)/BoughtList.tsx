import { View, Text, ScrollView } from 'react-native'
import BoughtTicketCard from '@/components/BoughtTicketCard'
import React, { useCallback, useState } from 'react'
import Constants from 'expo-constants'
import { useFocusEffect } from 'expo-router'
import { TicketBought } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function BoughtList() {
  const [ticketsOwned, setticketOwned] = useState<TicketBought[]>([])

  useFocusEffect(
    useCallback(() => {
      // get bought tickets from backend (update if there's internet)
      // bought tickets localstorage should also be updated when new tickets are bought
      
      getData().then(data => {
        setticketOwned(() => data)
      })
    }, [])
  )


  async function getData() {
    const temp = await AsyncStorage.getItem('boughtlist')
    if(temp) {
      return JSON.parse(temp)
    }
    return []
  }

  return (
    <ScrollView>
      <View style={{marginTop: Constants.statusBarHeight}}></View>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      {ticketsOwned?.map((item, key) => {
        return (
          <BoughtTicketCard ticket={item} imagesrc='' key={key}/>
        )
      })}
    </ScrollView>
  )
}