import {
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	TouchableOpacity,
} from 'react-native';
import userApi from '../api/userApi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FriendInfo({ route, navigation }) {
	const dispatch = useDispatch();
	const profile = useSelector((state) => state.profile.profile);
	const { friendId, friendName, friendAvatar } = route.params;
	const handleFriendRequest = async () => {
		try {
			await userApi.sentRequestAddFriend(profile?.userID, friendId);
			navigation.navigate('Home');
		} catch (error) {
			console.error('Error when sent friend request:', error);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Image
				source={{ uri: friendAvatar }}
				style={{
					width: 200,
					height: 200,
					borderRadius: 100,
					marginTop: 40,
				}}
			/>
			<Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 20 }}>
				{friendName}
			</Text>
			<View style={{ flexDirection: 'row', marginTop: 20 }}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ChatDetail');
					}}
					style={{
						backgroundColor: 'white',
						padding: 10,
						borderRadius: 10,
						marginRight: 10,
						borderWidth: 1,
						borderColor: '#139afc',
					}}
				>
					<Text>Nhắn tin</Text>
				</TouchableOpacity>
				{!profile.listRequestAddFriendsSent.find(
					(req) => req === friendId
				) && (
					<TouchableOpacity
						onPress={handleFriendRequest}
						style={{
							backgroundColor: '#139afc',
							padding: 10,
							borderRadius: 10,
						}}
					>
						<Text style={{ color: 'white' }}>Gửi kết bạn</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}
