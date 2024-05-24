import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import socketService from '../utils/socketService';
const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const profile = useSelector((state) => state.profile.profile);

	useEffect(() => {
		if (profile) {
			socketService.initialize(profile.userID); // Initialize with userId
			setSocket(socketService.socket);

			// Set up the event listener for getOnlineUsers
			socketService.onMessage('getOnlineUsers', (users) => {
				setOnlineUsers(
					users.filter((_user) => _user !== profile.userID)
				);
			});
		}

		return () => {
			// Dọn dẹp khi unmount
			socketService.disconnect();
		};
	}, [profile]);
	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
