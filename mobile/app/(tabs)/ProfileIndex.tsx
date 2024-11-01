import { View, Text, ScrollView, Button, StyleSheet, Pressable, Image } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
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
        <View style={styles.imagecontainer}>
          {ImageIdentifyer('')}
        </View>
        <Text style={styles.profilename}>Mr. Hansen</Text>
      </View>
    
    <View style={styles.section}>
      <Profilesection title="kontrolpanel">

      <ProfileButtons title="Lokaler" onpress={() => <Redirect href="/Profile/CreateLocation" />} />
      <ProfileButtons title="Areal opdeling" onpress={() => <Redirect href="/Profile/CreateLocation" />} />
      <ProfileButtons title="Kampagner" onpress={() => <Redirect href="/Profile/CreateLocation" />} />
      </Profilesection>
    </View>

      

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
  section: {
    marginBottom: 12
  }
})
