import { View, Text } from 'react-native'
import TicketCard from '@/components/TicketCard'
import React from 'react'

export default function BoughtList({ navigation } : {navigation: any}) {
  return (
    <View>
      <Text>BoughtList</Text>
      <TicketCard />
    </View>
  )
}