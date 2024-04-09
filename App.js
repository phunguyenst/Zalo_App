import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './views/store';
import Navigator from './views/Navigator';
import socketService from './utils/socketService';

export default function App() {
	// useEffect(() => {
	// 	socketService.initializeSocket();
	// });
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Navigator />
			</NavigationContainer>
		</Provider>
	);
}
