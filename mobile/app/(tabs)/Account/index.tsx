import { View, Text, ScrollView, Button, StyleSheet, Pressable, Image, Modal, Alert } from "react-native";
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
import Constants from 'expo-constants'

export default function index() {
  const [userData, setuserData] = useState<User>()
  
  // useFocusEffect(
  //   useCallback(() => {
  //     getMyInfo().then(response => {
  //       if(!response.status === 200) {
  //         router.navigate('/(auth)/Login')
  //       }
  //       setuserData(() => response.data)
  //     })
  //   }, [])
  // )

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
    <ScrollView style={{paddingTop: 24}}>
      <View style={styles.profileinfo}>
        <View style={styles.imagecontainer}>{ImageIdentifyer("")}</View>
        <Text style={styles.profilename}>
          test
        {/* {userData?.firstname} */}
        </Text>
      </View>

      <Profilesection title="kontrolpanel">
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
          title="Arrangementer"
          onpress={() => router.navigate("/(tabs)/Account/Campaigns")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
          </View>
        </ProfileButtons>
        <ProfileButtons
          title="Section"
          onpress={() => router.navigate("/(tabs)/Account/modals/SectionModal")}
        >
          <View style={styles.buttonTypeLink}>
            <AntDesign size={16} name="right" color={Colors.light.text} />
            </View>
          </ProfileButtons>
          <ProfileButtons
          title="Spot"
          onpress={() => router.navigate("/(tabs)/Account/modals/SpotModal")}
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
          onpress={() => {

            Alert.alert('Logout', 'Er du sikker du vil log af?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('test')},
            ]);
            
          }}
        >
          
        </ProfileButtons>
      </Profilesection>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileinfo: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: Constants.statusBarHeight,
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
    textTransform: 'capitalize'
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
