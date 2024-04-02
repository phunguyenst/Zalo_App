import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { setAuthorization, setIsLogin } from "../views/slide/LoginSlide";
import { useDispatch, useSelector } from "react-redux"
import firebaseConfig from "../config"

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


import AsyncStorage from '@react-native-async-storage/async-storage';



const screenWidth = Dimensions.get('window').width;
const Login = ({ navigation }) => {
    
    const [phone, setPhone] = useState('+84812580727')
    const [password, setPassword] = useState('12345678')
    const [loginError, setLoginError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
  
    const [verificationId, setVerificationId] = useState(null);
    const dispatch = useDispatch()

    //ref cho recaptcha
    const recaptchaVerifier = useRef(null);
    const sendVerification = async () => {
        try {
            const phoneProvider = new firebaseConfig.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier.current);
            setVerificationId(verificationId);
            setPhone("");
            navigation.navigate('Verifier', { verificationId: verificationId });
        } catch (error) {
            console.error('Error sending verification:', error);
        }
    };
  
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/sign-in-with-phone", {
                //   const response = await fetch("http://172.29.178.2:5000/api/auth/sign-in-with-phone", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    password: password
                })
            });

            const data = await response.json();
            console.log('Status:', response.status, 'Data:', data);

            if (response.ok) {
                // Handle successful login, e.g., navigate to another screen
                const authorization = response.headers.get('Authorization');
                console.log("authorization"+ authorization);
                dispatch(setAuthorization(authorization));
                await AsyncStorage.setItem('authorization', authorization);
                dispatch(setIsLogin(true));
                // Set Authorization as a param for Home screen
              
            } else {
                // Handle login failure, e.g., display error message

                setLoginError(true);
                setLoginErrorMessage('Đăng nhập không thành công. Vui lòng thử lại.');

            }
            sendVerification();
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, e.g., display error message

            setLoginError(true);
            setLoginErrorMessage('sai mặt khẩu hoặc số điện thoại, vui lòng nhập đúng thông tin.');

        }
    }
    return (

        <View style={styles.container}>
            <View style={{ height: 300 }}>
       
                <View style={{ height: 80, margin: 0, padding: 0, width: "100%", backgroundColor: 'f3f4f6' }}>
                    <Text>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
                </View>
                <View style={{ height: 250, margin: 10 }}>
                    <View style={{ flexDirection: "row", marginBottom: 30 }}>
                        <TextInput
                            placeholder='nhập số điện thoại'
                            style={{ height: 40, width: 350, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee", paddingBottom: 10 }}
                            value={phone}
                            onChangeText={text => {
                                setPhone(text)
                            }}
                        ></TextInput>
                        <AntDesign name="close" size={24} color="black"
                            style={{ position: 'absolute', right: 25, top: 10 }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 30 }}>
                        <TextInput
                            placeholder='nhập mật khẩu'
                            style={{ height: 40, width: 350, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee", paddingBottom: 10 }}
                            onChangeText={text => {
                                setPassword(text)
                            }}
                        ></TextInput>
                        <AntDesign name="eye" size={24} color="black"
                            style={{ position: 'absolute', right: 25, top: 10 }}
                        />
                    </View>
                    {loginError && <Text style={{ color: 'red' }}>{loginErrorMessage}</Text>}
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button_login} onPress={handleLogin}>
                            <Text style={{ color: 'white', textAlign: 'center', lineHeight: 45 }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{ fontSize: 16, color: "#000" }}>
                    Bạn chưa là thành viên?
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp'); }}>
                        <Text style={{ color: "#438ff6", fontSize: 16 }}> Hãy đăng ký!</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            <View style={{flex: 1, alignItems: "center"}}>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                    invisible={true}
                />
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    button_login: {
        backgroundColor: '#06b2fc',
        height: 45,
        borderRadius: 10,
        width: screenWidth - 40,
    }
})
