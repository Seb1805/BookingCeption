import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {

  const [campaignsData, setcampaignsData] = useState([])

  return (
    <ScrollView>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
      }}>

      <Text>Home page</Text>
      <Text>banner - news</Text>
      <Text>Påmindelse om kommende messe (3 dage)</Text>
      <Text>highlighted messer</Text>

      <Link href="/(auth)/Login" style={styles.link} >
        <Text>Login side</Text>
      </Link>
      <Link href="/(auth)/Signup" style={styles.link} >
        <Text>Signup side</Text>
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