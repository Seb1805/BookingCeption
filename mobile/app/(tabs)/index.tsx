import { Button, Text, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProjectCards from "@/components/ProjectCards";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function Index({ navigation } : {navigation: any}) {

  const [campaignsData, setcampaignsData] = useState([])

  // useFocusEffect(
  //   useCallback(() => {
  //     const response = fetch(`http://127.0.0.1:8000/users`, {
  //       method: 'GET'
  //     });


  //     return () => {
  //       console.log('dg');
  //     }
  //   }, [])
  // )

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text>Home page</Text>
      <Text style={{padding: 24}} onPress={() => navigation.navigate('Login')}>Login side</Text>
      <Text style={{padding: 24}} onPress={() => navigation.navigate('Signup')}>Signup side</Text>
      {/* <ProjectCards navigation={navigation} eventlink={`events/1`} messedata={} address={}/> */}
    </View>
  );
}
