import { View, Text, ScrollView, Button, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import { Colors } from "@/constants/Colors";
import ButtonOwn from "@/components/ButtonOwn";
import ProfileButtons from "@/components/ProfileButtons";
import Profilesection from "@/components/Profilesection";

export default function index() {
  
  
  function ImageIdentifyer(imagesrc: string) {
    if (imagesrc.substring(0,4) == "http") {
      return (
        <Image source={{uri: imagesrc}} style={styles.image} />
      )
    }

    return (
      <Image source={require('@/assets/images/placeholders/profile-placeholder-icon.png')} style={styles.image} />
    )
  }
  
  return (
    <ScrollView>
      <View style={styles.profileinfo}>
        <View style={styles.imagecontainer}>{ImageIdentifyer("")}</View>
        <Text style={styles.profilename}>Mr. Hansen</Text>
      </View>

      <Profilesection title="kontrolpanel">
        {/* <Pressable style={styles.buttonstyling} onPress={() => router.navigate("/(tabs)/Account/CreateLocation")}>
          <Text style={styles.buttonText}>{"Lokaler"}</Text>
        </Pressable> */}
        <ProfileButtons
          title="Lokaler"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
        <ProfileButtons
          title="Areal opdeling"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
        <ProfileButtons
          title="Kampagner"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
      </Profilesection>

      
      <Profilesection title="Preferencer">
        <ProfileButtons
          title="Notifikationer"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
        <ProfileButtons
          title="Email"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
        <ProfileButtons
          title="Password"
          onpress={() => router.navigate("/(tabs)/Account/CreateLocation")}
        />
      </Profilesection>

      <Text>Profil oplysninger, mulighed for oprette lokationer</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileinfo: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 20,
  },
  imagecontainer: {
    width: 80, 
    height: 80, 
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: "100%",
  },
  profilename: {
    fontWeight: '600',
    marginVertical: 8,
    fontSize: 16,
  },
  buttonstyling: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 8,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1
  },
  buttonText: {
    color: Colors.light.text,
    textTransform: "capitalize",
  }

})
