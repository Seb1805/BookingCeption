import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

export default function CreateLocation({ navigation } : {navigation: any}) {

  const [lokationName, setlocationName] = useState("")
  const [lokationAddress, setlocationAddress] = useState("")

  function HandleLocationCreation() {

  }

  return (
    <View>
      <Text>CreateLocation</Text>
      <TextInput
        style={styles.input}
        placeholder="Navn"
        value={lokationName}
        onChangeText={(text) => setlocationName(text)}
      />
            <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={lokationAddress}
        onChangeText={(text) => setlocationAddress(text)}
      />

      <Button title="Opret lokation" onPress={HandleLocationCreation} />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
})