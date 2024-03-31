import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import Verifier from "./screens/Verifier";
import ChatDetail from "./views/onHome/chatView_onHome/ChatDetail";
import infoScreen from "./views/onHome/accountView_onHome/InfomationDetai";
import HeaderChat from "./views/onHome/chatView_onHome/HeaderChat";
import HeaderNavigator from "./views/HeaderNavigator";
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Provider } from "react-redux";
import {store,persistor} from "./views/store";
import { PersistGate } from 'redux-persist/integration/react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsLogin } from './views/slide/LoginSlide';
// import BottomNavigator from './views/BottomNavigator';

const Stack = createStackNavigator();



export default function App({navigation}) {
  // useEffect( () => {
  //   const checkLoginStatus = async ( ) => {
  //     const isLogin = await AsyncStorage.getItem('isLogin');
  //     if(isLogin) {
  //       dispatch(setIsLogin(isLogin === "true")); // Convert string to boolean
  //     }
  //   };
  //   checkLoginStatus();
  // }, [])
  const handleGetToken = async () => {
    const authorization = await AsyncStorage.getItem('authorization');
    console.log('token', authorization);
    if(!authorization) {
      navigation.replace('Login');
    }
    else {
      navigation.replace('Home');
    }
  }

  useEffect(() => {
    handleGetToken();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: "Đăng nhập",  }} />
        <Stack.Screen name="Verifier" component={Verifier} options={{ title: "mã OTP",  }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ title: "Đăng ký",  }} />
        <Stack.Screen name="Home" component={Home} options={
          {
            header: () => <HeaderNavigator />
          //  headerTitle: ()  =><HeaderNavigator name ="home"/>,
          //  headerLeft:() =>(
          //   <View>
          //     <TouchableOpacity>
          //     <AntDesign name="search1" size={24} color="black" />
          //     </TouchableOpacity>
          //   </View>
          //  ),
          //  headerRight: () => (
          //   <View>
          //     <TouchableOpacity>
          //     <AntDesign name="plus" size={24} color="black" />
          //     </TouchableOpacity>
          //   </View>
            
          //  ),
          //  headerStyle:{
          //     height: 60,

          //  }
          }
        } />
        
        <Stack.Screen name="ChatDetail" component={ChatDetail} options={
          {
            header: () => <HeaderChat />,
            headerShown: false
          }
        } />
         <Stack.Screen name="infoScreen" component={infoScreen} options={{headerShown: false}} />
        
      </Stack.Navigator>
    </NavigationContainer>
      </PersistGate>
      

    </Provider>
   

  )
}