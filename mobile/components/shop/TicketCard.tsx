import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { Colors } from '@/constants/Colors'

export default function TicketCard() {
  return (
    <View style={styles.ticketCardContainer}>
      <View>
        <Text>Month initials</Text>
        <Text>date day</Text>
      </View>
      <View>
        <Text>dag (ons, tors etc.) 🞄 timeStart  eller  info</Text>
        <Text style={[styles.textBold]}>By</Text>
        <Text style={[styles.textBold]}>location name</Text>
        <Text>title</Text>
      </View>

      <AntDesign size={16} name="right" color={Colors.light.text} />
    </View>
  )
}

const styles = StyleSheet.create({
  ticketCardContainer: {
    display: 'flex',
  },
  textBold: {
    fontWeight: 'bold'
  },
})