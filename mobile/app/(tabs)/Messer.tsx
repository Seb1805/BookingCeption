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
import Constants from 'expo-constants'


const datasdf = [
  {
    id: 12,
    title: "Viby",
    image:
      "",
  },
  {
    id: 13,
    title: "Aarhus",
    image:
      "",
  },
  {
    id: 16,
    title: "Randers",
    image:
      "",
  },
  {
    id: 18,
    title: "Aalborg",
    image:
      "",
  },
];
export default function Shop() {
  const [search, setSearch] = useState("");
  const [searchModalVisible, setsearchModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setsearchModalVisible(() => false)
      }
    },[])
  )

  return (
    <View style={{ flex: 1 }}>
      <SearchLocationModal visibility={searchModalVisible} setVisibility={setsearchModalVisible}/>
      
      <View style={styles.headerbar}>
        <Text style={styles.headerText}>Arrangementer</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Pressable
            style={{ marginHorizontal: 8 }}
            onPress={() => setsearchModalVisible(true)}
          >
            <AntDesign name="search1" size={28} color={Colors.light.textInverse} />
          </Pressable>
          <CartIcon color={Colors.light.textInverse}/>
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        {datasdf.map((item, key) => {
          return (<EventCard key={key} id={item.id} imagesrc={item.image} />)
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: Colors.light.textInverse
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searcimage: {
    paddingHorizontal: 10,
  },
  modalWindow: {
    position: 'absolute',
    height: "75%",
    width: '100%',
    padding: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#fff",
    bottom: 0
  },
  searchinput: {
    paddingVertical: 12,
    fontSize: 24,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
});
