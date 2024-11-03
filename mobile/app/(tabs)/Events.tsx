import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import EventCard from '@/components/EventCard'
import Searchbar from '@/components/Searchbar'
import { Colors } from '@/constants/Colors';
import CartIcon from '@/components/CartIcon';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Events() {
  const [search, setSearch] = useState('');
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerbar}>
      <Searchbar data={search} setData={setSearch} placeholderData="Søg her" />
        <CartIcon />
      </View>
      <ScrollView>
        <View>
          <EventCard imagesrc="" />
          <EventCard imagesrc="https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg" />
          <EventCard imagesrc="" />
          <EventCard imagesrc="" />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingVertical: 12,
    backgroundColor: Colors.light.primary,
  },
  cart: {
    margin: 8
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  searcimage: {
    paddingHorizontal: 10
  }
})