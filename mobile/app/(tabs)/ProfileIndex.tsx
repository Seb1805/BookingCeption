import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function index() {

  
  return (
    <View>

<Link href="/Profile/CreateLocation" >
      <Text style={{padding: 12, margin: 3}}>Create Location side</Text>
</Link>

      <Text>Liste af kommende messer brugeren har købt adgang til</Text>
    </View>
  )
}