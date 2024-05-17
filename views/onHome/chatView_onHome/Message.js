import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';

const Message = ({ message, sender, onPress }) => {
	const handleFileDownload = (fileUrl) => {
		alert('Không thể download được file này');
	};
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
					<View>
						<Image
							source={{ uri: message.content }}
							style={{ width: 100, height: 100 }}
						/>
					</View>
				) : message.type === 'notification' ? (
					<Text style={styles.notificationText}>
						{`${message.senderFullName} ${message.content}`}
					</Text>
				) : message.type === 'file' ? (
					<TouchableOpacity
						style={styles.downloadButton}
						onPress={() => handleFileDownload(message.content)}
					>
						<Text style={styles.downloadButtonText}>
							{message.content}
						</Text>
					</TouchableOpacity>
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

			{message.type !== 'notification' && !message.isRecalled && (
				<Image
					source={{
						uri: sender.profilePic,
					}}
					style={{
						height: 20,
						width: 20,
						borderRadius: 20,
						backgroundColor: 'white',
						margin: 10,
					}}
				/>
			)}
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	container: {
		flex: 1 + ' !important',
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
	downloadButton: {
		padding: 10,
		backgroundColor: '#0066cc',
		borderRadius: 5,
		alignItems: 'center',
		overflow: 'hidden',
	},
	downloadButtonText: {
		color: 'white',
		fontSize: 16,
	},
});
