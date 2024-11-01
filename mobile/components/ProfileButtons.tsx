import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function ProfileButtons({title = "", onpress = () => {}}: {title: string, onpress: any}) {
  return (
    <Pressable style={styles.buttonstyling} onPress={onpress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
  }
})