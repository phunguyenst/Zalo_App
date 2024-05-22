import axios from 'axios';
import queryString from 'query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';
console.log("processssss",process.env["REACT_APP_BACKEND_PORT"]);
const axiosClient = axios.create({
	baseURL: process.env["REACT_APP_BACKEND_PORT"] + "/api",
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
	const token = await AsyncStorage.getItem('authorization');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(res) => {
		if (res.headers.authorization) return res;
		else if (res && res.data) {
			return res.data;
		}
		return res;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
