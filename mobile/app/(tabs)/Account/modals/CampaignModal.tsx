import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import axios from 'axios';
import { Campaign, Location } from '@/constants/DBDatatypes';
import locationApi from '@/api/axios/routes/location';
import { router } from 'expo-router';
import DateTimePicker, {DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import sectionApi from '@/api/axios/routes/section';
import { Button } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";


export default function CampaignModal() {
    const [campaignName, setlocationName] = useState("");
    const [section,setSectionId] = useState("")
    const [campaignStartDate, setCampaignStartDate] = useState("")

    const [campaignEndDate, setCampaignEndDate] = useState("")

    const [campaignDescription, setCampaignDescription] = useState("")
    const [campaignCoverImage, setCampaignCoverImage] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");



    //Date picker stuff    
    const [dateStart,setDateStart] = useState(new Date())
    const [showStartPicker, setShowStartPicker] = useState(false)

    const [dateEnd,setDateEnd] = useState(new Date())
    const [showEndPicker, setShowEndPicker] = useState(false)

    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")

    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible])
  
    const onConfirm = React.useCallback(
      ({ hours, minutes }: {hours: number, minutes: number}) => {
        setVisible(false);
        console.log({ hours, minutes });
      },
      [setVisible]
    );

    const toggleStartDatePicker = () => {
        setShowStartPicker(() => !showStartPicker)
    }
    
    const toggleEndDatePicker = () => {
      setShowEndPicker(() => !showEndPicker)
  }

    const exitApp = () => {
      throw {};
    }
    //What the fuck is the type - who knows?
    const onStartDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        if (event.type === 'set') {
          const currentDate = selectedDate || new Date();
          setDateStart(currentDate);

          if(Platform.OS === "android")
          {
            toggleStartDatePicker();
            setCampaignStartDate(currentDate.toDateString())
          }
          else if(Platform.OS == "ios" || Platform.OS == "macos")
          {
            //No support currently

          }
        } else {
          toggleStartDatePicker();
        }
      };

          //What the fuck is the type - who knows?
    const onEndDateChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
      if (event.type === 'set') {
        const currentDate = selectedDate || new Date();
        setDateEnd(currentDate);

        if(Platform.OS === "android")
        {
          toggleEndDatePicker();
          setCampaignEndDate(currentDate.toDateString())
        }
        else if(Platform.OS == "ios" || Platform.OS == "macos")
        {
          //No support currently

        }
      } else {
        toggleEndDatePicker();
      }
    };
      

    async function createCampaign() {

      try{
          const campaignData: Campaign = {
              name: campaignName,
              description: campaignDescription,
              coverImage: campaignCoverImage,
              dateStart: dateStart,
              timeStart: timeStart,
              dateEnd: dateEnd,
              timeEnd: timeEnd,
              sectionId: 1, //TODO: Implement
              active: true

          }

          return campaignData
      }
      catch{

      }
    }
  
  
  
    return (
      <View>
        <Text>Create Campaign</Text>
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

        {showStartPicker && <DateTimePicker mode='date' display='spinner' value={dateStart} onChange={onStartDateChange}/>}
        <Pressable onPress={toggleStartDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Start dag"
          editable={false}
          value={campaignStartDate}
          //onChangeText={(text) => setlocationOrgaznierId(text)}
            />

        </Pressable>
        {showEndPicker && <DateTimePicker mode='date' display='spinner' value={dateEnd} onChange={onEndDateChange}/>}
        <Pressable onPress={toggleEndDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Slut dag"
          editable={false}
          value={campaignEndDate}
          //onChangeText={(text) => setlocationOrgaznierId(text)}
            />

        </Pressable>
        <SafeAreaProvider>
      <View style={styles.marginFix}>
        <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
          Start tidspunkt
        </Button>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
      </View>
    </SafeAreaProvider>


        <Pressable style={styles.input} onPress={createCampaign}>
          <Text>Opret lokation</Text>
        </Pressable>
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
    marginFix: {
      marginTop: 15,

    },
    selectedValue: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });