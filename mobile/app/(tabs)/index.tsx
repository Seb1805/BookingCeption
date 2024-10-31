import { Button, Text, View } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProjectCards from "@/components/ProjectCards";
import { useCallback, useState } from "react";
import { Link, useFocusEffect } from "expo-router";

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
      <Link href="/(auth)/Login"  style={{padding: 12, margin: 3}} >
        <Text>Login side</Text>
      </Link>
      <Link href="/(auth)/Signup" style={{padding: 12, margin: 3}} >
        <Text>Signup side</Text>
      </Link>
      {/* <ProjectCards navigation={navigation} eventlink={`events/1`} messedata={} address={}/> */}
    </View>
  );
}
