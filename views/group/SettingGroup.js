import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddMember from './ModalAddMember';
import conversationApi from '../../api/conversationApi';
import { updateConversationMembers } from '../slide/ConsevationSlide';

const SettingGroup = () => {
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const conversationDetails = useSelector(
		(state) => state.conservation?.conversationDetails
	);

	const handlerAddMember = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const handlerConfirmAddMembers = async (checkedFriends) => {
		try {
			const res = await conversationApi.addMemberIntoGroup(
				conversationDetails.conversationId,
				checkedFriends
			);
			console.log(res);
			if (res) {
				dispatch(
					updateConversationMembers({
						addedParticipantIds: res.resData.addedParticipantIds,
						membersInfo: res.resData.membersInfo,
					})
				);
			}
		} catch (error) {
			console.error('Error when add member: ', error);
		} finally {
			setModalVisible(false);
		}
	};
	const handlerShowListMember = () => {};
	const handlerRemoveHistory = () => {};
	const handlerLeaveGroup = () => {};

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: conversationDetails.avatar }}
				style={styles.avatar}
			/>
			<Text style={styles.groupName}>{conversationDetails.name}</Text>
			<Text style={styles.memberCount}>
				Members: {conversationDetails.participantIds.length}
			</Text>
			<View style={styles.option}>
				<TouchableOpacity
					style={styles.optionItem}
					onPress={handlerAddMember}
				>
					<Text>Thêm thành viên</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.optionItem}
					onPress={handlerShowListMember}
				>
					<Text>Danh sách thành viên</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.optionItem}
					onPress={handlerRemoveHistory}
				>
					<Text style={{ color: 'red' }}>Xóa lịch sử trò chuyện</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.optionItem}
					onPress={handlerLeaveGroup}
				>
					<Text style={{ color: 'red' }}>Rời khỏi nhóm</Text>
				</TouchableOpacity>
			</View>
			<ModalAddMember
				isVisible={modalVisible}
				onClose={closeModal}
				onConfirm={handlerConfirmAddMembers}
			/>
		</View>
	);
};

export default SettingGroup;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'white',
	},
	groupName: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	memberCount: {
		fontSize: 16,
		color: 'gray',
		marginBottom: 20,
	},
	option: {
		borderTopWidth: 1,
		flex: 1,
		width: '100%',
	},
	optionItem: {
		alignItems: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10,
		borderColor: 'gray',
		borderBottomWidth: 0.01,
	},
	friendListItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
	closeButton: {
		alignItems: 'center',
		backgroundColor: '#ddd',
		padding: 10,
	},
});
