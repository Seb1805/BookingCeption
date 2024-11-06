import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Section } from '@/constants/DBDatatypes';
import { Router } from 'expo-router';
import locationApi from '@/api/axios/routes/location';
import DropDownPicker from 'react-native-dropdown-picker';



export default function SectionModal() {

    const [sectionLocationId,setSectionLocationId] = useState("");
    const [sectionLocationItem,setSectionLocationItem] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [sectionSpotId,setSectionSpotId] = useState("");
    const [sectionRoomForParticipants,setSectionRoomForParticipants] = useState("");
    const [sectionLayoutImage, setSectionLayoutImage] = useState("");

    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

      // Fetch data from API or local storage
  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const request = locationApi.getLocations()
      var jsonData = null;
      if((await request).status == 200)
      {
        jsonData = (await request).data
      }
      else{

      }

      // Map the fetched data to the format expected by react-native-picker
      const formattedItems = jsonData.map((item: { locationName: any; locationId: any; }) => ({
        label: item.locationName,
        value: item.locationId
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


    async function createSection(){
        try{
            const sectionDate: Section = {
                locationId: 1,
                locationItem: 1,
                name: 'Skrald',
                spotId: 1,
                roomForParticipants: 1,
                layoutImage: ''
            };
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
      <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={(item: { value: React.SetStateAction<string>; label: React.SetStateAction<string>; }) => {
            setSectionLocationItem(item.value);
            setSectionLocationId(item.label);
          }}
        />
        <Text style={styles.selectedValue}>Selected Location: {sectionLocationId}</Text>
      </View>

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
    flex: 1,
    padding: 16,
  },
  selectedValue: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
