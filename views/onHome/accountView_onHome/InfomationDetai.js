import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { setProfile } from '../../slide/ProfileSlide';
import * as ImagePicker from "expo-image-picker"
export default function InformationDetail() {
    let navigation = useNavigation();
    const profile = useSelector(setProfile);
    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };
  return (
    <View style={styles.container}>
        <View style={{flex: 1, flexDirection: "row", backgroundColor: "#247bfe"}}>
            <AntDesign name="arrowleft" size={24} color="white" style={{flex: 1, paddingLeft: "5%"}} onPress={() => navigation.goBack()} />
        </View>
        <View style={{flex:3}}>
            <Image source={{uri: profile.profilePic}} style={{width: '100%', height: '100%'}}/>
            <View
            style={{
                flex: 3,
                position: "absolute",
                top: "61%",
                width: "50%",
                paddingLeft: "5%",
            }}
        >
        <Image style={{width: 60, height: 60,borderRadius: 50, resizeMode: "contain"}} source={{uri: profile.profilePic}}></Image>
        </View>
           
        <Text style={{position: "absolute",top: "70%",fontFamily: "Roboto", fontSize: 20, fontWeight: "bold", color: "black", paddingLeft: "25%" }}>{profile.fullName}</Text>
        </View>
        <View style={{flex:3, backgroundColor: "#fff"}}>
            <Text style={{fontFamily: "Roboto", fontSize: 18, fontWeight: "bold", paddingLeft: "5%", paddingTop: "3%"}}>Thông tin cá nhân</Text>
            <View style={{flex: 1, flexDirection: "row", paddingLeft: "5%", alignItems:"center"}}>
                <Text style={{fontFamily: "Roboto", fontSize: 15,}}>Giới tính</Text>
                <View style={{flex: 0.2}}></View>
                <Text style={{fontFamily: "Roboto", fontSize: 15}}>{profile.gender}</Text>
            </View>
            <View style={{flex: 0.02, backgroundColor: "#CCCCCC", paddingLeft: "5%"}}></View>
            <View style={{flex: 1, flexDirection: "row", paddingLeft: "5%", alignItems: "center"}}>
                <Text style={{fontFamily: "Roboto", fontSize: 15,}}>Ngày sinh</Text>
                <View style={{flex: 0.2}}></View>
                <Text style={{fontFamily: "Roboto", fontSize: 15}}>30/04/2002</Text>
            </View>
            <View style={{flex: 0.02, backgroundColor: "#CCCCCC", paddingLeft: "5%"}}></View>
            <View style={{flex: 1, flexDirection: "row", paddingLeft: "5%", paddingTop: "3%"}}>
                <Text style={{fontFamily: "Roboto", fontSize: 15,}}>Điện thoại</Text>
                <View style={{flex: 0.2}}></View>
                <View style={{flex: 1, flexDirection: "column"}}>
                    <Text style={{fontFamily: "Roboto", fontSize: 15}}>{profile.phoneNumber}</Text>
                    <Text style={{fontFamily: "Roboto", fontSize: 12,}}>Số điện thoại chỉ hiện thị với người có lưu só bạn trong danh bạ máy</Text>
                </View>
            </View>
        </View>
        <View style={{flex:3}}></View>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCCCCC',
    }
})