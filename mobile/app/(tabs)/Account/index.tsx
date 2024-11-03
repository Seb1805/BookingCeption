import { View, Text, ScrollView, Button, StyleSheet, Pressable, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { Link, Redirect, router, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import ButtonOwn from "@/components/ButtonOwn";
import ProfileButtons from "@/components/ProfileButtons";
import Profilesection from "@/components/Profilesection";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "@/api/axios/routes/users";
import { User } from "@/constants/DBDatatypes";

export default function index() {
  const [userData, setuserData] = useState<User>()
  
  useFocusEffect(
    useCallback(() => {

      getMyInfo().then(response => {
        if(!response.data) {
          <Redirect href="/(auth)/Login" />
          return
        }
  
        setuserData(() => response.data)
        
      })
      return () => {
        console.log('');
      }
    }, [])
    
  )

  async function getMyInfo() {
    const response = await userApi.getUserData()
    return response
  }
  
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
    <ScrollView style={{paddingTop: 16}}>
      <View style={styles.profileinfo}>
        <View style={styles.imagecontainer}>{ImageIdentifyer("")}</View>
        <Text style={styles.profilename}>{userData?.firstname}</Text>
      </View>

      <Profilesection title="kontrolpanel">
        {/* <Pressable style={styles.buttonstyling} onPress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}>
          <Text style={styles.buttonText}>{"Lokaler"}</Text>
        </Pressable> */}
        <ProfileButtons
          title="Lokaler"
          onpress={() => router.navigate("/(tabs)/Account/Locations")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
          </View>
        </ProfileButtons>
        <ProfileButtons
          title="Areal opdeling"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
          </View>
        </ProfileButtons>
        <ProfileButtons
          title="Kampagner"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
          </View>
        </ProfileButtons>
      </Profilesection>

      <Profilesection title="Preferencer">
        <ProfileButtons
          title="Notifikationer"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
          </View>
        </ProfileButtons>
        <ProfileButtons
          title="Email"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          {}
        </ProfileButtons>
        <ProfileButtons
          title="Password"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          
        </ProfileButtons>
      </Profilesection>

      <Profilesection title="">
        <ProfileButtons
          title="Support"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          
        </ProfileButtons>
        <ProfileButtons
          title="Log out"
          onpress={() => router.navigate("/(tabs)/Account/modals/CreateLocation")}
        >
          
        </ProfileButtons>
      </Profilesection>

      <Text>Profil oplysninger, mulighed for oprette lokationer</Text>
      <Link href={{pathname:  "/(tabs)/Account/modals/CRUDmodal", params: {name: 'test title'}}} style={{padding: 16, backgroundColor: "#2a7"}}>
        Open modal
      </Link>
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
  },
  buttonTypeLink: {
    paddingTop: 4
  }

})
