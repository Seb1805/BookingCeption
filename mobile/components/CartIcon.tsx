import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Cart } from '@/constants/OtherDatatypes'
import { router, useFocusEffect } from 'expo-router'

export default function CartIcon({color, showCounter = false}: {color: string, showCounter? : boolean}) {
  const [cart, setCart] = useState<Cart | null>(null)

  useFocusEffect(
    useCallback(() => {
    GetCart()
    
  }, []))

  async function GetCart() {
    try {
      const cart = await AsyncStorage.getItem('cart')
    if(typeof(cart) == "string") {
      
      setCart(() => JSON.parse(cart))
    }
    else {
      setCart(() => null)
    }
    } catch (error) {
      console.log(error);
    }
  }

  function CountCartItems() {
    let itemCounter = 0;
    if (cart !== null) {
      cart?.cartItems.map((item) => (itemCounter += item.amount));
      return (
        <View style={styles.cartCounter}>
          <Text style={styles.cartCounterText}>{itemCounter}</Text>
        </View>
      );
    }
  }
  
  return (
    <Pressable onPress={() => {router.push('/Shop')}}>
      <View style={styles.cart}>
        <Feather name="shopping-cart" size={28} color={color} />
        {showCounter && CountCartItems()}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cart: {
    // margin: 8
  },
  cartCounter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: -8,
    padding: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f50'

  },
  cartCounterText: {
    fontSize: 12,
    color: '#fff'
  }
})