import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Dimensions,
	Image,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import firebaseConfig from '../config';
import authApi from '../api/authApi';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

const screenWidth = Dimensions.get('window').width;
const SignUp = ({ navigation }) => {
	const [phone, setPhone] = useState('+84');
	const [password, setPassword] = useState('');
	const [fullName, setFullName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [gender, setGender] = useState('');
	const [signupError, setSignUpError] = useState(false);
	const [signupErrorMessage, setSignUpErrorMessage] = useState('');
	const [verificationId, setVerificationId] = useState(null);
	
	const recaptchaVerifier = useRef(null);

	const sendVerification = async () => {
		try {
			const phoneProvider = new firebaseConfig.auth.PhoneAuthProvider();
			const verificationId = await phoneProvider.verifyPhoneNumber(
				phone,
				recaptchaVerifier.current
			);
			setVerificationId(verificationId);
			setPhone('');
			navigation.navigate('VerifierSignup', {
				verificationId: verificationId,
			});
		} catch (error) {
			console.error('Error sending verification:', error);
		}
	};

	const handleRegister = async () => {
		try {
			const formData = new FormData();
			formData.append('phoneNumber', phone);
			formData.append('password', password);
			formData.append('fullName', fullName);
			formData.append('gender', gender);
			formData.append('dateOfBirth', dateOfBirth);
			const response = await authApi.signUpWithPhone(formData);
			console.log(response.status);
			console.log('Data:', response.data);
			sendVerification();
		} catch (error) {
			console.error('Error logging in:', error);
			switch (error.response.status) {
				case 400:
					setSignUpError(true);
					setSignUpErrorMessage('Số điện thoại đã được sử dụng, vui lòng dùng số khác');
					break;
				case 500:
					setSignUpError(true);
					setSignUpErrorMessage('Đăng ký không thành công. Vui lòng thử lại.');
					break;
				default:
					setSignUpError(true);
					setSignUpErrorMessage('Đã xảy ra lỗi không xác định. Vui lòng thử lại.');
			}
		}
	};
	return (
		<View style={styles.container}>
			<View style={{ flex: 5, margin: 10 }}>
				<View style={{ flexDirection: 'row', marginBottom: 30 }}>
					<TextInput
						placeholder="nhập số điện thoại"
						style={{
							height: 40,
							width: 350,
							borderColor: 'gray',
							borderWidth: 1,
							backgroundColor: 'white',
							borderWidth: 0,
							borderBottomWidth: 1,
							borderBottomColor: '#eeeeee',
							paddingBottom: 10,
						}}
						value={phone}
						onChangeText={(text) => {
							setPhone(text);
						}}
					></TextInput>
					<AntDesign
						name="close"
						size={24}
						color="black"
						style={{ position: 'absolute', right: 25, top: 10 }}
					/>
				</View>
				<View style={{ flexDirection: 'row', marginBottom: 30 }}>
					<TextInput
						placeholder="04/03/2000"
						style={{
							height: 40,
							width: 350,
							borderColor: 'gray',
							backgroundColor: 'white',
							borderWidth: 0,
							borderBottomWidth: 1,
						}}
						onChangeText={(text) => setDateOfBirth(text)}
					></TextInput>
					<AntDesign
						name="close"
						size={24}
						color="black"
						style={{ position: 'absolute', right: 25, top: 10 }}
					/>
				</View>
				<View style={{ flexDirection: 'row', marginBottom: 30 }}>
					<TextInput
						placeholder="nhập tên"
						style={{
							height: 40,
							width: 350,
							borderColor: 'gray',
							backgroundColor: 'white',
							borderWidth: 0,
							borderBottomWidth: 1,
						}}
						onChangeText={(text) => setFullName(text)}
					></TextInput>
					<AntDesign
						name="close"
						size={24}
						color="black"
						style={{ position: 'absolute', right: 25, top: 10 }}
					/>
				</View>

				<View style={{ flexDirection: 'row', marginBottom: 30 }}>
					<TextInput
						placeholder="nhập mật khẩu"
						style={{
							height: 40,
							width: 350,
							borderColor: 'gray',
							backgroundColor: 'white',
							borderWidth: 0,
							borderBottomWidth: 1,
							borderBottomColor: '#eeeeee',
						}}
						onChangeText={(text) => setPassword(text)}
					></TextInput>
					<AntDesign
						name="eye"
						size={24}
						color="black"
						style={{ position: 'absolute', right: 25, top: 10 }}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 30,
						height: 40,
						width: 350,
						borderColor: 'gray',
						backgroundColor: 'white',
						borderWidth: 0,
						borderBottomWidth: 1,
						borderBottomColor: '#eeeeee',
					}}
				>
					<Picker
						selectedValue={gender}
						onValueChange={(itemValue) => setGender(itemValue)}
						style={{
							height: 30,
							width: 350,
							borderColor: 'gray',
							backgroundColor: 'white',
							borderWidth: 0,
							borderBottomWidth: 1,
							borderBottomColor: '#eeeeee',
						}}
					>
						<Picker.Item label="Chọn giới tính" value="" />
						<Picker.Item label="Nam" value="male" />
						<Picker.Item label="Nữ" value="female" />
					</Picker>
				</View>

				{signupError && (
							<Text style={{ color: 'red' }}>
								{signupErrorMessage}
							</Text>
						)}

				<View style={{ marginTop: 20 }}>
					<TouchableOpacity
						style={styles.button_login}
						onPress={handleRegister}
					>
						<Text
							style={{
								color: 'white',
								textAlign: 'center',
								lineHeight: 45,
							}}
						>
							Đăng ký
						</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1, alignItems: 'center' }}>
					<FirebaseRecaptchaVerifierModal
						ref={recaptchaVerifier}
						firebaseConfig={firebaseConfig}
						invisible={true}
					/>
				</View>
			</View>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	button_login: {
		backgroundColor: '#06b2fc',
		height: 45,
		borderRadius: 10,
		width: screenWidth - 40,
	},
	avatarButton: {
		backgroundColor: '#06b2fc',
		padding: 10,
		borderRadius: 5,
	},
});
