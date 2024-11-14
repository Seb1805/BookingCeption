import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CartIcon({color}: {color: string}) {
  const [cartItems, setCartItems] = useState<String>('')
  
  useEffect(() => {
    GetCart()
  }, [cartItems])

  async function GetCart() {
    const cart = await AsyncStorage.getItem('cart')
    if(typeof(cart) == "string" && cartItems !== cart) {
      setCartItems(() => cart)
    }
    console.log(cartItems);
  }
  
  return (
    <View style={styles.cart}>
      <Feather name="shopping-cart" size={28} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  cart: {
    margin: 8
  },
})