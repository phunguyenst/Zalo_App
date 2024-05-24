import { createSlice } from '@reduxjs/toolkit';

const conservationSlide = createSlice({
	name: 'conservation',
	initialState: {
		conversations: [],
		loading: false,
		error: '',
		conversationDetails: null,
		newMessages: [],
	},
	reducers: {
		readConversation: (state, action) => {
			state.conversations = action.payload;
		},
		setConversations: (state, action) => {
			state.conversations = action.payload;
		},
		setConversationDetails: (state, action) => {
			state.conversationDetails = action.payload;
		},
		updateConversationMembers: (state, action) => {
			if (state.conversationDetails) {
				state.conversationDetails = {
					...state.conversationDetails,
					participantIds: [
						...state.conversationDetails.participantIds,
						...action.payload.addedParticipantIds,
					],
					membersInfo: [
						...state.conversationDetails.membersInfo,
						...action.payload.membersInfo,
					],
				};
			}
		},
		removeConversation: (state, action) => {
			if (
				state.conversationDetails &&
				state.conversationDetails.conversationId ===
					action.payload.conversationId
			) {
				state.conversationDetails = null;

				state.conversations = state.conversations.filter(
					(conversation) =>
						conversation.conversationId !==
						action.payload.conversationId
				);
			}
		},
	},
	addMemberToConversation: (state, action) => {
		const { conversationId, addedParticipantIds, membersInfo, messages } =
			action.payload;
		const conversation = state.conversations.find(
			(c) => c.conversationId === conversationId
		);
		if (conversation) {
			conversation.participantIds.push(...addedParticipantIds);
			conversation.membersInfo.push(...membersInfo);
			if (state.conversationDetails?.conversationId === conversationId) {
				state.conversationDetails = conversation;
			}
			state.newMessages.push({
				conversationId,
				message: messages[messages.length - 1],
			});
		}
	},
	removeMemberFromConversation: (state, action) => {
		const { conversationId, removedUserId, savedMessage } = action.payload;
		const conversation = state.conversations.find(
			(c) => c.conversationId === conversationId
		);
		if (conversation) {
			conversation.participantIds = conversation.participantIds.filter(
				(id) => id !== removedUserId
			);
			conversation.membersInfo = conversation.membersInfo.filter(
				(member) => member.userID !== removedUserId
			);
			if (state.conversationDetails?.conversationId === conversationId) {
				state.conversationDetails = conversation;
			}
			state.newMessages.push({ conversationId, message: savedMessage });
		}
	},
	changeOwnerOfConversation: (state, action) => {
		const { conversationId, participantIds, membersInfo, savedMessage } =
			action.payload;
		const conversation = state.conversations.find(
			(c) => c.conversationId === conversationId
		);
		if (conversation) {
			conversation.participantIds = participantIds;
			conversation.membersInfo = membersInfo;
			if (state.conversationDetails?.conversationId === conversationId) {
				state.conversationDetails = conversation;
			}
			state.newMessages.push({ conversationId, message: savedMessage });
		}
	},
	leaveConversation: (state, action) => {
		const {
			conversationId,
			membersInfo,
			updatedParticipantIds,
			savedMessages,
		} = action.payload;
		const conversation = state.conversations.find(
			(c) => c.conversationId === conversationId
		);
		if (conversation) {
			conversation.membersInfo = membersInfo;
			conversation.participantIds = updatedParticipantIds;
			if (state.conversationDetails?.conversationId === conversationId) {
				state.conversationDetails = conversation;
			}
			state.newMessages.push({
				conversationId,
				message: savedMessages[savedMessages.length - 1],
			});
		}
	},
	updateConversationAfterAcceptingAddFriend: (state, action) => {
		const { conversation, savedMessage } = action.payload;
		const isExistedConversation = state.conversations.some(
			(c) => c.conversationId === conversation.conversationId
		);
		if (!isExistedConversation) {
			state.conversations.push(conversation);
		}
		if (
			state.conversationDetails?.conversationId ===
			conversation.conversationId
		) {
			state.conversationDetails = conversation;
		}
		state.newMessages.push({
			conversationId: conversation.conversationId,
			message: savedMessage,
		});
	},
});

export const {
	readConversation,
	setConversationDetails,
	setConversations,
	updateConversationMembers,
	removeConversation,
	newConversation,
	deleteConversation,
	addMemberToConversation,
	removeMemberFromConversation,
	changeOwnerOfConversation,
	leaveConversation,
	updateConversationAfterAcceptingAddFriend,
} = conservationSlide.actions;
export const setConversation = (state) => state.conservation.conversations;
export default conservationSlide.reducer;
