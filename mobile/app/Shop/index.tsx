import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useCallback, useState } from 'react'
import CartBooking from '@/components/shop/CartBooking'
import { Ticket } from '@/constants/DBDatatypes'
import { BookingCampaign } from '@/constants/DBDatatypes'
import bookingApi from '@/api/axios/routes/booking'
import ticketApi from '@/api/axios/routes/ticket'
import userApi from '@/api/axios/routes/users'
import { BookingExtended } from '@/constants/DBDatatypes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router, useFocusEffect } from 'expo-router'
import { Cart, CartItem } from '@/constants/OtherDatatypes'
import Toast from 'react-native-toast-message'

type ticketWithAmount = {
  ticket : Ticket,
  amount: number
}

export default function index() {
  //Fix undefined by initialize as array instead of undefined
  const [cartFull, setcartFull] = useState<ticketWithAmount[]>([])

  useFocusEffect(
    useCallback(() => {
      GetCartData()
    }, [])
  )


  async function GetCartData() {
    const cartData = await AsyncStorage.getItem('cart');
    
    let tickets = [];
  
    if(cartData) {
      const cartObj = JSON.parse(cartData);
      // Use Promise.all to wait for all API calls to complete
      tickets = await Promise.all(
        cartObj.cartItems.map(async (x: CartItem) => {
          try{
            const response = await ticketApi.getTicketExtended(x.ticketId)
            if(response.status === 200) {
              const data = response.data.ticket;
              const theShit : ticketWithAmount = {
                ticket: data,
                amount: x.amount
              };
              return theShit;
            } else {
              throw new Error(`Failed to fetch ticket data for ${x.ticketId}`);
            }
          }
          catch(error){
            console.log("API connection: ",error)
          }

        })
      );
    }
    setcartFull(() => tickets)
  }
  

  async function OrderConfirm() {
    try {
      const loggedinCheck = await userApi.getUserData()
      if(loggedinCheck.status !== 200) {
        router.navigate('/(auth)/Login')
      }
    } catch (error) {
      console.log('Not logged in');
      router.navigate('/(auth)/Login')
    }

    try {
    if (!cartFull.length) 
      {
        console.log("Skrald")
        return;
      }
    const bc: BookingCampaign[] = cartFull.map(item => ({
      ticketId: item.ticket.ticketId,
      ticketAmount: item.amount,
      sumPrice: 1
    }));

    function dateFix() {
      const date = new Date();
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    }

    const bookingExtendItem: BookingExtended = {
      userId: 1,
      bookingStatusId: 1,
      dateCreated: dateFix(),
      bookingCampaigns: bc
    };
    console.log("Iam booking extended",bookingExtendItem)
    const bk = await bookingApi.bookingOrder(bookingExtendItem)
    console.log("wohoo")
    Toast.show({
      type: 'success',
      text1: 'Tak for dit køb',
    })
    clearCart()
    router.back()
  }
  catch(error)
  {
    console.log(error)
  }
  }
  const handleQuantityChange = useCallback((index: number, isIncrementing: boolean) => {
    const newCart = [...cartFull];
    newCart[index].amount += isIncrementing ? 1 : -1;
    if(newCart[index].amount == 0) {
      newCart.splice(index,1)
    }
    
    setcartFull(() => newCart);
    updateCartInStorage(newCart);
  }, [cartFull]);
  
  async function CartDelete() {
    await AsyncStorage.removeItem('cart')
  }

  const updateCartInStorage = async (newCart: ticketWithAmount[]) => {
    if(newCart.length == 0) {
      CartDelete()
    } else {
      const cartData = {
        cartItems: newCart.map(item => ({ ticketId: item.ticket.ticketId, amount: item.amount }))
      };
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
    }
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('cart');
    setcartFull(() => [])  
  };

  if(cartFull.length > 0) {
    return (
      <ScrollView>
        {cartFull?.map((item, key) => (
          <CartBooking 
            key={key} 
            item={item.ticket} 
            amount={item.amount} 
            onQuantityChange={(isIncrementing) => handleQuantityChange(key, isIncrementing)}
          />
        ))}
        
        <Pressable style={styles.Accept} onPress={() => OrderConfirm()}>
          <Text style={styles.AcceptText}>Accepter bestilling</Text>
        </Pressable>
        
        {/* Confirm clear */}
        <Pressable style={styles.ClearCart} onPress={() => {
          Alert.alert("Ryd kurv", "Er du sikker du vil tømme kurven?", [
            {
              text: "Nej",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Ja",
              onPress: () => clearCart()
            },
          ]);
        }}>
          <Text style={styles.ClearCartText}>Clear Cart</Text>
        </Pressable>
  
        {/* No conformation */}
        {/* <Pressable style={styles.ClearCart} onPress={() => clearCart() }>
          <Text style={styles.ClearCartText}>Clear Cart</Text>
        </Pressable> */}
        
        <Toast />
      </ScrollView>
    );
  }
  else { 
    return (
      <Text style={styles.noticketstext}>
        Ingen billetter i kurven
      </Text>
    )
  }
};


const styles = StyleSheet.create({
  noticketstext: {
    top: 0, 
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
    color: '#777',
    width: '100%'
  },
  Accept: {
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 24,
    margin: 8,
    backgroundColor: '#0a0',
    marginTop: 16,
    borderRadius: 8,
  },
  AcceptText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 0,
    margin: 0,
    color: '#fff',
  },
  ClearCart: {
    justifyContent: 'center',
    paddingVertical: 12,
    minHeight: 24,
    margin: 8,
    backgroundColor: '#d00',
    marginTop: 16,
    borderRadius: 8,
  },
  ClearCartText: {
    textAlign: 'center',
    fontSize: 18,
    padding: 0,
    margin: 0,
    color: '#fff',
  }
});