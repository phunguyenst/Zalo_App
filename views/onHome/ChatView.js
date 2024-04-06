import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Avatar, Badge, Card, Divider, Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { readConversation, setConversationDetails } from "../slide/ConsevationSlide";
import { useDispatch, useSelector } from "react-redux"
import { selectAuthorization } from "../slide/LoginSlide";
import { selectUserId } from "../slide/ProfileSlide";


import axios from 'axios';
const ChatView = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const [listmess, setList] = useState([])
  const authorization = useSelector(selectAuthorization);
  const userId = useSelector(selectUserId);
  console.log("userId" + userId);
  console.log("authorization" + authorization);
  useEffect(() => {
    // Check if userId is defined before fetching data
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/api/conversation/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            const formattedData = data.conversations.map(conversation => {
              const conversationId = conversation.conversationId;
              const participantIds = conversation.participantIds;
              const member = conversation.membersInfo.find(member => member.userID !== userId);
              dispatch(readConversation({ conversationId, participantIds, member }));
  
              return member ? {
                id: conversation.userID,
                name: member.fullName,
                image: member.profilePic,
                message: conversation.lastMessage,
              } : {
                id: conversation.userID,
                name: '',
                image: '',
                message: conversation.lastMessage,
              };
            })
  
            dispatch(setConversationDetails(formattedData));
            setList(formattedData);
          } else {
            // Handle error
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }
  }, [userId]); 
  return (
    <View style={styles.container}>
      <View style={{ flex: 8 }}>
        <ScrollView
          nestedScrollEnabled
        >
          <FlatList
            data={listmess}
            // keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => { navigation.navigate('ChatDetail') }}
                >
                  <Card>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Avatar.Image size={55} source={require(`../image_view/${item.image}`)} style={{ marginRight: 10 }} /> */}
                        <Avatar.Image size={55} source={{ uri: item.image }} style={{ marginRight: 10 }} />
                        <View style={{ flex: 1 }}>
                          <Card.Title
                            title={item.name}
                            subtitle={item.message}
                            titleStyle={{ fontSize: 18 }}
                            subtitleStyle={{ fontSize: 15 }}
                            right={(props) =>
                              <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginRight: 10 }}>
                                <Text style={{ fontSize: 15, marginBottom: 8 }}>4 phút</Text>
                                <Badge>3</Badge>
                              </View>
                            }
                          />
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>

              );
            }}
          ></FlatList>

        </ScrollView>      </View>
    </View>
  )
}

export default ChatView
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
