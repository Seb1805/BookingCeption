import { View, Text, ScrollView } from 'react-native'
import BoughtTicketCard from '@/components/BoughtTicketCard'
import React from 'react'

export default function BoughtList() {
  return (
    <ScrollView>
      <Text>BoughtList</Text>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc=''/>
      <BoughtTicketCard imagesrc='https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg'/>
      <BoughtTicketCard imagesrc=''/>
    </ScrollView>
  )
}