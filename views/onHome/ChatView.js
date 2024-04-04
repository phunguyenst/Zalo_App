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


import axios from 'axios';
const ChatView = ({ navigation, route }) => {
  
  const dispatch = useDispatch();
 
  const [listmess, setList] = useState([])
  const authorization = useSelector(selectAuthorization);
 console.log("authorization" + authorization);
 useEffect(() => {
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
          dispatch(readConversation({ conversationId, participantIds }));
          return conversation.membersInfo.map(member => {
            // const userID = data.conversations[0].userID;
            // dispatch(setConversationDetails(userID));
            return {
              id: conversation.userID,
              name: member.fullName,
              image: member.profilePic,
              message: conversation.lastMessage,
            }
          })
        }).flat();
        
        
        dispatch(setConversationDetails(formattedData));
        setList(formattedData);
      } else {
        // Xử lý lỗi khi fetch không thành công
      }
    } catch (error) {
      // Xử lý lỗi khi fetch gặp lỗi
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

}, []);

  
  
  // useEffect(() =>{
  //   fetch('https://6571a1fed61ba6fcc01322aa.mockapi.io/user')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log("data");

  //     console.log(data);
  //     if(data){
  //       // dispatch(readUser(data));
        
  //       setList(data);
  //     }
  //   })
  //   .catch(error => {
  //       console.error('Error fetching data: ', error);
  //       return error;
  //   });
   
  // }, [])
  

  // useEffect(() => {
  //   axios.get('http://localhost:5000/api/conversation/', {
  //     headers: {
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0aGFuaHRpbiIsInN1YiI6Iis4NDMzNDEyNzQ0NSIsImlhdCI6MTcwODc3ODg4MzcxOCwiZXhwIjoxNzExMzcwODgzNzE4fQ.50uuWd6LeSHg_h_e1IzVADPjqK5FWYvx0MNAttlxNsc'
  //     }
  //   })
    
  //   .then(response => {
  //     console.log("data");
  //     console.log(response.data);
  //     console.log(`HTTP status code on success: ${response.status}`);
  //     // if(response.data){
  //     //   dispatch(readUser(response.data));
  //     //   setList(response.data);
  //     // }
  //     setList(response.data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data: ', error);
  //     if (error.response) {
  //       console.error(`HTTP status code on error: ${error.response.status}`);
  //     }
  //   });
  // }, [])

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
                  {/* <View>
                    <Card.Title
                      title={item.name}
                      subtitle={item.message}
                      titleStyle={{ marginLeft: 15, fontSize: 18 }}
                      subtitleStyle={{ marginLeft: 15, fontSize: 15 }}
                      left={(props) =>
                        <Avatar.Image size={55} source={item.image}
                          style={{ marginRight: 10 }}

                        />

                      }
                      right={(props) =>

                        <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "center", marginRight: 10 }}>
                          <Text style={{ fontSize: 15, marginBottom: 8 }}>4 phút</Text>
                          <Badge>3</Badge>
                        </View>
                      }
                    >
                    </Card.Title>
                    <Divider />
                  </View> */}
                  <Card>
                    <Card.Content>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Avatar.Image size={55} source={require(`../image_view/${item.image}`)} style={{ marginRight: 10 }} /> */}
                        <Avatar.Image size={55} source={{uri: item.image}} style={{ marginRight: 10 }} />
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
