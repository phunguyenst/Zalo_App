import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

const Message = ({ message, onPress }) => {
	return (
		<View
			style={[
				styles.container,
				message.type === 'notification'
					? styles.centeredContainer
					: message.isMyMessage
					? {}
					: styles.rowReverse,
			]}
		>
			{message.type !== 'notification' && !message.isRecalled && (
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
					message.type === 'notification'
						? styles.notificationMessage
						: {},
				]}
			>
				{message.isRecalled ? (
					<Text style={styles.recalledMessage}>
						Tin nhắn đã bị thu hồi
					</Text>
				) : message.type === 'image' ? (
					<Image
						source={{ uri: message.content }}
						style={{ width: 200, height: 200 }}
					/>
				) : message.type === 'notification' ? (
					<Text style={styles.notificationText}>
						{`${message.senderFullName} ${message.content}`}
					</Text>
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
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginVertical: 5,
	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	centeredContainer: {
		justifyContent: 'center',
	},
	messageContainer: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderRadius: 8,
		maxWidth: '80%',
	},
	myMessage: {
		alignSelf: 'flex-end',
		backgroundColor: '#0091ff',
	},
	otherMessage: {
		backgroundColor: 'lightgray',
	},
	notificationMessage: {
		maxWidth: '100%',
		backgroundColor: 'transparent',
		alignSelf: 'center',
	},
	recalledMessage: {
		fontSize: 16,
		color: 'gray',
	},
	notificationText: {
		fontSize: 13,
		color: 'gray',
		textAlign: 'center',
		backgroundColor: '#ddd',
		borderRadius: 20,
		paddingHorizontal: 10,
	},
});
