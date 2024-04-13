import React, { useEffect, useState } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	FlatList,
	TouchableOpacity,
	Text,
} from 'react-native';
import { Avatar, Badge, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import conversationApi from '../../api/conversationApi';
import { setConversationDetails } from '../slide/ConsevationSlide';

const ChatView = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const [listConversation, setListConversation] = useState([]);
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const response = await conversationApi.getConversations();
				setListConversation(response.conversations);
			} catch (error) {
				console.error('Error fetching conversations:', error);
			}
		};

		fetchConversations();
	}, []);

	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<ScrollView nestedScrollEnabled>
				<FlatList
					data={listConversation}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									dispatch(setConversationDetails(item));
									navigation.navigate('ChatDetail');
								}}
							>
								<Card>
									<Card.Content>
										<View
											style={{
												flex: 1,
												flexDirection: 'row',
												alignItems: 'center',
											}}
										>
											<Avatar.Image
												size={55}
												source={{
													uri:
														item.participantIds
															.length > 2
															? item?.avatar
															: item?.membersInfo?.find(
																	(member) =>
																		member.userID !==
																		profile?.userID
															  )?.profilePic,
												}}
												style={{ marginRight: 10 }}
											/>

											<View style={{ flex: 1 }}>
												<Card.Title
													title={
														item.participantIds
															.length > 2
															? item?.name
															: item?.membersInfo?.find(
																	(member) =>
																		member.userID !==
																		profile?.userID
															  )?.name
													}
													subtitle={
														item.lastMessage
															?.content ||
														'Chưa có tin nhắn nào'
													}
													titleStyle={{
														fontSize: 18,
													}}
													subtitleStyle={{
														fontSize: 15,
													}}
												/>
											</View>
										</View>
									</Card.Content>
								</Card>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => item.conversationId}
				/>
			</ScrollView>
		</View>
	);
};

export default ChatView;
