import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { setAuthorization, setIsLogin } from '../views/slide/LoginSlide';
import { useDispatch, useSelector } from 'react-redux';
import firebaseConfig from '../config';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';

import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const Login = ({ navigation }) => {
	const [phone, setPhone] = useState('+84812580727');
	const [password, setPassword] = useState('12345678');
	const [loginError, setLoginError] = useState(false);
	const [loginErrorMessage, setLoginErrorMessage] = useState('');
	const [verificationId, setVerificationId] = useState(null);
	const dispatch = useDispatch();

	const [showModalForgetPassword, setShowModalForgetPassword] =
		useState(false);
	const [phoneForget, setPhoneForget] = useState('');
	const [newPassword, setNewPassword] = useState('');
	//ref cho recaptcha
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
			navigation.navigate('Verifier', { verificationId: verificationId });
		} catch (error) {
			console.error('Error sending verification:', error);
		}
	};

	const handleLogin = async () => {
		try {
			const response = await fetch(
				'localhost:5000/api/auth/sign-in-with-phone',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						phoneNumber: phone,
						password: password,
					}),
				}
			);

			const data = await response.json();
			console.log('Status:', response.status, 'Data:', data);

			if (response.ok) {
				// Handle successful login, e.g., navigate to another screen
				const authorization = response.headers.get('Authorization');
				console.log('authorization' + authorization);
				dispatch(setAuthorization(authorization));
				await AsyncStorage.setItem('authorization', authorization);
				dispatch(setIsLogin(true));
				// Set Authorization as a param for Home screen
			} else {
				// Handle login failure, e.g., display error message

				setLoginError(true);
				setLoginErrorMessage(
					'Đăng nhập không thành công. Vui lòng thử lại.'
				);
			}
			// sendVerification();
			navigation.navigate('Home');
		} catch (error) {
			console.error('Error logging in:', error);
			setLoginError(true);
			setLoginErrorMessage(
				'sai mặt khẩu hoặc số điện thoại, vui lòng nhập đúng thông tin.'
			);
		}
	};

	const handlerSentSMS = async () => {
		sendChangePasswordRequest(newPassword, phoneForget);
	};

	const showDialog = () => {
		setShowModalForgetPassword(true);
	};
	const hideDialog = () => setShowModalForgetPassword(false);

	const sendChangePasswordRequest = async (newPassword, phoneN) => {
		try {
			const res = await fetch(
				'localhost:5000/api/user/change-password',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						newPassword: newPassword,
						phoneNumber: phoneN,
					}),
				}
			);
			// Đóng modal
			if (res.status === 200) alert('Cập nhật mật khẩu thành công');
			else alert('Cập nhật mật khẩu thất bại');
		} catch (error) {
			// Xử lý lỗi (nếu có)
			console.error('Đổi mật khẩu không thành công:', error);
		} finally {
			setShowModalForgetPassword(false);
		}
	};

	return (
		<PaperProvider>
			<View style={{ flex: 1, padding: 15 }}>
				<View>
					<View
						style={{
							height: 80,
							width: '100%',
							backgroundColor: '#f3f4f6',
						}}
					>
						<Text style={{ textAlign: 'center' }}>
							Vui lòng nhập số điện thoại và mật khẩu để đăng nhập
						</Text>
					</View>
					<View style={{ height: 250 }}>
						<View
							style={{
								flexDirection: 'row',
								marginBottom: 30,
								alignItems: 'center',
							}}
						>
							<TextInput
								placeholder="nhập số điện thoại"
								style={{
									height: 40,
									width: '100%',
									backgroundColor: 'white',
									borderRadius: 5,
									paddingHorizontal: 20,
								}}
								value={phone}
								onChangeText={(text) => {
									setPhone(text);
								}}
							></TextInput>
							<AntDesign
								name="close"
								size={20}
								color="black"
								style={{
									position: 'absolute',
									right: 20,
									top: 10,
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: 'row',
								marginBottom: 30,
								alignItems: 'center',
							}}
						>
							<TextInput
								placeholder="nhập mật khẩu"
								style={{
									height: 40,
									width: '100%',
									backgroundColor: 'white',
									borderRadius: 5,
									paddingHorizontal: 20,
								}}
								secureTextEntry={true}
								value={password}
								onChangeText={(text) => {
									setPassword(text);
								}}
							></TextInput>
							<AntDesign
								name="eye"
								size={20}
								color="black"
								style={{
									position: 'absolute',
									right: 20,
									top: 10,
								}}
							/>
						</View>
						{loginError && (
							<Text style={{ color: 'red' }}>
								{loginErrorMessage}
							</Text>
						)}
						<View
							style={{
								marginTop: 20,
								backgroundColor: '#06b2fc',
								height: 40,
								borderRadius: 10,
							}}
						>
							<TouchableOpacity onPress={handleLogin}>
								<Text
									style={{
										color: 'white',
										textAlign: 'center',
										lineHeight: 40,
									}}
								>
									Đăng nhập
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<TouchableOpacity onPress={showDialog}>
					<View style={{ marginTop: 30, flex: 1 }}>
						<Text styles={{ textAlign: 'center', color: 'blue' }}>
							Quên mật khẩu?
						</Text>
					</View>
				</TouchableOpacity>
				<View
					style={{
						flex: 1,
						justifyContent: 'flex-end',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<Text style={{ fontSize: 16, color: '#000' }}>
						Bạn chưa là thành viên?
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SignUp');
							}}
						>
							<Text style={{ color: '#438ff6', fontSize: 16 }}>
								{' '}
								Hãy đăng ký!
							</Text>
						</TouchableOpacity>
					</Text>
				</View>
				<Portal>
					<Dialog
						visible={showModalForgetPassword}
						onDismiss={hideDialog}
						style={{ backgroundColor: 'white' }}
					>
						<Dialog.Title style={{ color: 'black' }}>
							Quên mật khẩu
						</Dialog.Title>
						<Dialog.Content>
							<View>
								<TextInput
									placeholder="Số điện thoại"
									value={phoneForget}
									onChangeText={(text) =>
										setPhoneForget(text)
									}
									style={{
										borderWidth: 1,
										borderColor: 'black',
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 5,
										marginVertical: 10,
									}}
								/>
								<TextInput
									placeholder="Nhập mật khẩu mới"
									value={newPassword}
									onChangeText={(text) =>
										setNewPassword(text)
									}
									style={{
										borderWidth: 1,
										borderColor: 'black',
										paddingHorizontal: 10,
										paddingVertical: 5,
										borderRadius: 5,
									}}
								/>
							</View>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={hideDialog} textColor="black">
								Hủy
							</Button>
							<Button onPress={handlerSentSMS} textColor="black">
								Cập nhật mật khẩu
							</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</View>
		</PaperProvider>
	);
};
export default Login;
