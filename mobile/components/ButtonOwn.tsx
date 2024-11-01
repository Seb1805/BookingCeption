import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function ButtonOwn({title = "", onpress = () => {}}: {title: string, onpress: any}) {
  return (
    <Pressable style={styles.buttonstyling} onPress={onpress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  buttonstyling: {
    alignItems: 'center',
    width: '100%',
    padding: 12,
    marginVertical: 6,
    backgroundColor: Colors.light.primary,
  },
  buttonText: {
    color: Colors.light.background,
    textTransform: "uppercase",
  }
})