import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../views/socketContext';

import {
	newConversation,
	deleteConversation,
	addMemberToConversation,
	removeMemberFromConversation,
	changeOwnerOfConversation,
	leaveConversation,
	updateConversationAfterAcceptingAddFriend,
	setConversationDetails,
	setConversations,
} from '../views/slide/ConsevationSlide';

const useListenConversation = () => {
	const { socket } = useSocket();
	const dispatch = useDispatch();
	const conversationSelected = useSelector(
		(state) => state.conservation?.conversationDetails
	);
	const conversations = useSelector(
		(state) => state.conservation.conversations
	);

	useEffect(() => {
		socket?.on('newConversation', (newConversationData) => {
			dispatch(newConversation(newConversationData));
		});

		socket?.on('deleteConversation', (conversationId) => {
			dispatch(deleteConversation(conversationId));
		});

		socket?.on('addMemberIntoConversation', (resData) => {
			dispatch(addMemberToConversation(resData));
		});

		socket?.on('removeMemberOutOfConversation', (resData) => {
			dispatch(removeMemberFromConversation(resData));
		});

		socket?.on('changeOwnerOfConversation', (resData) => {
			dispatch(changeOwnerOfConversation(resData));
		});

		socket?.on('leaveConversation', (resData) => {
			dispatch(leaveConversation(resData));
		});

		socket?.on('updateConversationAfterAcceptingAddFriend', (data) => {
			dispatch(updateConversationAfterAcceptingAddFriend(data));
		});

		return () => {
			socket?.off('newConversation');
			socket?.off('deleteConversation');
			socket?.off('addMemberIntoConversation');
			socket?.off('removeMemberOutOfConversation');
			socket?.off('changeOwnerOfConversation');
			socket?.off('leaveConversation');
			socket?.off('updateConversationAfterAcceptingAddFriend');
		};
	}, [socket, dispatch]);
};

export default useListenConversation;
