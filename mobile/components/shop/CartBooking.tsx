import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ticket } from '@/constants/DBDatatypes'

export default function CartBooking({item, amount} : {item: Ticket, amount: number}) {

  function DatestringToDate(datastring: string) {
    return new Date(datastring)
  }
  function TimestringToDateTime(datastring: string) {
    return new Date('1990-01-07T' + datastring)
  }

  return (
    <View style={styles.bookingList}>
      <View style={styles.textArea}>
        <Text style={styles.title}>{item.campaignName} - {item.name}</Text>
        <Text style={styles.location}>{item.locationName}</Text>
        <Text style={styles.location}>{`${item.address}, ${item.city}`}</Text>
        <Text style={styles.date}>{DatestringToDate(item.validDateStart).toLocaleDateString('default', {day: '2-digit', month: 'short', year: '2-digit'} )}  -  {TimestringToDateTime(item.validTimeStart).toLocaleTimeString('default', {hour: 'numeric', minute: '2-digit'})}</Text>
      </View>
      <View style={styles.amount}>
        {amount > 1 && <Text style={styles.priceAreaText}>{`${item.price}`}</Text>}
      </View>
      <View style={styles.amount}>
        <Text>{amount}</Text>
      </View>
      <View>
        <Text style={styles.priceAreaText}>{amount*item.price}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bookingList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 4,
    
  },
  textArea: {
    flexGrow: 1,
  },
  title: { 
    fontWeight: 'bold'
  },
  location: {},
  date: {},
  priceAreaText: {textAlign: 'right'},
  amount: {
    paddingHorizontal: 15
  }
})