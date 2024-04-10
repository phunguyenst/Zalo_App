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
	const dispatch = useDispatch();
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const profile = useSelector((state) => state.profile.profile);

	// const pickFile = async () => {
	//     try {
	//         const res = await DocumentPicker.pick({
	//             type: [DocumentPicker.types.allFiles],
	//         });

	//         console.log(
	//             res.uri,
	//             res.type,
	//             res.name,
	//             res.size
	//         );
	//     } catch (err) {
	//         if (DocumentPicker.isCancel(err)) {

	//         } else {
	//             throw err;
	//         }
	//     }
	// };
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			setMessage('');
			setImageUri(result.uri);
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
				dispatch(
					addMessage({
						content: imageUri,
						senderId: profile.userID,
						isMyMessage: true,
					})
				);
				console.log('type' + type);
				// setImageUri(null);
			}

			if (type === 'text') {
				console.log('type' + type);
				console.log('message' + message);
				const response = await messageApi.sendMessage({
					conversationId: conversationDetails.conversationId,
					content: message,
					type: 'text',
				});

				dispatch(
					addMessage({
						content: message,
						senderId: profile.userID,
						isMyMessage: true,
					})
				);
				// setMessage('');
			}
		} catch (error) {
			if (error.response) {
				console.error('Error status:', error.response.status);
				console.error('Error data:', error.response.data);
			} else if (error.request) {
				console.error('No response received:', error.request);
			} else {
				console.error('Error', error.message);
			}
			console.error('Error config:', error.config);
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
					<TouchableOpacity>
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
							<Text> chọn ảnh</Text>
							<Image
								source={{ uri: imageUri }}
								style={{
									width: 200,
									height: 100,
								}}
							/>
						</View>
					)}
					<TouchableOpacity
					//  onPress={pickFile}
					>
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
		</View>
	);
};

export default ChatInput;
