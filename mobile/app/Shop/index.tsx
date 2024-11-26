import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import CartBooking from '@/components/shop/CartBooking'
import { Ticket } from '@/constants/DBDatatypes'
import { BookingCampaign } from '@/constants/DBDatatypes'
import bookingApi from '@/api/axios/routes/booking'
import ticketApi from '@/api/axios/routes/ticket'
import userApi from '@/api/axios/routes/users'
import { BookingExtended } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useFocusEffect } from 'expo-router'
import { Cart, CartItem } from '@/constants/OtherDatatypes'

type ticketWithAmount = {
  ticket : Ticket,
  amount: number
}

export default function index() {
  //Fix undefined by initialize as array instead of undefined
  const [cartFull, setcartFull] = useState<ticketWithAmount[]>([])

  useFocusEffect(
    useCallback(() => {
      GetCartData().then((cart) => setcartFull(cart))
    }, [])
  )

  async function GetCartData() {
    const cartData = await AsyncStorage.getItem('cart');
    
    let tickets = [];
  
    if(cartData) {
      const cartObj = JSON.parse(cartData);
      console.log("Iam cartObj",cartObj)
      // Use Promise.all to wait for all API calls to complete
      tickets = await Promise.all(
        cartObj.cartItems.map(async (x: CartItem) => {
          console.log("Before api");
          console.log("Iam x",x)
          try{
            const response = await ticketApi.getTicket(x.ticketId)
            console.log("Iam code",response.status)
            if(response.status === 200) {
              const data = response.data;
              const theShit = {
                ticket: data,
                amount: x.amount
              };
              console.log("theShit", theShit);
              return theShit;
            } else {
              console.log("Not a status code 200, but trash");
              console.log(response.status);
              throw new Error(`Failed to fetch ticket data for ${x.ticketId}`);
            }
          }
          catch(error){
            console.log("HELLO I AM FAT ERROR",error)
          }

        })
      );
    }
    console.log("The ticket i return",tickets);
    return tickets;
  }
  
  

  async function OrderConfirm() {
    console.log(cartFull)
    if (!cartFull.length) 
      {
        console.log("Skrald")
        return;
      }
    const response = await userApi.getUserData()
    const data = response.data;
    const bc: BookingCampaign[] = cartFull.map(item => ({
      ticketId: item.ticket.ticketId,
      ticketAmount: item.amount,
      sumPrice: 1
    }));

    const bookingExtendItem: BookingExtended = {
      userId: data.userId ?? 1,
      bookingStatus: 1,
      dateCreated: new Date(),
      bookingCampaigns: bc
    };

    const bk = await bookingApi.bookingOrder(bookingExtendItem)
    console.log("wohoo")
    router.back()
  }

  return (
    <ScrollView>
      <Text>CartPage</Text>
      
      <CartBooking id={1} amount={2} />
      {cartFull?.map((item, key) => {
        return (
          <CartBooking id={item.ticket.ticketId} item={item.ticket} amount={item.amount} key={key}/>
        )
      })}

      {/* {cartFull?.map((item, key) => {
        return (
          <CartBooking item={item.ticket} amount={item.amount} key={key} />
        )
      })} */}
      <Pressable style={styles.Accept} onPress={() => OrderConfirm()}>
        <Text style={styles.AcceptText}>Accepter bestilling</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  Accept: {
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 24,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#0a0'
  },
  AcceptText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: '#fff'
  }
})