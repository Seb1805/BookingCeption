import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import Selectormodal from "@/components/Selectormodal";

export default function Index() {

  const [campaignsData, setcampaignsData] = useState([])
  const [selectorVisible, setSelectorVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)


  const dummyData = [{text: "option1", id: 1},{text: "option2", id: 2},{text: "option3", id: 3},]
  return (
    <ScrollView style={{paddingTop: 16}}>
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

      <Selectormodal 
        visibility={selectorVisible} 
        setVisibility={setSelectorVisible} 
        title="this is a selector"
        optionArray={dummyData}
        selectedData={selectedOption}
        setselectedData={setSelectedOption}
        dataDisplay="text"
       />

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