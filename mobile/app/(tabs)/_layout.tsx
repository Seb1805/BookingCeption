import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tabs } from "expo-router";

import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarLabel: "Home", tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color}/> }}
      />
        <Tabs.Screen
          name="BoughtList"
          options={{ title: "Mine Billetter", tabBarLabel: "Mine Billetter", tabBarIcon: ({ color }) => <Fontisto size={28} name="bookmark" color={color} /> }}
        />
      <Tabs.Screen
        name="Messer"
        options={{ title: "Messer", tabBarLabel: "Messer",
          tabBarIcon: ({ color }) => <AntDesign size={28} name="shoppingcart" color={color} /> }}
      />
      <Tabs.Screen
        name="Account"
        options={{ title: "Account", tabBarLabel: "Account", tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} /> }}
      />
      
    </Tabs>
    
  );
}
