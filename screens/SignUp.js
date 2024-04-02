import { StyleSheet, View, Text, TextInput, TouchableOpacity,Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
const screenWidth = Dimensions.get('window').width;
const SignUp = ({ navigation }) => {
    const [phone, setPhone] = useState('+84')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [gender, setGender] = useState('')

    

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
                // Handle successful login, e.g., navigate to another screen
                navigation.navigate('Login'); // Example navigation to Home screen
            } else {
                // Handle login failure, e.g., display error message

                // setLoginError(true);
                // setLoginErrorMessage('Đăng nhập không thành công. Vui lòng thử lại.');

            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, e.g., display error message

            // setLoginError(true);
            // setLoginErrorMessage('sai mặt khẩu hoặc số điện thoại, vui lòng nhập đúng thông tin.');

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

                <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button_login} onPress={handleRegister}>
                            <Text style={{ color: 'white', textAlign: 'center', lineHeight: 45 }}>Đăng ký</Text>
                        </TouchableOpacity>
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