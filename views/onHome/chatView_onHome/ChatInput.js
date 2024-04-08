import { View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import messageApi from '../../../api/messageApi';
import { addMessage } from '../../slide/MessageSlide';

const ChatInput = () => {
	const [message, setMessage] = useState('');
	const dispatch = useDispatch();
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const profile = useSelector((state) => state.profile.profile);

	const sendMessage = async () => {
		try {
			// Gửi tin nhắn đến API
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

			// Xóa nội dung tin nhắn khỏi trường nhập
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
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
					></TextInput>
					<TouchableOpacity>
						<Feather name="paperclip" size={20} color="black" />
					</TouchableOpacity>
					<TouchableOpacity>
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
					onPress={sendMessage}
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
