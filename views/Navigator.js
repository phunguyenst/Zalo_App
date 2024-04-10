import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { persistor } from './store';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import VerifierSignup from '../screens/VerifierSignup';
import Home from '../screens/Home';
import Verifier from '../screens/Verifier';
import ChatDetail from './onHome/chatView_onHome/ChatDetail';
import infoScreen from './onHome/accountView_onHome/InfomationDetai';
import HeaderChat from './onHome/chatView_onHome/HeaderChat';
import HeaderNavigator from './HeaderNavigator';
import Search from '../screens/Search';
import { setAuthorization, setIsLogin } from './slide/LoginSlide';
import HeaderBack from './HeaderBack';
import socketService from '../utils/socketService';
import { SocketProvider } from './socketContext';

const Stack = createStackNavigator();

const Navigator = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await AsyncStorage.getItem('authorization');
				if (token) {
					dispatch(setAuthorization(token));
					dispatch(setIsLogin(true));
					navigation.navigate('Home');
				} else {
					navigation.navigate('Login');
				}
			} catch (error) {
				console.error('Lỗi khi kiểm tra token:', error);
			}
		};
		checkToken();
	}, []);

	useEffect(() => {
		if (profile) {
			socketService.initialize(profile.userID);
			return () => {
				socketService.disconnect();
			};
		}
	}, [dispatch, navigation]);

	return (
		<SocketProvider>
			<View style={{ flex: 1 }}>
				<PersistGate loading={null} persistor={persistor}>
					<Stack.Navigator>
						<Stack.Screen
							name="Login"
							component={Login}
							options={{ title: 'Đăng nhập' }}
						/>
						<Stack.Screen
							name="Welcome"
							component={Welcome}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Verifier"
							component={Verifier}
							options={{ title: 'mã OTP' }}
						/>
						<Stack.Screen
							name="SignUp"
							component={SignUp}
							options={{ title: 'Đăng ký' }}
						/>
						<Stack.Screen
							name="VerifierSignup"
							component={VerifierSignup}
							options={{ title: 'Đăng ký' }}
						/>
						<Stack.Screen
							name="Home"
							component={Home}
							options={{
								header: () => <HeaderNavigator />,
							}}
						/>
						<Stack.Screen
							name="ChatDetail"
							component={ChatDetail}
							options={{
								header: () => <HeaderChat />,
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="infoScreen"
							component={infoScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Search"
							component={Search}
							options={{
								header: () => <HeaderBack />,
							}}
						/>
					</Stack.Navigator>
				</PersistGate>
			</View>
		</SocketProvider>
	);
};

export default Navigator;
