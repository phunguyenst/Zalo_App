import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import firebaseConfig from "../config"
import * as ImagePicker from "expo-image-picker"
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
const screenWidth = Dimensions.get('window').width;
const SignUp = ({ navigation }) => {
    const [phone, setPhone] = useState('+84')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')
    const [verificationId, setVerificationId] = useState(null);
    const [avatar, setAvatar] = useState(null);

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
    const recaptchaVerifier = useRef(null);
    // const handleChooseAvatar = () => {
    //     const options = {
    //         title: 'Chọn Avatar',
    //         storageOptions: {
    //             skipBackup: true,
    //             path: 'images',
    //         },
    //     };

    //     ImagePicker.showImagePicker(options, response => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.error) {
    //             console.log('ImagePicker Error: ', response.error);
    //         } else {
    //             const source = { uri: response.uri };
    //             setAvatar(source);
    //         }
    //     });
    // };
    const sendVerification = async () => {
        try {
            const phoneProvider = new firebaseConfig.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(phone, recaptchaVerifier.current);
            setVerificationId(verificationId);
            setPhone("");
            navigation.navigate('VerifierSignup', { verificationId: verificationId });
        } catch (error) {
            console.error('Error sending verification:', error);
        }
    };

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/sign-up-with-phone", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: phone,
                    password: password,
                    fullName: fullName,
                    gender: gender
                })
            });

            const data = await response.json();
            console.log('Status:', response.status, 'Data:', data);

            if (response.ok) {

                sendVerification();// Example navigation to Home screen
            } else {


            }
        } catch (error) {
            console.error('Error logging in:', error);

        }
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 5, margin: 10 }}>
                <View style={{ flexDirection: "row", marginBottom: 30 }}>
                    <TextInput
                        placeholder='nhập số điện thoại'
                        // style={{ height: 40, width: 350, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, paddingBottom: 10 }}
                        style={{ height: 40, width: 350, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee", paddingBottom: 10 }}
                        // onChangeText={text => onChangeText(text)}
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
                        placeholder='nhập tên'
                        style={{ height: 40, width: 350, borderColor: 'gray', backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1 }}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                        onChangeText={text => setFullName(text)}

                    ></TextInput>
                    <AntDesign name="close" size={24} color="black"

                        style={{ position: 'absolute', right: 25, top: 10 }}
                    />

                </View>


                <View style={{ flexDirection: "row", marginBottom: 30 }}>
                    <TextInput
                        placeholder='nhập mật khẩu'
                        style={{ height: 40, width: 350, borderColor: 'gray', backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee" }}
                        // onChangeText={text => onChangeText(text)}
                        // value={value}
                        onChangeText={text => setPassword(text)}

                    ></TextInput>
                    <AntDesign name="eye" size={24} color="black"

                        style={{ position: 'absolute', right: 25, top: 10 }}
                    />

                </View>
                <View style={{ flexDirection: "row", marginBottom: 30, height: 40, width: 350, borderColor: 'gray', backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee" }}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={{ height: 30, width: 350, borderColor: 'gray', backgroundColor: 'white', borderWidth: 0, borderBottomWidth: 1, borderBottomColor: "#eeeeee" }}
                    >
                        <Picker.Item label="Chọn giới tính" value="" />
                        <Picker.Item label="Nam" value="male" />
                        <Picker.Item label="Nữ" value="female" />
                    </Picker>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 30 }}>
                    <TouchableOpacity onPress={handleImagePickerPress}>
                        <Text>Choose Avatar</Text>
                    </TouchableOpacity>
                </View>
                {avatar && <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} />}


                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.button_login} onPress={handleRegister}>
                        <Text style={{ color: 'white', textAlign: 'center', lineHeight: 45 }}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                        invisible={true}
                    />
                </View>

            </View>


        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {

        flex: 1,
    },
    button_login: {
        backgroundColor: '#06b2fc',
        height: 45,
        borderRadius: 10,
        width: screenWidth - 40,
    }
    // button_arrow: {
    //     backgroundColor: '#06b2fc',
    //     borderRadius: "70%",
    //     height: 50,
    //     width: 50,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
})