import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TicketBought } from '@/constants/DBDatatypes'

export default function TicketCard({ticket, imagesrc = ""} : {ticket?: TicketBought,imagesrc: string}) {

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
        <Text style={styles.fontBold}>TicketCard {ticket?.name}</Text>
        <Text>{ticket?.campaignName}</Text>
        <Text>Address {ticket?.address}</Text>
        <Text>dato start ( - dato end) {ticket?.validDateEnd} {ticket?.validDateEnd !== ticket?.validDateStart && ` - ${ticket?.validDateEnd}` }</Text>
        <Text>Tidspunkt {ticket?.validTimeStart}</Text>
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
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})