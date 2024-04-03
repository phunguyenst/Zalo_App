import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, {useState, useEffect}from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { selectAuthorization } from "../../slide/LoginSlide";
import { useDispatch, useSelector } from "react-redux"
import { addMessage, readMessage } from '../../slide/MessageSlide';
import axios from 'axios';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ChatInput = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const conversationDetails = useSelector(state => state.conservation.conversationDetails);
    const conversationId = conversationDetails ? conversationDetails.conversationId : null;
    console.log("conversationId In message" + conversationId);
    const authorization = useSelector(selectAuthorization);

    const sendMessage = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/message/',
                {
                    content: message,
                    conversationId: conversationId
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authorization}`
                    }
                }
            );
            console.log(response.data);
            dispatch(addMessage(response.data.messages)); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

 
   
    
        // const ImagePicker = () => {
        //     let options = {
        //         storageOptions: {
        //             path: 'images',
        //         }
        //     };
        //     launchImageLibrary(options, (response) => {
        //         console.log('Response = ', response);
            
        //         if (response.didCancel) {
        //             console.log('User cancelled image picker');
        //         } else if (response.error) {
        //             console.log('ImagePicker Error: ', response.error);
        //         } else if (response.customButton) {
        //             console.log('User tapped custom button: ', response.customButton);
        //             alert(response.customButton);
        //         } else {
        //             const source = { uri: response.uri };
        //             console.log('response', JSON.stringify(response));
        //         }
        //     });
        // }
    
  return (
    <View style = {styles.container}>
       <View style = {styles.innerContainer}>
            <View style = {styles.inputAndMicrophone}>
                <TouchableOpacity
                    style = {styles.emotionButton}
                >
                <MaterialCommunityIcons name="emoticon-outline" size={24} color="black" />
                  
                </TouchableOpacity>
                <TextInput
                        multiline
                        placeholder="Type a message"
                        style = {styles.input}
                        onChangeText={text => setMessage(text)}
                    ></TextInput>
                <TouchableOpacity
                style = {styles.rightIconButtonStyle}
                >
                   <Feather name="paperclip" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    // onPress={ImagePicker}
                >
                   <Feather name="image" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style = {styles.sendButton}
                onPress={sendMessage}
            >
            <MaterialCommunityIcons  name={message ? "send": "microphone"} size={24} color="black" />
            </TouchableOpacity>
       </View>
     
    </View>
  )
}

export default ChatInput
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        
        
    },
    innerContainer:{
        paddingHorizontal: 10,
        marginHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection:"row",
        paddingVertical:10
    },
    inputAndMicrophone:{
        flexDirection:"row",
        backgroundColor: "#f0f0f0",
        flex: 3,
        marginRight: 10,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "space-between",
    },
    input:{
        backgroundColor: "transparent",
        paddingLeft: 20,
        color: "black",
        flex: 3,
        height: 50,
        fontSize: 15,
        alignSelf: "center",
    },
    rightIconButtonStyle:{
        justifyContent:"center",
        alignItems:"center",
        paddingRight: 15,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
    },
    emotionButton:{
        justifyContent:"center",
        alignItems:"center",
        paddingLeft: 10,
        
    },
    sendButton:{
        backgroundColor: "blue",
        borderRadius: 50,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    }
   

});