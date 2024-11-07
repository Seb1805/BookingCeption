import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import PlusEntity from '@/components/PlusEntity'
import { router } from 'expo-router'
import CampaignProfile from '@/components/CampaignProfile'

const datalocations = [
  {
    id: 12,
    image: '',
    title: "Bil messe",
    address: "Thomas Jensens Allé 2, 8000 Aarhus",
    active: false
  },
  {
    id: 16,
    image: 'https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg',
    title: "tech messe",
    address: "fyensgade 1, 8900 randers C",
    active: true
  },
  {
    id: 13,
    image: '',
    title: "skak messe",
    address: "margrethepladsen 2-4, 8000 aarhus",
    active: true
  },
]

export default function Campaigns() {
  return (
    <>
    <ScrollView style={{flex: 1, margin: 8}}>
      {datalocations.map((item, key) => {return (
        <CampaignProfile imagesrc={item.image} title={item.title} address={item.address} active={item.active}/>
      )})}
    </ScrollView>
    <PlusEntity func={() => {router.navigate('/(tabs)/Account/modals/CampaignModal')}}/>

    </>
  )
}