import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import React from 'react';

const Message = ({ message, onPress }) => {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: message.isMyMessage ? 'row' : 'row-reverse',
				alignItems: 'center',
				justifyContent: 'flex-end',
			}}
		>
			{!message.isRecalled && (
				<TouchableOpacity onPress={() => onPress(message)}>
					<Entypo name="dots-three-vertical" size={20} color="gray" />
				</TouchableOpacity>
			)}

			<View
				style={[
					styles.messageContainer,
					message.isMyMessage
						? styles.myMessage
						: styles.otherMessage,
				]}
			>
				{message.isRecalled ? (
					<Text
						style={{
							fontSize: 16,
							color: 'gray',
						}}
					>
						Tin nhắn đã bị thu hồi
					</Text>
				) : message.type === 'image' ? (
					<Image
						source={{ uri: message.content }}
						style={{ width: 200, height: 200 }}
					/>
				) : (
					<Text
						style={{
							fontSize: 16,
							color: message.isMyMessage ? 'white' : 'black',
						}}
					>
						{message.content}
					</Text>
				)}
			</View>
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	messageContainer: {
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		maxWidth: '80%',
	},
	myMessage: {
		alignSelf: 'flex-end',
		backgroundColor: '#0091ff',
		color: 'white',
	},
	otherMessage: {
		backgroundColor: 'lightgray',
		color: 'black',
	},
});
