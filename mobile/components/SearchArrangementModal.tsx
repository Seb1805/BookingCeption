import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useCallback, useState } from "react";
import EventCard from "@/components/EventCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import campaignApi from "@/api/axios/routes/campaign";
import { MesseData } from "@/constants/OtherDatatypes";

export default function SearchLocationModal({ visibility, setVisibility}: { visibility: boolean; setVisibility: any;}) {
  const [searchinput, setSearchinput] = useState("");
  const [foundCampaigns, setFoundCampaigns] = useState<MesseData[]>([])

  useFocusEffect(
    useCallback(() => {
     if(visibility) {
      FindCampaigns()
     }
    },[searchinput])
  )

  async function FindCampaigns() {
    if(searchinput.length > 0) {
      const response = await campaignApi.searchName(searchinput)
      if(response.status == 200) {
        setFoundCampaigns(() => response.data.campaigns)
      }
    } else {
      const response = await campaignApi.getCampaignDatapage(0)
      if(response.status == 200) {
        setFoundCampaigns(() => response.data.campaigns)
      }
    }
  }
  return (
    <>
      <Modal
        style={{ flex: 1, backgroundColor: "#25252577" }}
        animationType="slide"
        transparent={true}
        visible={visibility}
        statusBarTranslucent
        onRequestClose={() => setVisibility(!visibility)}
      >
        <TouchableWithoutFeedback onPress={() => setVisibility(!visibility)}>
          <View style={styles.backdrop}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalWindow}>
          <View style={{borderBottomColor: '#ddd', borderBottomWidth: 1}}>
            <TextInput
              style={styles.searchinput}
              placeholder="Søg"
              placeholderTextColor="#888"
              value={searchinput}
              onChangeText={setSearchinput}
            />
          </View>
          <ScrollView>
            {foundCampaigns.map((item, key) => {
              if (
                item.name.toLowerCase().includes(searchinput.toLowerCase()) || searchinput.length == 0
              ) {
                return (
                  <Pressable onPress={() => setVisibility(() => false)} key={key}>

                  <EventCard
                    id={item.id}
                    title={item.name}
                    imagesrc={item.coverImage}
                    price={item.price}
                    />
                    </Pressable>
                );
              } else return null;
            })}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalWindow: {
    position: "absolute",
    height: "75%",
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#fff",
    bottom: 0,
  },
  searchinput: {
    paddingVertical: 12,
    fontSize: 24,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
});
