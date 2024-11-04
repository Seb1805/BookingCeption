import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather'

export default function CartIcon() {
  return (
    <View style={styles.cart}>
      <Feather name="shopping-cart" size={48} color={"#ddd"} />
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    margin: 8
  },
})