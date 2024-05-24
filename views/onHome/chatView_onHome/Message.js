import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const Message = ({ message, sender, onPress }) => {
	const profile = useSelector((state) => state.profile.profile);
	const handleFileDownload = () => {
		alert(
			'Bạn không thể tải được file này trên động, vui lòng dùng bản web'
		);
	};

	const isNotification = message.type === 'notification';
	const isRecalled = message.isRecalled;
	const isMyMessage = message.isMyMessage;

	return (
		<View
			style={[
				styles.container,
				isNotification
					? styles.centeredContainer
					: isMyMessage
					? {}
					: styles.rowReverse,
			]}
		>
			{!isNotification && !isRecalled && (
				<TouchableOpacity onPress={() => onPress(message)}>
					<Entypo name="dots-three-vertical" size={20} color="gray" />
				</TouchableOpacity>
			)}

			<View
				style={[
					styles.messageContainer,
					isMyMessage ? styles.myMessage : styles.otherMessage,
					isNotification ? styles.notificationMessage : {},
				]}
			>
				{isRecalled ? (
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
						{`${message.senderFullName || 'Bạn'} ${
							message.content
						}`}
					</Text>
				) : message.type === 'file' ? (
					<TouchableOpacity
						style={styles.downloadButton}
						onPress={() => handleFileDownload(message.content)}
					>
						<AntDesign name="file1" size={20} color="white" />
						<Text style={{ marginLeft: 10 }}>Tập tin</Text>
					</TouchableOpacity>
				) : (
					<Text
						style={{
							fontSize: 16,
							color: isMyMessage ? 'white' : 'black',
						}}
					>
						{message.content}
					</Text>
				)}
			</View>

			{!isNotification && !isRecalled && sender && !isMyMessage && (
				<Image
					source={{ uri: sender.profilePic }}
					style={styles.profilePic}
				/>
			)}
		</View>
	);
};

export default Message;

const styles = StyleSheet.create({
	container: {
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
		maxWidth: '60%',
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
		alignItems: 'center',
		overflow: 'hidden',
		flexDirection: 'row',
	},
	downloadButtonText: {
		color: 'white',
		fontSize: 16,
	},
	profilePic: {
		height: 20,
		width: 20,
		borderRadius: 20,
		backgroundColor: 'white',
		margin: 10,
	},
});
