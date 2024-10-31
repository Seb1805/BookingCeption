import { Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import Home from "./index";
import Profile from "./ProfileIndex";
import Events from "./Events";

import TabIcon from "../../components/navigation/tabIcon";
import icons from "../../constants/Icons";
import { Colors } from "@/constants/Colors";

export default function Index({ navigation } : {navigation: any}) {
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
        name="ProfileIndex"
        options={{ title: "Profil", tabBarLabel: "Profil", tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,}}
      />
      <Tabs.Screen
        name="BoughtList"
        options={{
          title: "Mine arrangementer",
          tabBarLabel: "Mine arrangementer",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />
        }}
      />
    </Tabs>
    
  );
}
