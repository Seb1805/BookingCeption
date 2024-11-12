import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Redirect } from 'expo-router'


export default function ProfileButtons({title, onpress, children}: {title: string, onpress: any, children?: any }) {

  return (
    <Pressable style={styles.buttonstyling} onPress={onpress}>
      <Text style={styles.buttonText}>{title}</Text>
      {children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonstyling: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1
  },
  buttonText: {
    color: Colors.light.text,
    textTransform: "capitalize",
  },
  buttonTypeLink: {
    paddingTop: 4
  }
})