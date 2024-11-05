import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Pressable, Platform } from 'react-native';
import axios from 'axios';
import { Campaign, Location } from '@/constants/DBDatatypes';
import locationApi from '@/api/axios/routes/location';
import { router } from 'expo-router';
import DateTimePicker, {DateTimePickerEvent } from '@react-native-community/datetimepicker';



export default function CampaignModal() {
    const [campaignName, setlocationName] = useState("");

    const [campaignDate, setcampaignDate] = useState("")
    const [campaignDescription, setCampaignDescription] = useState("")
    const [campaignCoverImage, setCampaignCoverImage] = useState("")




    //Date picker stuff    
    const [dateStart,setDateStart] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)

    const [dateEnd,setDateEnd] = useState(new Date())
    
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    //What the fuck is the type - who knows?
    const onDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (event.type === 'set') {
          const currentDate = selectedDate || new Date();
          setDateStart(currentDate);

          if(Platform.OS === "android")
          {
            toggleDatePicker();
            setcampaignDate(currentDate.toDateString())
          }
        } else {
          toggleDatePicker();
        }
      };
      

    async function createCampaign() {

      try{
          const campaignData: Campaign = {
              name: campaignName,
              description: campaignDescription,
              cocverImage: campaignCoverImage,
              dateStart: dateStart,
              timeStart: timeStart,
              dateEnd: dateEnd,
              timeEnd: timeEnd,
              sectionId: 1, //Implement
              price: 100.00, //Implement

          }

          return campaignData
      }
      catch{

      }
      // try {
      //   const campaignData: Campaign = {
      //     name: 
      //   };
      //   // const response = await axios.post('/api/v1/locations', locationData);
      //   const response = ( await locationApi.location(campaignData))
      //   //return response.data;
      //   router.back()
      // } catch (error) {
      //   console.error('Error creating location:', error);
      //   throw error;
      // }
    }
  
  
  
    return (
      <View>
        <Text>CreateLocation</Text>
        <TextInput
          style={styles.input}
          placeholder="Navn"
          value={campaignName}
          onChangeText={(text) => setlocationName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Beksrivelse"
          value={campaignDescription}
          onChangeText={(text) => setCampaignDescription(text)}
        />

        {/* <TextInput
          style={styles.input}
          placeholder="Organizer"
          value={lokationOrganizerId}
          onChangeText={(text) => setlocationOrgaznierId(text)}
          keyboardType='numeric'
        /> */}

 

        <DateTimePicker mode='date' display='spinner' value={dateStart} onChange={onDateChange}/>

        {!showPicker && (<Pressable onPress={toggleDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Skralde dag. 1"
          editable={false}
          value={campaignDate}
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