import { View, Text, ScrollView } from 'react-native'
import BoughtTicketCard from '@/components/BoughtTicketCard'
import React from 'react'

export default function BoughtList() {
  return (
    <ScrollView>
      <Text>BoughtList</Text>
      <BoughtTicketCard />
      <BoughtTicketCard />
      <BoughtTicketCard />
    </ScrollView>
  )
}