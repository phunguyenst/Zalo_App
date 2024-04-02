import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import infoScreen from "./accountView_onHome/InfomationDetai"
import { Avatar, Badge, Card, Divider, Button } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux"
import { readProfile,clearProfile } from '../slide/ProfileSlide';
import { SimpleLineIcons } from '@expo/vector-icons';
import { selectAuthorization } from "../slide/LoginSlide";


import { persistor } from '../store';
const AccountView = () => {
  let navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const authorization = useSelector(selectAuthorization);
  console.log("authorizationProfile" + authorization);

  

  const [userData, setUserData] = useState(null);

  const logout = () => {
    dispatch(clearProfile());
    persistor.purge().then(() => {
      navigation.navigate('Welcome');
    });
  }
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/secret', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authorization}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        setUserData(data.user);
        dispatch(readProfile(data.user));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);


  return (
    <View style={styles.container}>

      
        {userData && (
          <>
          <TouchableOpacity
                  onPress={() => { navigation.navigate('infoScreen') }}
                  >
                
            <Card>
              <Card.Content>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar.Image size={55} source={{ uri: userData.profilePic }} style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Card.Title
                      title={userData.fullName}
                      subtitleStyle={{ fontSize: 15 }}
                    />
                  </View>
                </View>
              </Card.Content>
            </Card>
            </TouchableOpacity>
            {/* ... other code */}
          </>
        )}
   
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
        <TouchableOpacity onPress={() => navigation.navigate("infoScreen")}>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}
          >Thông tin</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flex: 0.05 }}></View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Đổi ảnh đại diện</Text>
      </View>
      <View style={{ flex: 0.05 }}></View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Đổi ảnh bìa</Text>
      </View>
      <View style={{ flex: 0.05 }}></View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Cập nhật giới thiệu bản thân</Text>
      </View>
      <View style={{ flex: 0.05 }}></View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
        <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Ví của tôi</Text>
      </View>
      <View style={{ flex: 0.3 }}></View>

      <View style={{ flex: 5.15, backgroundColor: "#FFFFFF" }}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "5%", color: "blue" }}>Cài đặt</Text>
          <View style={{ flex: 0.3 }}></View>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto", paddingLeft: "5%" }}>Mã QR của tôi</Text>
        </View>
        <View style={{ flex: 0.05, backgroundColor: "#D7D7D7" }}></View>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Quyền riêng tư</Text>
        </View>
        <View style={{ flex: 0.05, backgroundColor: "#D7D7D7" }}></View>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Quyền quản lý tài khoản</Text>
        </View>
        <View style={{ flex: 0.05, backgroundColor: "#D7D7D7" }}></View>
        {/* <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "5%", }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Cài đặt chung</Text>
        </View> */}
      <TouchableOpacity
        onPress={logout}
      >
          <View style={{ flex: 1, backgroundColor: "#FFFFFF", justifyContent: "center", paddingLeft: "15%", flexDirection:"row" }}>
        <SimpleLineIcons name="logout" size={24} color="red" />
          <Text style={{ fontSize: 14, fontWeight: "bold", fontFamily: "Roboto" }}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
      </View>
      <View style={{ flex: 5.05, backgroundColor: "#FFFFFF" }}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7D7D7",
  },
})

export default AccountView