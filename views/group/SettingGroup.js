import { View, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const SettingGroup = () => {
	const conversationDetails = useSelector(
		(state) => state.conservation?.conversationDetails
	);
	return (
		<View>
			<Text>SettingGroup</Text>
		</View>
	);
};

export default SettingGroup;
