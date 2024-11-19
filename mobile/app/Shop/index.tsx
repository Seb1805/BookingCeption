import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import CartBooking from '@/components/shop/CartBooking'
import { Cart } from '@/constants/OtherDatatypes'
import { Ticket } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'

type ticketWithAmount = {
  ticket : Ticket,
  amount: number
}

export default function index() {

  const [cartFull, setcartFull] = useState<ticketWithAmount[]>()

  useFocusEffect(
    useCallback(() => {
    GetCartData().then((cart) => setcartFull(() => cart))
  }, []))

  async function GetCartData() {
    const cartData = await AsyncStorage.getItem('cart')
    let tickets: ticketWithAmount[] = [];
    if(cartData) {
      const cartDataObj: Cart = JSON.parse(cartData)
      // cartDataObj.cartItems.map( async (item) => {
      //   const data = await ticketApi.getTicket(item.ticketId)
      //   tickets.push({data, item.amount})
      // })
    }
    return tickets;
  }

  function OrderConfirm() {

  }

  return (
    <ScrollView>
      <Text>CartPage</Text>
      
      <CartBooking id={1} amount={2} />

      {/* {cartFull?.map((item, key) => {
        return (
          <CartBooking item={item.ticket} amount={item.amount} key={key} />
        )
      })} */}
      <Pressable style={styles.Accept} onPress={OrderConfirm}>
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