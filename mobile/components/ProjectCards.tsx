import { Button, Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Campaign } from "@/constants/DBDatatypes";

export type Props = {
  navigation: any;
  eventlink: string;
  messedata: Campaign;
  address: string;
};


export default function ProjectCards({ navigation, eventlink, messedata, address }: Props) {
  function OrderEvent() {}

  return (
    <TouchableOpacity onPress={() => navigation.navigate(eventlink)}>
      <View>
        <View style={styles.image}>
          <Image
            source={{
              uri: "https://reactnative.dev/docs/assets/p_cat2.png",
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>{messedata.name}</Text>
          <Text style={styles.text}>{address}</Text>
          <Text style={styles.text}>{messedata.dateStart.toDateString()}{messedata.dateEnd !== messedata.dateStart ? ` - ${messedata.dateEnd.toDateString()}` : "" }</Text>
          <Text style={styles.text}>{messedata.timeStart}</Text>
        </View>
        <Button title="" onPress={() => OrderEvent} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  imagecontainer: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: '1/1'
  },
  image: {
    width: 100,
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 12,
  }
})