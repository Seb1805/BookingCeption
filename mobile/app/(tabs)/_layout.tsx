import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import Home from "./index";
import Profile from "./Profile/index";

import TabIcon from "../../components/navigation/tabIcon";
import icons from "../../constants/Icons";
import { Colors } from "@/constants/Colors";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.light.tint,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          // tabBarIcon: ({ color, focused }) => {
          //   return (
          //     <TabIcon
          //       icon={icons.home}
          //       color={color}
          //       name="Home"
          //       focused={focused}
          //     />
          //   );
          // },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", tabBarLabel: "Profile"}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", tabBarLabel: "Profile"}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", tabBarLabel: "Profile"}}
      />
    </Tabs>
  );
}
