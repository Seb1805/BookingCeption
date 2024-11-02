import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'

export default function CartIcon() {
  return (
    <View style={styles.cart}>
      <FontAwesome name="shopping-cart" size={48} color={"#ddd"} />
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    margin: 8
  },
})