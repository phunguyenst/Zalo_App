import React, { useEffect } from 'react';
import {
	View,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import { Avatar, Badge, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import conversationApi from '../../api/conversationApi';
import {
	setConversationDetails,
	setConversations,
} from '../slide/ConsevationSlide';
import { useSocket } from '../socketContext';

const ChatView = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const conversations = useSelector(
		(state) => state.conservation.conversations
	);
	const profile = useSelector((state) => state.profile.profile);
	const { socket, onlineUsers } = useSocket();
	console.log(onlineUsers);
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const res = await conversationApi.getConversations();
				if (res) {
					dispatch(setConversations(res.conversations));
				}
			} catch (error) {
				console.error('Error fetching conversations:', error);
			}
		};

		fetchConversations();
		const unsubscribe = navigation.addListener('focus', () => {
			fetchConversations();
		});
		return unsubscribe;
	}, [dispatch, navigation]);

	const isUserOnline = (userId) => {
		return onlineUsers?.includes(userId);
	};
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView nestedScrollEnabled>
				<FlatList
					data={conversations}
					renderItem={({ item }) => {
						const userId =
							item.participantIds.length > 2
								? null
								: item.membersInfo?.find(
										(member) =>
											member?.userID !== profile?.userID
								  )?.userID;

						const userIsOnline = isUserOnline(userId);

						return (
							<TouchableOpacity
								onPress={() => {
									dispatch(setConversationDetails(item));
									navigation.navigate('ChatDetail');
								}}
							>
								<Card>
									<Card.Content style={styles.cardContent}>
										<Avatar.Image
											size={40}
											source={{
												uri:
													item.participantIds.length >
													2
														? item.avatar
														: item.membersInfo?.find(
																(member) =>
																	member?.userID !==
																	profile?.userID
														  )?.profilePic,
											}}
											style={styles.avatar}
										/>
										{userIsOnline && (
											<View
												style={{
													position: 'absolute',
													width: 10,
													height: 10,
													bottom: 30,
													left: 45,
													borderRadius: 10,
													backgroundColor: 'green',
												}}
											></View>
										)}
										<View style={{ flex: 1 }}>
											<Card.Title
												title={
													item.participantIds.length >
													2
														? item.name
														: item.membersInfo?.find(
																(member) =>
																	member?.userID !==
																	profile?.userID
														  )?.fullName
												}
												subtitle={
													!item.lastMessage?.content
														? 'Chưa có tin nhắn nào'
														: item.lastMessage
																?.type ===
														  'file'
														? 'Tập tin mới'
														: item.lastMessage
																?.content
												}
												titleStyle={styles.cardTitle}
											/>
										</View>
									</Card.Content>
								</Card>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.conversationId.toString()}
				/>
			</ScrollView>
		</View>
	);
};

export default ChatView;

const styles = StyleSheet.create({
	cardContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		marginRight: 10,
	},
	cardTitle: {
		fontSize: 16,
	},
	onlineBorder: {
		borderColor: 'green',
		borderWidth: 2,
	},
});
