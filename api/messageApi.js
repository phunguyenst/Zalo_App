import axiosClient from './axiosClient';

const messageApi = {
	sendMessage: (data) => {
		const url = '/message';
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		let formData = new FormData();
		formData.append('conversationId', data.conversationId);
		if (data.type === 'image') {
            formData.append('content', data.content, 'image.png');
        } else {
            formData.append('content', data.content);
        }
		formData.append('type', data.type);
		return axiosClient.post(url, formData, config);
	},
	getMessages: (conversationId) => {
		const url = `/message/${conversationId}`;
		return axiosClient.get(url);
	},
	recallMessage: (messageId) => {
		const url = `/message/recall-message/${messageId}`;
		return axiosClient.patch(url);
	},
	deleteMessageForMeOnly: (messageId) => {
		const url = `/message/delete-message-for-me-only/${messageId}`;
		return axiosClient.patch(url);
	},
	shareMessage: (data) => {
		const url = `/message/share-message`;
		return axiosClient.post(url, data);
	},
};

export default messageApi;
