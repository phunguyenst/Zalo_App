import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import React, { useState } from 'react';

const Message = ({ message }) => {
	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);
	return (
		<PaperProvider>
			<View
				style={[
					styles.messageContainer,
					message.isMyMessage
						? styles.myMessage
						: styles.otherMessage,
				]}
			>
				{message.type === 'image' ? (
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
		</PaperProvider>
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
		backgroundColor: '#139afc',
		color: 'white',
	},
	otherMessage: {
		alignSelf: 'flex-start',
		backgroundColor: 'lightgray',
		color: 'black',
	},
});
