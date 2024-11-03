import { Link, router } from 'expo-router';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";

export default function CRUDmodal({name}: {name: string}) {

  return (
    <View style={styles.container}>
      <Text>Modal screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});