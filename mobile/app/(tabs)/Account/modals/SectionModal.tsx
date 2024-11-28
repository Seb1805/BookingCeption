import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Section } from '@/constants/DBDatatypes';
import { Router } from 'expo-router';
import sectionApi from '@/api/axios/routes/section';
import locationApi from '@/api/axios/routes/location'
import DropDownPicker from 'react-native-dropdown-picker';
import Selectormodal from '@/components/Selectormodal';



export default function SectionModal() {
  const [sectionLocationId, setSectionLocationId] = useState <{ locationId?: number; locationName: string } | null>(null);
  const [sectionName, setSectionName] = useState("");
  const [sectionSpotId, setSectionSpotId] = useState("");
  const [sectionRoomForParticipants, setSectionRoomForParticipants] = useState("");
  const [sectionLayoutImage, setSectionLayoutImage] = useState("");
  const [selectorVisible, setSelectorVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  //const [items, setItems] = useState([]);
  const [items, setItems] = useState<Array<{ label: string; value: string }>>([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
      fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const request = locationApi.getLocations();
      let jsonData = null;
      if ((await request).status === 200) {
        jsonData = (await request).data;
      } else {
        console.error("Failed to fetch locations");
        return;
      }
  
      console.log('Raw data:', jsonData); // Added for debugging
  
      if (!jsonData || !Array.isArray(jsonData.locations)) {
        console.error("Received invalid data from API");
        return;
      }
  
      // Map the fetched data to the format expected by react-native-picker
      const formattedItems = jsonData.locations.map((item: { locationId: number; locationName: string }) => ({
        label: item.locationName,
        value: item.locationId.toString()
      }));
  
      console.log('Formatted items:', formattedItems); // Added for debugging
  
      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


    async function createSection(){
        try{
          console.log(sectionLocationId?.locationId)
          const sectionData: Section = {
            locationId: sectionLocationId?.locationId,
            name: sectionName,
            roomForParticipants: parseInt(sectionRoomForParticipants),
            layoutImage: ''
        }
        console.log("Iam section data",sectionData)
        const response = sectionApi.section(sectionData);
        ;
        //console.log(sectionData)
        }
        catch{

        }

        
    }

  return (
    <View>
        <TextInput
        style={styles.input}
        placeholder="Navn"
        value={sectionName}
        onChangeText={(text) => setSectionName(text)}
        />


        <TextInput
        style={styles.input}
        placeholder="Antal deltagere"
        value={sectionRoomForParticipants}
        keyboardType='number-pad'
        onChangeText={(text) => setSectionRoomForParticipants(text)}
        />
      {/* <View style={{ zIndex: open ? 1000 : 0 }}>
        <DropDownPicker 
          containerStyle={{
            width: '100%',
            
            paddingTop: 10
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(newValue) => setValue(newValue)}
          onSelectItem={(item) => setSectionLocationId(`${item.value}`)}
          />
        <Text style={styles.selectedValue}>Selected Location: {sectionLocationId}</Text>
      </View> */}
      <Selectormodal 
        visibility={selectorVisible} 
        setVisibility={setSelectorVisible} 
        title="this is a selector"
        optionArray={items}
        selectedData={sectionLocationId}
        setselectedData={setSectionLocationId}
        dataDisplay="label"
       />
        <Button title="Opret lokation" onPress={createSection} />

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
