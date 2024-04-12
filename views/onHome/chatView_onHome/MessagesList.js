import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readMessage } from '../../slide/MessageSlide';

const MessagesList = () => {
	const scrollViewRef = useRef();
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.message.messages);

	//đồng bộ tin nhắn
	useEffect(() => {
		dispatch(readMessage(messages));
	}, [dispatch, messages]);

	//đếm số tin nhắn cần hiển thị
	const handleScroll = (event) => {
		const { layoutMeasurement, contentOffset, contentSize } =
			event.nativeEvent;
		const isAtBottom =
			layoutMeasurement.height + contentOffset.y >= contentSize.height;
		if (isAtBottom) {
			setNumMessagesToShow((prevNum) => prevNum + 6);
		}
	};
	//scroll xuống cuối khi có tin nhắn mới
	const handleContentSizeChange = (contentWidth, contentHeight) => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	};
	//scroll xuống cuối khi có tin nhắn mới
	useEffect(() => {
		scrollViewRef.current.scrollToEnd({ animated: true });
	}, [messages]);

	console.log('Danh sách tin nhắn: ', messages);
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					padding: 10,
				}}
				ref={scrollViewRef}
				onContentSizeChange={handleContentSizeChange}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			>
				{messages.map((message, index) => (
					<View
						key={index}
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
									color: message.isMyMessage
										? 'white'
										: 'black',
								}}
							>
								{message.content}
							</Text>
						)}
					</View>
				))}
			</ScrollView>
		</View>
	);
};

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

export default MessagesList;
