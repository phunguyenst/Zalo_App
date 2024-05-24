import { useEffect } from 'react';
import { useSocketContext } from '../views/socketContext';
import { useDispatch, useSelector } from 'react-redux';
import {
	addMessage,
	recalledMessage,
	selectMessages,
} from '../views/slide/MessageSlide';
import {
	selectConversationSelected,
	setHaveNewMessageConversations,
} from '../views/slide/MessageSlide';

const useListenMessage = () => {
	const { socket } = useSocketContext();
	const dispatch = useDispatch();
	const messages = useSelector(selectMessages);
	const conversationSelected = useSelector(selectConversationSelected);

	useEffect(() => {
		const handleNewMessage = (newMessage) => {
			console.log(newMessage);
			if (
				conversationSelected.conversationId ===
				newMessage.conversationId
			) {
				dispatch(addMessage(newMessage));
			}
			dispatch(
				setHaveNewMessageConversations({
					conversationId: newMessage.conversationId,
					message: newMessage,
				})
			);
		};

		const handleRecallMessage = (updatedMessage) => {
			if (
				conversationSelected.conversationId ===
				updatedMessage.conversationId
			) {
				dispatch(recalledMessage(updatedMessage.messageId));
			}
			dispatch(
				setHaveNewMessageConversations({
					conversationId: updatedMessage.conversationId,
					message: updatedMessage,
				})
			);
		};

		socket?.on('newMessage', handleNewMessage);
		socket?.on('recallMessage', handleRecallMessage);

		return () => {
			socket?.off('newMessage', handleNewMessage);
			socket?.off('recallMessage', handleRecallMessage);
		};
	}, [socket, dispatch, conversationSelected.conversationId]);
};

export default useListenMessage;
