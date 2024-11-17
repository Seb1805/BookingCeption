import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Ticket } from '@/constants/DBDatatypes'

export default function CartBooking({id, item, amount} : {id: number, item?: Ticket, amount: number}) {
  return (
    <View style={styles.bookingList}>
      <View style={styles.textArea}>
        <Text style={styles.title}>id: {id} - Campaign - Ticket title</Text>
        <Text style={styles.location}>Location</Text>
        <Text style={styles.date}>date start - time</Text>
      </View>

      <View>
        <Text style={styles.priceAreaText}>{amount > 0 && `${amount} x `}price</Text>
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
    flexGrow: 1,
  },
  textArea: {},
  title: { 
    fontWeight: 'bold'
  },
  location: {},
  date: {},
  priceAreaText: {textAlign: 'right'}
})