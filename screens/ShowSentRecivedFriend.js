import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
	setProfile,
	setListRequestAddFriendsSent,
	setListRequestAddFriendsReceived,
} from '../views/slide/InfoUserSlide';
import userApi from '../api/userApi';

const ShowRequestAddFriend = ({ navigation }) => {
	const sentRequests = useSelector((state) => state.user?.sentRequests);
	const receivedRequests = useSelector(
		(state) => state.user?.receivedRequests
	);
	console.log('checkreceivedRequests', receivedRequests);
	const [selectedTab, setSelectedTab] = useState('Đã nhận');
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const handleAddFriend = async (friendId) => {
		try {
			const response = await userApi.addFriend(profile?.userID, friendId);

			navigation.navigate('Home');
		} catch (error) {
			console.error('Error when sent friend request:', error);
		}
	};

	return (
		<ScrollView nestedScrollEnabled>
			<View style={styles.container}>
				<View style={{ height: 75, flexDirection: 'row' }}>
					<TouchableOpacity
						style={{
							height: 40,
							width: '50%',
							alignItems: 'center',
							marginTop: 10,
							borderBottomWidth:
								selectedTab === 'Đã nhận' ? 2 : 0,
							borderBottomColor:
								selectedTab === 'Đã nhận'
									? '#006af5'
									: 'transparent',
						}}
						onPress={() => setSelectedTab('Đã nhận')}
					>
						<Text>Đã nhận</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							height: 40,
							width: '50%',
							alignItems: 'center',
							marginTop: 10,

							borderBottomWidth: selectedTab === 'Đã gửi' ? 2 : 0,
							borderBottomColor:
								selectedTab === 'Đã gửi'
									? '#006af5'
									: 'transparent',
						}}
						onPress={() => setSelectedTab('Đã gửi')}
					>
						<Text>Đã gửi</Text>
					</TouchableOpacity>
				</View>
				<View>
					{selectedTab === 'Đã gửi' ? (
						<View style={{ flex: 1 }}>
							<View style={{ flex: 8 }}>
								<FlatList
									data={sentRequests}
									renderItem={({ item }) => {
										return (
											<View>
												<View
													style={
														styles.headerContainer
													}
												>
													<Text
														style={
															styles.headerText
														}
													>
														{item.user.fullName}
													</Text>
												</View>

												<Card.Title
													title={item.user.fullName}
													left={(props) => (
														<Avatar.Image
															size={55}
															source={{
																uri: item.user
																	.profilePic,
															}}
															style={{
																marginRight: 10,
															}}
														/>
													)}
													right={(props) => (
														<View
															style={{
																flexDirection:
																	'row',
															}}
														>
															<TouchableOpacity
																style={{
																	borderRadius: 10,
																	backgroundColor:
																		'grey',
																	padding: 5,
																	margin: 5,
																	height: 35,
																	width: 70,
																	alignItems:
																		'center',
																	justifyContent:
																		'center',
																}}
															>
																<Text
																	style={{
																		color: 'white',
																	}}
																>
																	thu hồi
																</Text>
															</TouchableOpacity>
														</View>
													)}
												/>
											</View>
										);
									}}
								/>
							</View>
						</View>
					) : (
						<View>
							<View style={{ flex: 8 }}>
								<FlatList
									data={receivedRequests}
									renderItem={({ item }) => {
										return (
											<View>
												<View
													style={
														styles.headerContainer
													}
												>
													<Text
														style={
															styles.headerText
														}
													>
														{item.user.fullName}
													</Text>
												</View>

												<Card.Title
													title={item.user.fullName}
													left={(props) => (
														<Avatar.Image
															size={55}
															source={{
																uri: item.user
																	.profilePic,
															}}
															style={{
																marginRight: 10,
															}}
														/>
													)}
													right={(props) => (
														<View
															style={{
																flexDirection:
																	'row',
															}}
														>
															<TouchableOpacity
																onPress={() =>
																	handleAddFriend(
																		item
																			.user
																			.userID
																	)
																}
																style={{
																	borderRadius: 10,
																	backgroundColor:
																		'green',
																	padding: 5,
																	margin: 5,
																	height: 35,
																	width: 70,
																	alignItems:
																		'center',
																	justifyContent:
																		'center',
																}}
															>
																<Text
																	style={{
																		color: 'white',
																	}}
																>
																	đồng ý kết
																	bạn
																</Text>
															</TouchableOpacity>
															<TouchableOpacity
																style={{
																	borderRadius: 10,
																	backgroundColor:
																		'grey',
																	padding: 5,
																	margin: 5,
																	height: 35,
																	width: 70,
																	alignItems:
																		'center',
																	justifyContent:
																		'center',
																}}
															>
																<Text
																	style={{
																		color: 'white',
																	}}
																>
																	huỷ
																</Text>
															</TouchableOpacity>
														</View>
													)}
												/>
											</View>
										);
									}}
								/>
							</View>
						</View>
					)}
				</View>
			</View>
		</ScrollView>
	);
};

export default ShowRequestAddFriend;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
