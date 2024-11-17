import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Colors } from "@/constants/Colors";
import { Link, router } from 'expo-router';



export default function EventCard({id, imagesrc = "", title="ads"} : {id: number, imagesrc: string, title?: string}) {

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
      <Pressable onPress={() => {
        router.push({pathname: '../Shop/[id]', params: {id}})
      }}>
        <View style={styles.cardcontainer}>
          <View style={styles.imagecontainer}>{ImageIdentifyer()}</View>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.price}>fra DKK 123.50</Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '100%'
  },
  imagecontainer: {
    overflow: 'hidden',
    width: '100%',
    height: 150,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  text: {

  },
  price: {
    color: Colors.light.tint
  }

})