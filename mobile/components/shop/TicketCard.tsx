import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'
import { Cart, Ticket } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TicketCard({item} : {item: Ticket}) {

  function DatestringToDate(datastring: string) {
    return new Date(datastring)
  }

  function TimestringToDateTime(datastring: string) {
    return new Date('1990-01-07T' + datastring)
  }

  async function AddToCart(selectedTicket: number) {
    const value: string | null = await AsyncStorage.getItem('cart');
    
    if(!value) {
      const cartItems: Cart = {lastUpdate: new Date().toLocaleDateString(), cartItems: [{ticketId: selectedTicket, amount: 1}]}
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems))
    }
    else {
      let excistingCart: Cart = JSON.parse(value)

      let dateCheck = new Date()
      dateCheck.setDate((dateCheck.getDate() - 2))
      if(new Date(excistingCart.lastUpdate) < dateCheck) {
        const cartItems: Cart = {lastUpdate: new Date().toLocaleDateString(), cartItems: [{ticketId: selectedTicket, amount: 1}]}
        await AsyncStorage.setItem('cart', JSON.stringify(cartItems))
        return;
      }

      const moretickets = excistingCart.cartItems.findIndex((item) => item.ticketId == selectedTicket)

      if(moretickets >= 0) {
        excistingCart.cartItems[moretickets].amount++
      }
      else {
        excistingCart.cartItems.push({ticketId: selectedTicket, amount: 1})
      }
      await AsyncStorage.setItem('cart', JSON.stringify(excistingCart))
    }    

  }

  return (
    <Pressable style={styles.ticketCardContainer} onPress={() => AddToCart(item.ticketId)}>
      <View style={[styles.vertical, styles.ticketdate]}>
        <Text style={[styles.dateday, styles.textBold]}>{DatestringToDate(item.validDateStart).toLocaleDateString('default', {day: '2-digit'})}</Text>
        <Text>{DatestringToDate(item.validDateStart).toLocaleDateString('default', {month: 'short'} )} {DatestringToDate(item.validDateStart).getFullYear()}</Text>
        <Text>{DatestringToDate(item.validDateStart).toLocaleString('dk-DK', {weekday: 'short'})} {TimestringToDateTime(item.validTimeStart).toLocaleTimeString('default', {hour: 'numeric', minute: '2-digit'})}</Text>
      </View>
      <View style={[styles.vertical, styles.ticketinformation]}>
        <View>

        <Text style={[styles.textBold, styles.title]}>{item.name}</Text>
        <Text>{item.location.city}</Text>
        <Text>{item.location.locationName}</Text>
        </View>
        <View>
          <Text style={[styles.textBold, styles.price]}>{item.price} DKK</Text>
        </View>
      </View>

      <View style={[styles.vertical, styles.linkArrow]}>
        <AntDesign size={16} name="right" color={Colors.light.textInverse} />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  ticketCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 4,
    overflow: 'hidden'
  },
  vertical: {
    display: 'flex',

  },
  ticketdate: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateday: {
    fontSize: 20,
    color: Colors.light.tint
  },
  ticketinformation: {
    marginVertical: 4,
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  textBold: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 16,
    textTransform: 'capitalize'
  },
  price: {
    marginTop: 8,
    color: Colors.light.tint
  },
  linkArrow: {
    paddingHorizontal: 2,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center'
  }
})