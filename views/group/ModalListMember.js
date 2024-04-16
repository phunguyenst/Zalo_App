import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import conversationApi from '../../api/conversationApi';

const ModalListMember = ({ isVisible, onClose, onConfirm }) => {
	const conversationDetails = useSelector(
		(state) => state.conservation?.conversationDetails
	);
	const [confirmVisible, setConfirmVisible] = useState(false);
	const [selectedMember, setSelectedMember] = useState(null);

	const handleMemberPress = (member) => {
		setSelectedMember(member);
		setConfirmVisible(true);
	};

	const handleRemoveMember = async () => {
		try {
			const res = await conversationApi.removeMemberFromGroup(
				conversationDetails.conversationId,
				selectedMember.userID
			);
			if (res) {
				console.log('res: ', res);
			}
		} catch (error) {
			console.error('error when remove member: ', error);
		} finally {
			setConfirmVisible(false);
		}
	};

	const renderMember = ({ item }) => {
		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => handleMemberPress(item)}
			>
				<Image
					source={{ uri: item.profilePic }}
					style={styles.profilePic}
				/>
				<Text style={styles.name}>{item.fullName}</Text>
				<Text>
					{
						conversationDetails.participantIds.find(
							(participant) =>
								item.userID === participant.participantId
						)?.role
					}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<Modal
			animationType="slide"
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View style={styles.modalView}>
				<FlatList
					data={conversationDetails.membersInfo}
					keyExtractor={(item) => item.userID.toString()}
					renderItem={renderMember}
				/>
				<TouchableOpacity style={styles.closeButton} onPress={onClose}>
					<Text>Đóng</Text>
				</TouchableOpacity>
			</View>
			{/* Confirmation Modal */}
			<Modal
				visible={confirmVisible}
				transparent={true}
				animationType="fade"
				onRequestClose={() => setConfirmVisible(false)}
			>
				<View style={styles.centeredView}>
					<View style={styles.confirmationModal}>
						<Text style={styles.confirmationText}>
							Bạn có muốn xóa {selectedMember?.fullName}?
						</Text>
						<View style={styles.buttonRow}>
							<TouchableOpacity
								style={styles.confirmButton}
								onPress={handleRemoveMember}
							>
								<Text>Có</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.confirmButton}
								onPress={() => setConfirmVisible(false)}
							>
								<Text>Không</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</Modal>
	);
};

export default ModalListMember;

const styles = StyleSheet.create({
	modalView: {
		flex: 1,
		marginTop: 50,
		backgroundColor: 'white',
		padding: 20,
	},
	closeButton: {
		alignItems: 'center',
		backgroundColor: '#ddd',
		padding: 10,
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	name: {
		flex: 1,
		fontSize: 18,
	},
	// Additional styles for confirmation modal
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	confirmationModal: {
		backgroundColor: 'white',
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: '80%',
	},
	confirmationText: {
		fontSize: 16,
		marginBottom: 20,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	confirmButton: {
		padding: 10,
		backgroundColor: '#ddd',
		borderRadius: 5,
	},
});
