import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors';

export default function Searchbar({data = "", setData, placeholderData=""} : {data: string, setData: any, placeholderData: string}) {
  return (
    <View style={styles.inputarea}>
      <TextInput
        style={styles.inputStyle}
        value={data}
        onChangeText={(text) => setData(text)}
        placeholder={placeholderData}
        placeholderTextColor='#ddd'
      />
      <FontAwesome size={28} name="search" color={"#d2d2d2"} style={styles.searcimage} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputarea: {
    display: 'flex', 
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.light.primary,
  },
  inputStyle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 5 ,
    color: Colors.light.background,
  },
  searcimage: {
    paddingHorizontal: 10
  }
})