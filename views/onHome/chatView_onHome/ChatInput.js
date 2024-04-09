import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import messageApi from '../../../api/messageApi';
import { addMessage } from '../../slide/MessageSlide';

const ChatInput = () => {
	const [message, setMessage] = useState('');
	const [showEmojiSelector, setShowEmojiSelector] = useState(false); // State để kiểm soát hiển thị EmojiSelector
	const dispatch = useDispatch();
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const profile = useSelector((state) => state.profile.profile);

	const sendMessage = async () => {
		try {
			// Gửi tin nhắn đến API
			const res = await messageApi.sendMessage({
				conversationId: conversationDetails.conversationId,
				content: message,
				type: 'text',
			});

			if (res) {
				dispatch(
					addMessage({
						content: message,
						senderId: profile.userID,
						isMyMessage: true,
					})
				);
			}

			// Xóa nội dung tin nhắn khỏi trường nhập
			setMessage('');
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	return (
		<View style={{ justifyContent: 'center', backgroundColor: 'white' }}>
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
			{/* Hiển thị EmojiSelector nếu showEmojiSelector là true */}
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
