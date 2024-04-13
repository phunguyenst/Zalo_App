// import React, { useContext, useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from 'react-native';
// import { Button, Spinner } from 'native-base';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Camera } from 'expo-camera';
// import { ImagePicker } from 'expo-image-picker';
// import { toast, Toaster } from 'react-hot-toast';


// const AddGroupModal = ({ show, handleClose, recentlyConversations, friends }) => {
//     const [groupName, setGroupName] = useState('');
//     const [groupAvatar, setGroupAvatar] = useState(null);
//     const [friendSearchInput, setFriendSearchInput] = useState('');
//     const [checkedFriends, setCheckedFriends] = useState([]);
//     const [imagePreview, setImagePreview] = useState(null);
//     const { user } = useContext(AuthToken);
//     const handleCancelAddGroup = () => {
//         setFriendSearchInput('');
//         setGroupAvatar(null);
//         setCheckedFriends([]);
//         handleClose();
//     };

//     const handleImageChange = async () => {
//         const { status } = await Camera.requestPermissionsAsync();
//         if (status === 'granted') {
//             let result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [4, 3],
//                 quality: 1,
//             });
//             if (!result.cancelled) {
//                 setGroupAvatar(result.uri);
//                 setImagePreview(result.uri);
//             }
//         } else {
//             toast.error('Permission to access camera roll is required!');
//         }
//     };

//     const handleConversationClick = (userId) => {
//         setCheckedFriends((prevCheckedFriends) => {
//             if (prevCheckedFriends.includes(userId)) {
//                 return prevCheckedFriends.filter((id) => id !== userId);
//             } else {
//                 return [...prevCheckedFriends, userId];
//             }
//         });
//     };

//     const handleCreateGroup = async () => {
//         if (checkedFriends.length < 2) {
//             toast.error('Please select at least 2 friends to create a group');
//         } else if (groupName.trim() === '') {
//             toast.error('Please enter group name');
//         } else if (!groupAvatar) {
//             toast.error('Please select group avatar');
//         } else {
//             try {
//                 // Your API call to create conversation goes here
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     };

//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={show}
//             onRequestClose={handleCancelAddGroup}
//         >
//             <View style={styles.modalView}>
//                 <Toaster toastOptions={{ duration: 4000 }} />
//                 <View style={styles.rowView}>
//                     <Text>Tạo nhóm</Text>
//                     <TouchableOpacity onPress={handleCancelAddGroup}>
//                         <MaterialIcons name="cancel" size={24} color="black" />
//                     </TouchableOpacity>
//                 </View>
//                 {user ? (
//                     <View>
//                         <TouchableOpacity style={styles.groupAvatar} onPress={handleImageChange}>
//                             {groupAvatar ? (
//                                 <Image source={{ uri: groupAvatar }} style={{ width: 60, height: 60, borderRadius: 30 }} />
//                             ) : (
//                                 <MaterialIcons name="photo-camera" size={24} color="black" />
//                             )}
//                         </TouchableOpacity>
//                         <TextInput
//                             style={styles.groupNameInput}
//                             placeholder="Nhập tên nhóm..."
//                             value={groupName}
//                             onChangeText={(text) => setGroupName(text)}
//                         />
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholder="Nhập tên, số điện thoại hoặc danh sách số điện thoại"
//                             value={friendSearchInput}
//                             onChangeText={(text) => setFriendSearchInput(text)}
//                         />
//                         <FlatList
//                             data={recentlyConversations}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.conversationItem} onPress={() => handleConversationClick(item.anotherParticipantId)}>
//                                     <Text style={styles.conversationName}>Render conversation item</Text>
//                                 </TouchableOpacity>
//                             )}
//                             keyExtractor={(item) => item.anotherParticipantId}
//                         />
//                         <FlatList
//                             data={friends}
//                             renderItem={({ item }) => (
//                                 <TouchableOpacity style={styles.conversationItem} onPress={() => handleConversationClick(item.userID)}>
//                                     <Text style={styles.conversationName}>Render friend item</Text>
//                                 </TouchableOpacity>
//                             )}
//                             keyExtractor={(item) => item.userID}
//                         />
//                         <Button disabled={checkedFriends.length < 2} onPress={handleCreateGroup}>
//                             Tạo nhóm
//                         </Button>
//                     </View>
//                 ) : (
//                     <Spinner color="black" />
//                 )}
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 20,
//         marginHorizontal: 10,
//         backgroundColor: 'white',
//         borderRadius: 5,
//         padding: 20,
//     },
//     rowView: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     groupAvatar: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         borderWidth: 1,
//         borderColor: '#ccc',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     groupNameInput: {
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         marginTop: 10,
//         marginBottom: 10,
//         padding: 5,
//     },
//     searchInput: {
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//         marginTop: 10,
//         marginBottom: 10,
//         padding: 5,
//     },
//     conversationItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderColor: '#ccc',
//     },
//     conversationName: {
//         fontSize: 16,
//         marginLeft: 10,
//     },
// });

// export default AddGroupModal;
