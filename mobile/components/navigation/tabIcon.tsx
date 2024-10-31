import { Text, View, Image, StyleSheet } from 'react-native'

export default function TabIcon({icon, color, name, focused}: {icon: HTMLImageElement, color: string, name: string, focused: boolean}) {
  return (
    <View style={styles.tabview}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
      />
      <Text>
        {name}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  tabview: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})