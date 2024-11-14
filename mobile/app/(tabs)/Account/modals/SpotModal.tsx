import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Spot } from '@/constants/DBDatatypes';
import { Router } from 'expo-router';
import spotApi from '@/api/axios/routes/spot';
import DropDownPicker from 'react-native-dropdown-picker';



export default function SpotModal() {
  const [spotPosition, setSpotPostion] = useState("")
  const [spotLengthCM, setSpotLengthCM] = useState("")
  const [spotWidthCM, setSpotWidthCM] = useState("")
  const [spotPriceExtra, setSpotPriceExtra] = useState("")

  const [spotPricePrSquareMeter, setSpotPricePrSquareMeter] = useState("")
  const [spotSpotType, setSpotSpotType] = useState("")
  const [spotOccupied, setSpotOccupied] = useState(false)
  

    async function createSpot(){
        try{
          const spotData: Spot = {
            position: spotPosition,
            lengthCM: parseInt(spotLengthCM),
            widthCM: parseInt(spotWidthCM),
            priceExtra: 0, //Implement some logic to handle this
            pricePrSquareMeter: parseInt(spotPricePrSquareMeter),
            spotType: 1, //No clue, Ask frank
            occupied: false // Assume a spot is not taken upon creation, discuss with frank
        }
        const response = spotApi.spot(spotData);
        
        console.log(spotData)
        }
        catch{

        }

        
    }

  return (
    <View>
        <TextInput
        style={styles.input}
        placeholder="Position"
        value={spotPosition}
        onChangeText={(text) => setSpotPostion(text)}
        />


        <TextInput
        style={styles.input}
        placeholder="Længde(CM)"
        value={spotLengthCM}
        keyboardType='number-pad'
        onChangeText={(text) => setSpotLengthCM(text)}
        />
                <TextInput
        style={styles.input}
        placeholder="Længde(CM)"
        value={spotWidthCM}
        keyboardType='number-pad'
        onChangeText={(text) => setSpotWidthCM(text)}
        />

        <TextInput
        style={styles.input}
        placeholder="Extra pris(valgfri)"
        value={spotPriceExtra}
        keyboardType='number-pad'
        onChangeText={(text) => setSpotPriceExtra(text)}
        />

<TextInput
        style={styles.input}
        placeholder="Pirs per kvadrat meter"
        value={spotPricePrSquareMeter}
        keyboardType='number-pad'
        onChangeText={(text) => setSpotPricePrSquareMeter(text)}
        />

<TextInput
        style={styles.input}
        placeholder="Spot type"
        value={spotPriceExtra}
        keyboardType='number-pad'
        onChangeText={(text) => setSpotSpotType(text)}
        />




        <Button title="Opret Spot" onPress={createSpot} />

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
  container: {
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
