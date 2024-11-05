import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Location } from '@/constants/DBDatatypes';
import locationApi from '@/api/axios/routes/location';
import { router } from 'expo-router';

export default function CreateLocation() {


  const [locationName, setlocationName] = useState("");
  const [lokationAddress, setlocationAddress] = useState("");
  const [lokationOrganizerId, setlocationOrgaznierId] = useState("");


  async function createLocation() {
    try {
      const locationData: Location = {
        locationName: locationName,
        address: lokationAddress,
        organizerId: 1
      };
      // const response = await axios.post('/api/v1/locations', locationData);
      const response = ( await locationApi.location(locationData))
      //return response.data;
      router.back()
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }



  return (
    <View>
      <Text>CreateLocation</Text>
      <TextInput
        style={styles.input}
        placeholder="Navn"
        value={locationName}
        onChangeText={(text) => setlocationName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={lokationAddress}
        onChangeText={(text) => setlocationAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer"
        value={lokationOrganizerId}
        onChangeText={(text) => setlocationOrgaznierId(text)}
        keyboardType='numeric'
      />

      <Button title="Opret lokation" onPress={createLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
