import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Button,
} from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
	setProfile,
	setListRequestAddFriendsSent,
	setListRequestAddFriendsReceived,
} from '../views/slide/InfoUserSlide';
import userApi from '../api/userApi';
import Modal from 'react-native-modal';

const ShowRequestAddFriend = ({ navigation }) => {
	const sentRequests = useSelector((state) => state.user?.sentRequests);
	const receivedRequests = useSelector(
		(state) => state.user?.receivedRequests
	);
	const [selectedTab, setSelectedTab] = useState('Đã nhận');
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const [isModalVisible, setModalVisible] = useState(false);
	const [modalMessage, setModalMessage] = useState('');
	const [modalCallback, setModalCallback] = useState(null);

	const showToast = (message, callback) => {
		setModalMessage(message);
		setModalCallback(() => callback);
		setModalVisible(true);
	};

	const hideModal = () => {
		setModalVisible(false);
		if (modalCallback) {
			modalCallback();
			setModalCallback(null);
		}
	};

	const handleAddFriend = async (friendId) => {
		try {
			await userApi.addFriend(profile?.userID, friendId);
			showToast('kết bạn thành công', () => navigation.navigate('Home'));
		} catch (error) {
			console.error('Error when sending friend request:', error);
			showToast('kết bạn thất bại');
		}
	};

	const handleCancelFriend = async (friendId) => {
		try {
			await userApi.cancelRequestAddFriends(profile?.userID, friendId);
			showToast('huỷ yêu cầu kết bạn thành công', () =>
				navigation.navigate('Home')
			);
		} catch (error) {
			console.error('Error when canceling friend request:', error);
			showToast('huỷ yêu cầu kết bạn thất bại');
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
																onPress={() =>
																	handleCancelFriend(
																		item
																			.user
																			.userID
																	)
																}
															>
																<Text
																	style={{
																		backgroundColor:
																			'#139afc',
																		padding: 10,
																		borderRadius: 10,
																	}}
																>
																	Thu hồi
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
											<View style={styles.cardContainer}>
												<View
													style={
														styles.avatarContainer
													}
												>
													<Avatar.Image
														size={55}
														source={{
															uri: item.user
																.profilePic,
														}}
													/>
												</View>
												<View
													style={styles.infoContainer}
												>
													<Text
														style={styles.userName}
													>
														{item.user.fullName}
													</Text>
													<View
														style={
															styles.buttonContainer
														}
													>
														<TouchableOpacity
															style={[
																styles.button,
																{
																	backgroundColor:
																		'#139afc',
																},
															]}
															onPress={() =>
																handleAddFriend(
																	item.user
																		.userID
																)
															}
														>
															<Text
																style={{
																	color: 'white',
																}}
															>
																Đồng ý
															</Text>
														</TouchableOpacity>
														<TouchableOpacity
															style={[
																styles.button,
																{
																	backgroundColor:
																		'white',
																},
															]}
															onPress={() =>
																handleCancelFriend(
																	item.user
																		.userID
																)
															}
														>
															<Text
																style={{
																	color: 'red',
																}}
															>
																Hủy
															</Text>
														</TouchableOpacity>
													</View>
												</View>
											</View>
										);
									}}
								/>
							</View>
						</View>
					)}
				</View>
				<Modal isVisible={isModalVisible} onBackdropPress={hideModal}>
					<View style={{ backgroundColor: 'white', padding: 20 }}>
						<Text>{modalMessage}</Text>
						<Button title="Close" onPress={hideModal} />
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
};

export default ShowRequestAddFriend;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	cardContainer: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'flex-start',
	},
	avatarContainer: {
		marginRight: 10,
	},
	infoContainer: {
		flex: 1,
	},
	userName: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
	},
	button: {
		borderRadius: 10,
		padding: 5,
		margin: 5,
		height: 35,
		width: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
