import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import Home from "./index";
import Profile from "./Profile/index";
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
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tabs.Screen
        name="Events"
        options={{ title: "Messer", tabBarLabel: "Messer",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="shopping-basket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />
      
      <Tabs.Screen
        name="Profile/index"
        options={{ title: "Profil", tabBarLabel: "Profil", tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,}}
      />
    </Tabs>
  );
}
