import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
const HeaderChat = ({ navigation }) => {
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const profile = useSelector((state) => state.profile.profile);

	return (
		<LinearGradient
			colors={['#247bfe', '#139afc', '#02b9fa']}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={{
				height: 60,
				justifyContent: 'center',
				paddingHorizontal: 10,
			}}
		>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>

				<View style={{ flex: 1 }}>
					<Text
						style={{ fontSize: 20, color: 'white', marginLeft: 20 }}
					>
						{conversationDetails.length > 2
							? conversationDetails.name
							: conversationDetails?.membersInfo?.find(
									(member) =>
										member.userID !== profile?.userID
							  )?.fullName}
					</Text>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<TouchableOpacity
						style={{ marginRight: 10, marginLeft: 10 }}
					>
						<Feather name="phone" size={20} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginRight: 10, marginLeft: 10 }}
					>
						<Feather name="video" size={20} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginRight: 10, marginLeft: 10 }}
					>
						<Ionicons name="options" size={20} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</LinearGradient>
	);
};

export default HeaderChat;
