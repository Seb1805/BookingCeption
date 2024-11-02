import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Stack, Tabs } from "expo-router";
import Home from "./index";
import Profile from "./Account";
import Events from "./Events";

import TabIcon from "../../components/navigation/tabIcon";
import icons from "../../constants/Icons";
import { Colors } from "@/constants/Colors";

export default function Index() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#f00',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home", tabBarLabel: "Home", tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={color}/> }}
      />
        <Tabs.Screen
          name="BoughtList"
          options={{ title: "Mine arrangementer", tabBarLabel: "Mine arrangementer", tabBarIcon: ({ color }) => <Fontisto size={28} name="bookmark" color={color} /> }}
        />
      <Tabs.Screen
        name="Events"
        options={{ title: "Messer", tabBarLabel: "Messer",
          tabBarIcon: ({ color }) => <AntDesign size={28} name="shoppingcart" color={color} /> }}
      />
      <Tabs.Screen
        name="Support"
        options={{ title: "Support", tabBarLabel: "Support",
          tabBarIcon: ({ color }) => <AntDesign size={28} name="infocirlceo" color={color} /> }}
      />
      <Tabs.Screen
        name="Account"
        options={{ title: "Account", tabBarLabel: "Account", tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} /> }}
      />
      
    </Tabs>
    
  );
}
