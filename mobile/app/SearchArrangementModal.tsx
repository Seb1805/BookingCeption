import { View, Text, ScrollView, TextInput, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import EventCard from '@/components/EventCard'

const datasdf = [
  {
    title: 'Viby',
    image: "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg"
  },
  {
    title: 'Aarhus',
    image: "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg"
  },
  {
    title: 'Randers',
    image: "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg"
  },
  {
    title: 'Aalborg',
    image: "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg"
  },
]

export default function SearchLocationModal() {
  const [searchinput, setSearchinput] = useState('')
  return (
    <View style={{flex: 1}}>
      <View>
        <TextInput style={styles.searchinput} placeholder='Søg' placeholderTextColor='#888' value={searchinput} onChangeText={setSearchinput}/>
      </View>
      <ScrollView>
        <FlatList data={datasdf} renderItem={({item}) => {
            if((item.title.toLowerCase()).includes(searchinput.toLowerCase())) {
              return <EventCard title={item.title} imagesrc={item.image} />
            } else if(searchinput.length == 0) {return <EventCard title={item.title} imagesrc={item.image} />}
              else return null
        }}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchinput: {
    paddingVertical: 12,
    fontSize: 24,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  }
})