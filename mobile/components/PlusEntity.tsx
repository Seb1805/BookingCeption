import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'

export default function PlusEntity({func= () => {}} : {func : any} ) {
  return (
    <Pressable style={styles.viewplacement} onPress={func}>
      <View style={styles.horizontalLine}></View>
      <View style={styles.verticalLine}></View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  viewplacement: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: Colors.light.tint,
    borderRadius: 60,
  },
  horizontalLine: {
    position: 'relative',
    width: 20,
    height: 2,
    top: 11,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  verticalLine: {
    position: 'relative',
    width: 2,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#ddd'
  }
})