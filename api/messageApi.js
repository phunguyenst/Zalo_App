import axiosClient from './axiosClient';

const messageApi = {
	sendMessage: (data) => {
		const url = '/message';
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		return axiosClient.post(url, data, config);
	},
	getMessages: (conversationId) => {
		const url = `/message/${conversationId}`;
		return axiosClient.get(url);
	},
};

export default messageApi;
