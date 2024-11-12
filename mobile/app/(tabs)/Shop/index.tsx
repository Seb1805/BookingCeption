import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import EventCard from "@/components/EventCard";
import Searchbar from "@/components/Searchbar";
import { Colors } from "@/constants/Colors";
import CartIcon from "@/components/CartIcon";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import SearchLocationModal from "@/components/SearchArrangementModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import Constants from 'expo-constants'


const datasdf = [
  {
    title: "Viby",
    image:
      "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg",
  },
  {
    title: "Aarhus",
    image:
      "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg",
  },
  {
    title: "Randers",
    image:
      "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg",
  },
  {
    title: "Aalborg",
    image:
      "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg",
  },
];
export default function index() {
  const [search, setSearch] = useState("");
  const [searchModalVisible, setsearchModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SearchLocationModal visibility={searchModalVisible} setVisibility={setsearchModalVisible}/>
      
      <View style={styles.headerbar}>
        <Text style={styles.headerText}>Arrangementer</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            style={{ margin: 8 }}
            onPress={() => setsearchModalVisible(true)}
          >
            <AntDesign name="search1" size={28} color={Colors.light.textInverse} />
          </Pressable>
          <CartIcon color={Colors.light.textInverse}/>
        </View>
      </View>
      <ScrollView>
        <View>
          <EventCard imagesrc="" />
          <EventCard imagesrc="https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg" />
          <EventCard imagesrc="" />
          <EventCard imagesrc="" />
        </View>
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
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 24,
    backgroundColor: Colors.light.primary,
  },
  headerText: {
    fontSize: 20,
    color: Colors.light.textInverse
  },
  cart: {
    margin: 8,
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
