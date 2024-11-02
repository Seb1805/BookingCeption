import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Colors } from '@/constants/Colors';

export default function Searchbar({data = "", setData, placeholderData=""} : {data: string, setData: any, placeholderData: string}) {
  return (
    <View style={styles.inputarea}>
      <FontAwesome size={28} name="search" color={"#d2d2d2"} style={styles.searcimage} />
      <TextInput
        style={styles.inputStyle}
        value={data}
        onChangeText={(text) => setData(text)}
        placeholder={placeholderData}
        placeholderTextColor='#ddd'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputarea: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 5,
    color: Colors.light.background,
    fontSize: 24,
  },
  searcimage: {
    paddingHorizontal: 10
  }
})