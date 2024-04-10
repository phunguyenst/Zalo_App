import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readMessage } from '../../slide/MessageSlide';
import Message from './Message';

const MessagesList = () => {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.message.messages);

	useEffect(() => {
		dispatch(readMessage(messages));
	}, [dispatch, messages]);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{
					padding: 10,
				}}
			>
				{messages.map((message) => (
					<Message message={message} />
				))}
			</ScrollView>
		</View>
	);
};

export default MessagesList;
