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
import React, { useState } from "react";
import EventCard from "@/components/EventCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";

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

export default function SearchLocationModal({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: any;
}) {
  const [searchinput, setSearchinput] = useState("");
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
            {datasdf.map((item, key) => {
              if (
                item.title.toLowerCase().includes(searchinput.toLowerCase())
              ) {
                return (
                  <EventCard
                    key={key}
                    title={item.title}
                    imagesrc={item.image}
                  />
                );
              } else if (searchinput.length == 0) {
                return (
                  <EventCard
                    key={key}
                    title={item.title}
                    imagesrc={item.image}
                  />
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
