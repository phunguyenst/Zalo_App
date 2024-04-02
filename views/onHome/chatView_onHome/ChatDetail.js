import {
    StyleSheet,
    View,
    Text,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import ChatView from "../ChatView";

import HeaderChat from "../chatView_onHome/HeaderChat";
import ChatInput from "../chatView_onHome/ChatInput";
import MessageScreen from "../chatView_onHome/MessagesList";


const ChatDetail = ({navigation}) => {
    return (
        <View style ={styles.container}>
           <HeaderChat navigation={navigation}/>
           <MessageScreen />
           <ChatInput />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
});
export default ChatDetail