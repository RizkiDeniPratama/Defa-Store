import *  as React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import Splash from '../../Screens/Splash/index'
import SignIn from '../../Screens/SignIn/index'
import SignUp from '../../Screens/SignUp/index'
import Home from '../../Screens/Home/index'
import Tabnavigations from '../TabNavigation';
import Akun from '../../Screens/Akun';
import Detail from '../../Screens/Detail/Detail'
import Intro from '../../Screens/Intro/index'
import Edituser from '../../Screens/Akun/edituser'
import Toko from '../../Screens/Toko/Toko'
import Registrasi from '../../Screens/Toko/Registrasi'
import Add from '../../Screens/Toko/Tambahproduk'
import Editbarang from '../../Screens/Toko/editbarang'
import Checkout from '../../Screens/Keranjang/checkout'
import ChatScreen from '../../Screens/Pesan/chat'
import Kontak from '../../Screens/Pesan/index'
import Search from '../../Screens/Home/Search'
const Stack = createStackNavigator()

function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName= "Splash"
            screenOptions = {{
                headerShown: false,
                animationEnabled: false,
            }}>
               
                <Stack.Screen name='Splash' component = {Splash}/>
                <Stack.Screen name = 'Intro' component = {Intro}/>
                <Stack.Screen name='SignIn' component = {SignIn}/>  
                <Stack.Screen name = 'SignUp' component = {SignUp}/>
                <Stack.Screen name = 'TabNavigation' component = {Tabnavigations}/>
                <Stack.Screen name = 'Detail' component = {Detail}/>
                <Stack.Screen name="Edituser" component={Edituser} />
                <Stack.Screen name="Toko" component={Toko} />
                <Stack.Screen name="Registrasi" component={Registrasi} />
                <Stack.Screen name="Add" component={Add} />
                <Stack.Screen name="Editbarang" component={Editbarang} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="Kontak" component={Kontak} />
                <Stack.Screen name="Search" component={Search} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigation;