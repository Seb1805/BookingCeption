import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Campaign } from '@/constants/DBDatatypes'
import campaignApi from '@/api/axios/routes/campaign'
import { useLocalSearchParams } from 'expo-router'
import Constants from 'expo-constants'


export default function CampaignDetailsScreen() {
  const [campaignData, setcampaignData] = useState<Campaign>()
  const {id} = useLocalSearchParams<{id: string}>();

  // useEffect(() => {
  //   campaignApi.getCampaignSingle(parseInt(id))
  // })
  // function ImageIdentifyer() {
  //   if (campaignData?.coverImage.substring(0,4) == "http") {
  //     return (
  //       <Image source={{uri: campaignData?.coverImage}} style={styles.image} />
  //     )
  //   }

  //   return (
  //     <Image source={require('@/assets/images/placeholders/placeholder-ticket.jpg')} style={styles.image} />
  //   )
  // }
  return (
    <ScrollView>
      <Text>[id] - {id} - {typeof(id)}</Text>
      <Text>cover image, desription, tickets list</Text>
      
      <View style={styles.imagecontainer}> 

      </View>
      <Text>Description</Text>


      <Text>Tickets</Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  imagecontainer: {
    overflow: 'hidden',
    width: '100%',
    height: 150,
  },
  image: {
    height: "100%",
    width: "100%",
  },
})