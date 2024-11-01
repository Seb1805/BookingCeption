import { View, Text, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import EventCard from '@/components/EventCard'
import Searchbar from '@/components/Searchbar'


export default function Events() {
  const [search, setSearch] = useState('');
  return (
      <View style={{flex: 1}}>  
        <Searchbar data={search} setData={setSearch} placeholderData='Søg her' />
    <ScrollView>
      <View>
        <EventCard imagesrc=""/>
        <EventCard imagesrc='https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg'/>
        <EventCard imagesrc=""/>
        <EventCard imagesrc=""/>
      </View>
    </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10
  }
})