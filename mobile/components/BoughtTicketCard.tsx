import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function TicketCard({imagesrc = ""} : {imagesrc: string}) {

  function ImageIdentifyer() {
    if (imagesrc.substring(0,4) == "http") {
      return (
        <Image source={{uri: imagesrc}} style={styles.image} />
      )
    }

    return (
      <Image source={require('@/assets/images/placeholders/placeholder-ticket.jpg')} style={styles.image} />
    )
  }

  return (
    <View style={styles.cardcontainer}>
      <View style={styles.imagecontainer}>
        {ImageIdentifyer()}
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
    margin: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1',
    gap: 10,
  },
  imagecontainer: {
    display: 'flex',
    overflow: 'hidden',
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: "100%",
    height: '100%'
  }
})