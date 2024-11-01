import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Profilesection({title, children} : {title: string, children: any}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectiontitle}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 8,
  },
  sectiontitle: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold'
  }
})