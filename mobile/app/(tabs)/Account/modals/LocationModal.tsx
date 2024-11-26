import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { Location } from '@/constants/DBDatatypes';
import locationApi from '@/api/axios/routes/location';
import { router } from 'expo-router';

export default function CreateLocation() {


  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [locationZip, setLocationZip] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationOrganizerId, setLocationOrgaznierId] = useState("");


  async function createLocation() {
    try {
      const locationData: Location = {
        locationName: locationName,
        address: locationAddress,
        city: `${locationZip} ${locationCity}`,
        organizerId: 1 //TODO: IMPLEMENT CORRECTLY
      };
      // const response = await axios.post('/api/v1/locations', locationData);
      const response = ( await locationApi.location(locationData));
      //return response.data;
      router.back();
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
        onChangeText={(text) => setLocationName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={locationAddress}
        onChangeText={(text) => setLocationAddress(text)}
      />
      <TextInput 
      style={styles.input}
      inputMode='numeric'
      placeholder="Postnummer"
      value={locationZip}
      onChangeText={(text) => setLocationZip(text)}
      />
      <TextInput 
      style={styles.input}
      placeholder="By"
      value={locationCity}
      onChangeText={(text) => setLocationCity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Organizer"
        value={locationOrganizerId}
        onChangeText={(text) => setLocationOrgaznierId(text)}
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
