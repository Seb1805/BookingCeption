import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function TicketCard() {
  return (
    <View style={styles.cardcontainer}>
      <View style={styles.imagecontainer}>
        <Image style={styles.image} />
      </View>
      <View>
        <View><Text>Labels</Text></View>
        <Text>TicketCard</Text>
        <Text>Address</Text>
        <Text>dato</Text>
        <Text>Tidspunkt</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardcontainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1'
  },
  imagecontainer: {
    overflow: 'hidden',
    height: '100%',
    aspectRatio: '1/1'
  },
  image: {
    objectFit: 'cover'
  }

})