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
import { TimerPickerModal } from 'react-native-timer-picker';
import { SafeAreaProvider } from "react-native-safe-area-context";
import campaignApi from '@/api/axios/routes/campaign';


export default function CampaignModal() {
    const [campaignName, setlocationName] = useState("");
    const [section,setSectionId] = useState("")
    const [campaignStartDate, setCampaignStartDate] = useState("")

    const [campaignEndDate, setCampaignEndDate] = useState("")

    const [campaignDescription, setCampaignDescription] = useState("")
    const [campaignCoverImage, setCampaignCoverImage] = useState("")
    const [visibleStart, setVisibleStart] = useState(false)
    const [visibleEnd, setVisibleEnd] = useState(false)


    //Date picker stuff    
    const [dateStart,setDateStart] = useState(new Date())
    const [showStartPicker, setShowStartPicker] = useState(false)

    const [dateEnd,setDateEnd] = useState(new Date())
    const [showEndPicker, setShowEndPicker] = useState(false)

    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")

    

    const toggleStartTimePicker = () => setVisibleStart(true);
    const toggleEndTimePicker = () => setVisibleEnd(true);

    const onConfirmStart = ({hours, minutes}:{hours : number, minutes: number} ) => {
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      if (visibleStart === true) {
        setTimeStart(formattedTime);
        setVisibleStart(false);
      }
      //  else {
      //   setTimeStart(formattedTime);
      //   setVisible(false);
      // }
    };

    const onConfirmEnd = ({hours, minutes}:{hours : number, minutes: number} ) => {
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      if (visibleEnd === true) {
        setTimeEnd(formattedTime);
        setVisibleEnd(false);
      }
      //  else {
      //   setTimeEnd(formattedTime);
      //   setVisible(false);
      // }
    };
    
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
              dateStart: dateStart.toLocaleDateString("default", {year: "numeric", month: "2-digit", day: "2-digit"}),
              timeStart: timeStart,
              dateEnd: dateEnd.toLocaleDateString("default", {year: "numeric", month: "2-digit", day: "2-digit"}),
              timeEnd: timeEnd,
              sectionId: 1, //TODO: Implement
              active: true

          }
          await campaignApi.campgain(campaignData);
          router.back()
          return campaignData
      }
      catch{

      }
    }
  
  
  
    return (
      <View style={{flex: 1}}>
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
        <View>
          
  <View>
    <Pressable onPress={toggleStartTimePicker} style={styles.timeButton}>
      <View>
        <TextInput 
        style={styles.input}
        placeholder='Start tidspunkt'
        value={timeStart}
        editable={false}
        />
       
      </View>
    </Pressable>
    <TimerPickerModal
      visible={visibleStart}
      setIsVisible={setVisibleStart}
      onConfirm={onConfirmStart}
      modalTitle="Set Start Time"
      onCancel={() => setVisibleStart(false)}
      closeOnOverlayPress
      styles={{
        theme: "light",
        backgroundColor: "#F1F1F1",
        text: { color: "#202020" },
        pickerContainer: { marginRight: 10 },
        pickerItemContainer: { width: 100 },
        pickerLabelContainer: { right: -20, top: 0, bottom: 6, width: 40, alignItems: "center" },
      }}
    />
  </View>

  <View>
    <Pressable onPress={toggleEndTimePicker} style={[styles.timeButton, { marginTop: 10 }]}>
    <TextInput 
        style={styles.input}
        placeholder='Slut tidspunkt'
        value={timeEnd}
        editable={false}
        />
    </Pressable>
    <TimerPickerModal
      visible={visibleEnd}
      setIsVisible={setVisibleEnd}
      onConfirm={onConfirmEnd}
      modalTitle="Set End Time"
      onCancel={() => setVisibleEnd(false)}
      closeOnOverlayPress
      styles={{
        theme: "light",
        backgroundColor: "#F1F1F1",
        text: { color: "#202020" },
        pickerContainer: { marginRight: 10 },
        pickerItemContainer: { width: 100 },
        pickerLabelContainer: { right: -20, top: 0, bottom: 6, width: 40, alignItems: "center" },
      }}
    />
    </View>

        </View>
        <Pressable  onPress={createCampaign}>
          <View>
          <Text>Opret lokation</Text>
          </View>
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

    selectedValue: {
      marginTop: 16,
      fontSize: 16,
      fontWeight: 'bold',
    },
    timeButton: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 10,
      fontSize: 16,
      overflow: "hidden",
      borderColor: "#C2C2C2",
      color: "#C2C2C2",
      marginBottom: 10,
  },
  });

