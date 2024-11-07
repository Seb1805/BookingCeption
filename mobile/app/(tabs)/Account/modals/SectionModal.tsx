import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Section } from '@/constants/DBDatatypes';
import { Router } from 'expo-router';
import locationApi from '@/api/axios/routes/location';
import DropDownPicker from 'react-native-dropdown-picker';



export default function SectionModal() {
  const [sectionLocationId, setSectionLocationId] = useState("");
  const [sectionLocationItem, setSectionLocationItem] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionSpotId, setSectionSpotId] = useState("");
  const [sectionRoomForParticipants, setSectionRoomForParticipants] = useState("");
  const [sectionLayoutImage, setSectionLayoutImage] = useState("");

  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
      fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
      try {
          const request = locationApi.getLocations();
          var jsonData = null;
          if ((await request).status === 200) {
              jsonData = (await request).data;
          }
          else {
              console.error("Failed to fetch locations");
              return;
          }

            // Map the fetched data to the format expected by react-native-picker
            const formattedItems  = jsonData.map((item: { locationName: string; locationId: number }) => ({
              label: item.locationName,
              value: item.locationId.toString()
          }));

          setItems(formattedItems);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };


    async function createSection(){
        try{
          const sectionDate: Section = {
            locationId: parseInt(value || ""),
            locationItem: parseInt(sectionLocationItem),
            name: sectionName,
            spotId: parseInt(sectionSpotId),
            roomForParticipants: parseInt(sectionRoomForParticipants),
            layoutImage: ''
        };
        }
        catch{

        }

        
    }
    const handleOnSelectItem = (item: { value?: string | undefined; label: string }) => {
      setSectionLocationId(item.value ?? "");
      setSectionLocationItem(item.label);
    };
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
          setValue={(newValue) => setValue(newValue)}
          onSelectItem={handleOnSelectItem}
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
