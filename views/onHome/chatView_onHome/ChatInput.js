import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import EmojiSelector from 'react-native-emoji-selector';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import messageApi from '../../../api/messageApi';
import { addMessage } from '../../slide/MessageSlide';
import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'react-native-document-picker';

const ChatInput = () => {
	const [message, setMessage] = useState('');
	const [imageUri, setImageUri] = useState(null);
	const [showEmojiSelector, setShowEmojiSelector] = useState(false);
	const dispatch = useDispatch();
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const profile = useSelector((state) => state.profile.profile);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});
		if (!result.canceled) {
			setMessage('');
			setImageUri(result.assets[0].uri);
		}
	};

	const sendMessage = async (content, type) => {
		try {
			let data = new FormData();

			if (type === 'image') {
				let base64 = await getBase64Image(imageUri);
				let filename = 'image.jpg';
				let imageType = 'image/jpg';
				data.append('content', filename);
				data.append('file', {
					uri: imageUri,
					name: filename,
					type: imageType,
				});

				const response = await messageApi.sendMessage({
					conversationId: conversationDetails.conversationId,
					content: imageUri,
					type: 'image',
				});
				if (response) {
					dispatch(
						addMessage({
							content: imageUri,
							senderId: profile.userID,
							isMyMessage: true,
							type: 'image',
						})
					);
					setImageUri('');
				}
			}

			if (type === 'text') {
				const response = await messageApi.sendMessage({
					conversationId: conversationDetails.conversationId,
					content: message,
					type: 'text',
				});
				if (response.message) {
					dispatch(
						addMessage({
							...response.message[0],
							isMyMessage: true,
						})
					);
					setMessage('');
				}
			}
		} catch (error) {
			console.error('Error when sent message: ', error);
		}
	};

	const getBase64Image = async (imageUri) => {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.onload = function () {
				let reader = new FileReader();
				reader.onloadend = function () {
					resolve(reader.result.split(',')[1]);
				};
				reader.onerror = reject;
				reader.readAsDataURL(xhr.response);
			};
			xhr.onerror = reject;
			xhr.responseType = 'blob';
			xhr.open('GET', imageUri, true);
			xhr.send(null);
		});
	};

	return (
		<View
			style={{
				justifyContent: 'center',
				backgroundColor: 'white',
			}}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					padding: 10,
					position: 'relative',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						backgroundColor: '#f0f0f0',
						marginRight: 10,
						borderRadius: 30,
						alignItems: 'center',
						flex: 1,
						paddingHorizontal: 15,
					}}
				>
					<TouchableOpacity
						onPress={() => setShowEmojiSelector(!showEmojiSelector)}
					>
						<MaterialCommunityIcons
							name="emoticon-outline"
							size={24}
							color="black"
						/>
					</TouchableOpacity>
					<TextInput
						placeholder="Type a message"
						style={{
							backgroundColor: 'transparent',
							color: 'black',
							fontSize: 16,
							alignSelf: 'center',
							outlineWidth: 0,
							padding: 10,
							flex: 1,
						}}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
					{imageUri && (
						<View
							style={{
								position: 'absolute',
								bottom: 120,
								left: 10,
								height: 100,
								width: 200,
							}}
						>
							{/* <Text> chọn ảnh</Text> */}
							<Image
								source={{ uri: imageUri }}
								style={{
									width: 200,
									height: 100,
								}}
							/>
						</View>
					)}
					<TouchableOpacity>
						<Feather name="paperclip" size={20} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={pickImage}>
						<Feather name="image" size={20} color="black" />
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					style={{
						borderRadius: 20,
						height: 40,
						width: 40,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#139afc',
					}}
					onPress={() => {
						if (imageUri) {
							sendMessage(imageUri, 'image');
						} else if (message.trim() !== '') {
							sendMessage(message, 'text');
						}
					}}
				>
					<MaterialCommunityIcons
						name={'send'}
						size={20}
						color="white"
					/>
				</TouchableOpacity>
			</View>
			{showEmojiSelector && (
				<EmojiSelector
					onEmojiSelected={(emoji) => setMessage(message + emoji)}
					showSearchBar={false} // Tùy chỉnh các thuộc tính khác theo nhu cầu của bạn
				/>
			)}
		</View>
	);
};

export default ChatInput;
