import { StyleSheet, View, Text, TextInput,TouchableOpacity,Dimensions  } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import firebase from "firebase/compat/app"

const screenWidth = Dimensions.get('window').width;
const Verifier = ({ navigation, route }) => {
    const {verificationId} = route.params;
    const [error, setError] = useState(null);

    console.log("verificationId" + verificationId);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const otpInputs = useRef([])

    const handleChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
    
        // Tự động chuyển trỏ tới ô nhập liệu kế tiếp khi người dùng điền số và không phải ô cuối cùng
        if (value !== '' && index < code.length - 1) {
            otpInputs.current[index + 1].focus();
        }
        else if (value === '' && index > 0) {
            otpInputs.current[index - 1].focus();
        }
    };
    const confirmCode = async () => {
        try {
            const pin = code.join("");
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, pin);
            await firebase.auth().signInWithCredential(credential);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error confirming code:', error);
            setError('Mã OTP không chính xác, vui lòng nhập lại');
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ height: 50, alignItems: "center", marginTop: 30, marginBottom: 10 }}>
                <Text style={{ color: "blue", fontSize: 20, fontWeight:"bold" }}>Nhập mã pin để xác thực</Text>
            </View>
            <View style={styles.otpContainer}>
                {code.map((value, index) => (
                    <View style={styles.otpBox} key={index}>
                        <TextInput
                            style={styles.otpText}
                            onChangeText={(text) => handleChange(index, text)}
                            value={value}
                            maxLength={1}
                            keyboardType="numeric"
                            ref={(ref) => (otpInputs.current[index] = ref)}
                        />
                    </View>
                ))}

                
            </View>
            {error && <Text style={{ color: 'red', alignItems:"center", textAlign:"center", fontSize: 14 }}>{error}</Text>}
            <View style={{ alignItems: "center", height: 50, }}>
            <TouchableOpacity style={styles.button_verifier }
                onPress={confirmCode}
            >
                <Text style= {{color: "black", fontSize: 16}}>xác thực</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    );
};

export default Verifier;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    otpContainer: {
        marginHorizontal: 20,
        marginBottom: 30,
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        paddingTop:20,


    },
    otpBox: {
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: 0.5,
        width: '15%',
    },
    otpText: {
        fontSize: 25,
        color: "red",
        padding: 0,
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    button_verifier: {
        backgroundColor: '#06b2fc',
        height: 45,
        borderRadius: 10,
        width: screenWidth - 40,
        alignItems: "center",
        marginTop: 30,

        

    },
});