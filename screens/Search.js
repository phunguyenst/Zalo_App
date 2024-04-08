import React from 'react';
import { View, Text, Image } from 'react-native';

const Search = ({ route }) => {
	if (!route.params || !route.params.searchResults) {
		return (
			<View style={{ marginTop: 20 }}>
				<Text style={{ textAlign: 'center' }}>
					Không có kết quả tìm kiếm
				</Text>
			</View>
		);
	}

	const { searchResults } = route.params;
	return (
		<View>
			{searchResults.map((result, index) => (
				<View
					style={{
						flexDirection: 'row',
						padding: 10,
						backgroundColor: 'white',
						borderBottomColor: '#eee',
						borderBottomWidth: 1,
					}}
				>
					<Image
						source={
							result && result.profilePic
								? { uri: result.profilePic }
								: require('../images/no-avatar.jpeg')
						}
						style={{
							width: 40,
							height: 40,
							borderRadius: 20,
							marginRight: 20,
						}}
					/>
					<View>
						<Text key={index}>{result?.fullName}</Text>
						<Text key={index}>{result?.phoneNumber}</Text>
					</View>
				</View>
			))}
		</View>
	);
};

export default Search;
