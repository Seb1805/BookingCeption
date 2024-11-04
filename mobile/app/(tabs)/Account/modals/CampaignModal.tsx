import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable, Platform } from 'react-native';
import axios from 'axios';
import { Location } from '@/constants/DBDatatypes';
import locationApi from '@/api/axios/routes/location';
import { router } from 'expo-router';
import DateTimePicker, {DateTimePickerEvent } from '@react-native-community/datetimepicker';



export default function CampaignModal() {
    const [lokationName, setlocationName] = useState("");
    const [lokationAddress, setlocationAddress] = useState("");
    const [lokationOrganizerId, setlocationOrgaznierId] = useState("");
    const [date,setDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [lokationDate, setLokationDate] = useState("")
  
    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    //What the fuck is the type - who knows?
    const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (event.type === 'set') {
          const currentDate = selectedDate || new Date();
          setDate(currentDate);

          if(Platform.OS === "android")
          {
            toggleDatePicker();
            setLokationDate(currentDate.toDateString())
          }
        } else {
          toggleDatePicker();
        }
      };
      

    async function createCampaign() {
      try {
        const locationData: Location = {
          locationName: lokationName,
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
          value={lokationName}
          onChangeText={(text) => setlocationName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Beksrivelse"
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

 

        <DateTimePicker mode='date' display='spinner' value={date} onChange={onDateChange}/>

        {!showPicker && (<Pressable onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Skralde dag. 1"
          editable={false}
          value={lokationDate}
          //onChangeText={(text) => setlocationOrgaznierId(text)}

            />

        </Pressable>



)}


        <Button title="Opret lokation" onPress={createCampaign} />
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