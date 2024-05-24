import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderChat = ({ navigation }) => {
	const conversationDetails = useSelector(
		(state) => state.conservation.conversationDetails
	);
	const [participantCount, setParticipantCount] = useState(conversationDetails.participantIds.length);
	const profile = useSelector((state) => state.profile.profile);
	const handlerSetting = () => {
		navigation.navigate('Setting');
	};
	useEffect(() => {
		setParticipantCount(conversationDetails.participantIds.length);
	}, [conversationDetails.participantIds.length]);
	return (
		<SafeAreaView style={styles.safeArea}>
			<LinearGradient
				colors={['#247bfe', '#139afc', '#02b9fa']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={styles.linearGradient}
			>
				<View style={styles.container}>
					<TouchableOpacity onPress={() => navigation.navigate("Home")}>
						<AntDesign name="arrowleft" size={24} color="white" />
					</TouchableOpacity>
					<Image
						source={{
							uri:
								conversationDetails?.participantIds.length > 2
									? conversationDetails.avatar
									: conversationDetails?.membersInfo?.find(
										(member) =>
											member.userID !== profile?.userID
									)?.profilePic,
						}}
						style={styles.profilePic}
					/>

					<View style={styles.textContainer}>
						<Text style={styles.nameText}>
							{conversationDetails?.participantIds.length > 2
								? conversationDetails.name
								: conversationDetails?.membersInfo?.find(
									(member) =>
										member.userID !== profile?.userID
								)?.fullName}
						</Text>
						{participantCount > 2 && (
							<Text style={styles.participantText}>{participantCount} thành viên</Text>
						)}
					</View>
					<View style={styles.iconContainer}>
						<TouchableOpacity style={styles.icon}>
							<Feather name="phone" size={20} color="white" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon}>
							<Feather name="video" size={20} color="white" />
						</TouchableOpacity>
						<TouchableOpacity style={styles.icon} onPress={handlerSetting}>
							<Ionicons name="options" size={20} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: '#247bfe',
	},
	linearGradient: {
		height: 60,
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profilePic: {
		height: 40,
		width: 40,
		borderRadius: 20,
		backgroundColor: 'white',
		marginLeft: 20,
	},
	textContainer: {
		flex: 1,
		marginLeft: 20,
	},
	nameText: {
		fontSize: 20,
		color: 'white',
	},
	participantText: {
		color: 'white',
	},
	iconContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	icon: {
		marginHorizontal: 10,
	},
});

export default HeaderChat;
