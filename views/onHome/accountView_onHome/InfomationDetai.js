import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { setProfile } from '../../slide/ProfileSlide';
import * as ImagePicker from 'expo-image-picker';
import { selectAuthorization } from '../../slide/LoginSlide';
export default function InformationDetail() {
	let navigation = useNavigation();
	const profile = useSelector(setProfile);
	const authorization = useSelector(selectAuthorization);
	const [isModalVisible, setModalVisible] = useState(false);

	const handleImagePickerPress = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			uploadProfilePic(result?.assets[0]);
		}
	};

	const uploadProfilePic = async (file) => {
		let formData = new FormData();
		formData.append('profilePic', file);

		for (let [key, value] of formData.entries()) {
			console.log(key, value);
		}
		try {
			const response = await fetch(
				'localhost:5000/api/user/update-profile-pic',
				{
					method: 'PATCH',
					headers: {
						Authorization: `Bearer ${authorization}`,
					},
					body: formData,
				}
			);

			if (response) {
				const responseJson = await response.json();
				console.log('Profile pic updated successfully:', responseJson);
			} else {
				console.error('Failed to update profile pic:', response);
			}
		} catch (error) {
			console.error('Error during image upload:', error);
		}
	};
	const openModal = () => {
		setModalVisible(true);
	};
	return (
		<View style={styles.container}>
			<View
				style={{
					flex: 1,
					flexDirection: 'row',
					backgroundColor: '#247bfe',
				}}
			>
				<AntDesign
					name="arrowleft"
					size={24}
					color="white"
					style={{ flex: 1, paddingLeft: '5%' }}
					onPress={() => navigation.goBack()}
				/>
			</View>
			<View style={{ flex: 3 }}>
				<Button onPress={openModal} />
				<Image
					source={{ uri: profile.profilePic }}
					style={{ width: '100%', height: '100%' }}
				/>
				<TouchableOpacity onPress={openModal}>
					<View
						style={{
							flex: 3,
							position: 'absolute',
							top: '61%',
							width: '50%',
							paddingLeft: '5%',
						}}
					>
						<Image
							style={{
								width: 60,
								height: 60,
								borderRadius: 50,
								resizeMode: 'contain',
							}}
							source={{ uri: profile.profilePic }}
						></Image>
					</View>
				</TouchableOpacity>

				<Text
					style={{
						position: 'absolute',
						top: '70%',
						fontFamily: 'Roboto',
						fontSize: 20,
						fontWeight: 'bold',
						color: 'white',
						paddingLeft: '25%',
					}}
				>
					{profile.fullName}
				</Text>
			</View>
			<View style={{ flex: 3, backgroundColor: '#fff' }}>
				<Text
					style={{
						fontFamily: 'Roboto',
						fontSize: 18,
						fontWeight: 'bold',
						paddingLeft: '5%',
						paddingTop: '3%',
					}}
				>
					Thông tin cá nhân
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingLeft: '5%',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
						Giới tính
					</Text>
					<View style={{ flex: 0.2 }}></View>
					<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
						{profile.gender}
					</Text>
				</View>
				<View
					style={{
						flex: 0.02,
						backgroundColor: '#CCCCCC',
						paddingLeft: '5%',
					}}
				></View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingLeft: '5%',
						alignItems: 'center',
					}}
				>
					<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
						Ngày sinh
					</Text>
					<View style={{ flex: 0.2 }}></View>
					<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
						30/04/2002
					</Text>
				</View>
				<View
					style={{
						flex: 0.02,
						backgroundColor: '#CCCCCC',
						paddingLeft: '5%',
					}}
				></View>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingLeft: '5%',
						paddingTop: '3%',
					}}
				>
					<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
						Điện thoại
					</Text>
					<View style={{ flex: 0.2 }}></View>
					<View style={{ flex: 1, flexDirection: 'column' }}>
						<Text style={{ fontFamily: 'Roboto', fontSize: 15 }}>
							{profile.phoneNumber}
						</Text>
						<Text style={{ fontFamily: 'Roboto', fontSize: 12 }}>
							Số điện thoại chỉ hiện thị với người có lưu só bạn
							trong danh bạ máy
						</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 3 }}></View>

			{/* Modal */}
			<Modal isVisible={isModalVisible}>
				<View style={{ flex: 1 }}>
					<Text>Select a new profile picture</Text>
					<Button
						title="Select Image"
						onPress={handleImagePickerPress}
					/>
					<Button
						title="Close"
						onPress={() => setModalVisible(false)}
					/>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#CCCCCC',
	},
});
