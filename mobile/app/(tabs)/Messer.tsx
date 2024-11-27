import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import EventCard from "@/components/EventCard";
import Searchbar from "@/components/Searchbar";
import { Colors } from "@/constants/Colors";
import CartIcon from "@/components/CartIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router, useFocusEffect } from "expo-router";
import SearchLocationModal from "@/components/SearchArrangementModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import Constants from "expo-constants";
import campaignApi from "@/api/axios/routes/campaign";
import { MesseData } from "@/constants/OtherDatatypes";

const datasdf = [
  {
    id: 12,
    title: "Viby",
    image: "",
  },
  {
    id: 13,
    title: "Aarhus",
    image: "",
  },
  {
    id: 16,
    title: "Randers",
    image: "",
  },
  {
    id: 18,
    title: "Aalborg",
    image: "",
  },
];
export default function Shop() {
  const [search, setSearch] = useState("");
  const [campaignsGroup, setcampaignGroup] = useState<MesseData[]>([]);
  const [pagenr, setpagenr] = useState<number>(0);
  const [searchModalVisible, setsearchModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getCampaigns(pagenr);
      return () => {
        setsearchModalVisible(() => false);
      };
    }, [])
  );

  async function getCampaigns(page: number) {
    try {
      const response = await campaignApi.getCampaignDatapage(page);
      if (response.status == 200) {
        setcampaignGroup(() => response.data.campaigns);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SearchLocationModal
        visibility={searchModalVisible}
        setVisibility={setsearchModalVisible}
      />

      <View style={styles.headerbar}>
        <Text style={styles.headerText}>Arrangementer</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={{ marginHorizontal: 8 }}
            onPress={() => setsearchModalVisible(true)}
          >
            <AntDesign
              name="search1"
              size={28}
              color={Colors.light.textInverse}
            />
          </Pressable>
          <CartIcon color={Colors.light.textInverse} />
        </View>
      </View>
      {/* {datasdf.map((item, key) => {
          return (<EventCard key={key} id={item.id} imagesrc={item.image} />)
        })} */}
      {campaignsGroup.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          {campaignsGroup.map((item, key) => {
            return (
              <EventCard key={key} id={item.id} imagesrc={item.coverImage} title={item.name} price={item.price} />
            );
          })}
        </ScrollView>
      ) : (
        <Text style={styles.noticketstext}>
          Ingen forbindelse til internettet
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "semibold",
    color: Colors.light.textInverse,
  },
  noticketstext: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    textAlign: "center",
    color: "#777",
    width: "100%",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searcimage: {
    paddingHorizontal: 10,
  },
  modalWindow: {
    position: "absolute",
    height: "75%",
    width: "100%",
    padding: 12,
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
