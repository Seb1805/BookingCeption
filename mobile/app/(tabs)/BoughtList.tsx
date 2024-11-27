import { View, Text, ScrollView, StyleSheet } from 'react-native'
import BoughtTicketCard from '@/components/BoughtTicketCard'
import React, { useCallback, useState } from 'react'
import Constants from 'expo-constants'
import { useFocusEffect } from 'expo-router'
import { TicketBought } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import bookingApi from '@/api/axios/routes/booking'


export default function BoughtList() {
  const [ticketsOwned, setticketOwned] = useState<TicketBought[]>([])

  useFocusEffect(
    useCallback(() => {
      // get bought tickets from backend (update if there's internet)
      // bought tickets localstorage should also be updated when new tickets are bought
      async function getData() {
        
        try {
          const response = await bookingApi.getBoughtTickets();
          if (response.status === 200) {
            AsyncStorage.setItem("boughtlist", JSON.stringify(response.data.bought_tickets));
            setticketOwned(() => response.data.bought_tickets);
          } else {
            const localdata = await AsyncStorage.getItem("boughtlist");
            if (localdata) {
              setticketOwned(() => JSON.parse(localdata));
            }
          }
        } catch (error) {
          console.log("Couldn't connect to servers");
          const localdata = await AsyncStorage.getItem("boughtlist");
            if (localdata) {
              setticketOwned(() => JSON.parse(localdata));
            }
        }
         
      }

      getData()
    }, [])
  )


  

  return (
    <View style={{height: '100%'}}>
        <View style={{marginTop: Constants.statusBarHeight}}></View>
        {/* <BoughtTicketCard imagesrc=''/>
        <BoughtTicketCard imagesrc=''/> */}
        
        {ticketsOwned.length > 0 ? (
          <ScrollView> 
            <Text>{ticketsOwned.length}</Text>
            {ticketsOwned?.map((item, key) => {
          return (
            <BoughtTicketCard ticket={item} imagesrc='' key={key}/>
          )
        })} 
        </ScrollView>
        ) : (
          
            <Text style={styles.noticketstext}>
              Ingen billetter at vise
            </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  noticketscontainer: {
    position: 'absolute',
    top: 0, 
    bottom: 0,
    marginHorizontal: 0,
    marginVertical: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noticketstext: {
    top: 0, 
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
    color: '#777',
    width: '100%'
  }
})