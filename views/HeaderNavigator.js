import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HeaderNavigator = () => {
	const [searchValue, setSearchValue] = useState('');
	const navigation = useNavigation();

	const handleSearch = async () => {
		navigation.navigate('Search');
	};

	const handleCreateGroup = () => {
		navigation.navigate('CreateGroup');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<LinearGradient
				colors={['#247bfe', '#139afc', '#02b9fa']}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				style={styles.linearGradient}
			>
				<View style={styles.container}>
					<TouchableOpacity onPress={handleSearch}>
						<AntDesign name="search1" size={20} color="white" />
					</TouchableOpacity>
					<View style={styles.searchContainer}>
						<TouchableOpacity onPress={handleSearch}>
							<TextInput
								placeholder="Tìm kiếm"
								style={styles.searchInput}
								placeholderTextColor="white"
								value={searchValue}
								onChangeText={setSearchValue}
							/>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={handleCreateGroup}>
						<AntDesign name="addusergroup" size={20} color="white" />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: '#247bfe', 
	},
	linearGradient: {
		height: 60,
		justifyContent: 'center',
		paddingHorizontal: 10,
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchContainer: {
		flex: 1,
		marginHorizontal: 20,
	},
	searchInput: {
		marginHorizontal: 20,
		paddingHorizontal: 10,
		height: 40,
		borderWidth: 0,
		color: 'white',
	},
});

export default HeaderNavigator;
