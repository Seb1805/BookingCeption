import { View, Text } from 'react-native'
import React from 'react'

export default function Events({ navigation } : {navigation: any}) {
  return (
    <View>
      <View>
        <Text>Events page</Text>  
        <Text>Filtering</Text>  
      </View>
      <View>
        <Text>List af tilfældige messer, Evt. bassered på afstand fra brugerens addresse</Text>
      </View>
    </View>
  )
}