import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:3000');

socket.on('connect', () => {
	console.log('Connected to server');
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('chat message', (msg) => {
	console.log('New message:', msg);
});

const sendMessage = (msg) => {
	socket.emit('chat message', msg);
};
export default socket;
