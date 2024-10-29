import { Text, View } from "react-native";
import ProjectCards from "@/components/ProjectCards";
import Home from "@/app/Home"
import Profile  from "./Profile/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Profile'}}/>
    </Tab.Navigator>
  );
}
