import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
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
    <ScrollView>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
      }}>

      <Text>Home page</Text>
      <Text>Hero - news</Text>
      <Text>Påmindelse om kommende messe (3 dage)</Text>
      <Text>highlighted messer</Text>

      <Link href="/(auth)/Login" style={styles.link} >
        <Text>Login side</Text>
      </Link>
      <Link href="/(auth)/Signup" style={styles.link} >
        <Text>Signup side</Text>
      </Link>
      <Link href="/modal" style={styles.link}>
        Open modal
      </Link>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    backgroundColor: '#2196f3',
    color: '#ffffff',
    borderRadius: 12,
    padding: 12,
    margin: 4,
    fontSize: 20,
  },
});