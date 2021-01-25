import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../../Screens/Home/index';
import Keranjang from '../../Screens/Keranjang/index';
import Akun from '../../Screens/Akun/index';
import Pesan from '../../Screens/Pesan/index'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

function Tabnavigations() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting = {false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let sizeIcon;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
            sizeIcon = size;
          } else if (route.name === 'Keranjang') {
            iconName = focused ? 'cart' : 'cart';
            sizeIcon = size;
          }else if (route.name === 'Pesan') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles'
            sizeIcon = size; 
          }else if (route.name === 'Akun') {
            iconName = focused ? 'person-circle' : 'person-circle';
            sizeIcon = size;
          }
           
          return <IonIcons name={iconName} size={sizeIcon} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#003ac2',
        inactiveTintColor: '#97959585',
        showLabel: true,
        // tabStyle:{backgroundColor:'grey'}
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Keranjang" component={Keranjang} />
      <Tab.Screen name='Pesan' component={Pesan} />
      <Tab.Screen name="Akun" component={Akun} />
    </Tab.Navigator>
  );
}
export default Tabnavigations
