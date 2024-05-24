import io from 'socket.io-client';
import { REACT_APP_BACKEND_PORT } from '@env';
const socketService = {
	socket: null,

	initialize(userId) {
		this.socket = io(REACT_APP_BACKEND_PORT || 'http://localhost:5000', {
			query: { userId },
		});
	},

	onMessage(event, callback) {
		if (this.socket) {
			this.socket.on(event, callback);
		}
	},

	sendMessage(event, data) {
		if (this.socket) {
			this.socket.emit(event, data);
		}
	},

	disconnect() {
		if (this.socket) {
			this.socket.disconnect();
		}
	},
};

export default socketService;
