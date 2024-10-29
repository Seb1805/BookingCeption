import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '@/app/Home';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Setting Page'}}/>
    </Tab.Navigator>
  )
}
