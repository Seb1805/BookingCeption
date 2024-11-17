import { View, Text, ScrollView } from 'react-native'
import BoughtTicketCard from '@/components/BoughtTicketCard'
import React from 'react'
import Constants from 'expo-constants'


export default function BoughtList() {
  return (
    <ScrollView>
      <View style={{marginTop: Constants.statusBarHeight}}></View>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
    </ScrollView>
  )
}