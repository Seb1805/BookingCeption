import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function CampaignProfile({imagesrc = '', title, address, active} : {imagesrc?: string, title: string, address: string, active: boolean}) {

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
    <View style={[styles.campaignContainer]}>
      <View style={styles.imageContainer}>
        {ImageIdentifyer()}
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.area}>area</Text>
        <Text style={styles.dates}>dates</Text>
        <Text style={styles.active}>active</Text>
      </View>
      {!active ? <View style={styles.grayOverlay} /> : <View></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  campaignContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 125,
    margin: 8,
  },
  grayOverlay: {
    ...StyleSheet.absoluteFillObject,
     backgroundColor: 'rgba(0,0,0,0.3)',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '35%',
    marginRight: 8
  },
  image: {
    objectFit: 'cover',
    height: '100%',
    maxWidth: '100%'
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  address: {
    textTransform: 'capitalize'
  },
  area: {},
  dates: {},
  active: {},
})