import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Message from './Message';
import { setConversation } from "../../slide/ConsevationSlide"
import { selectAuthorization } from "../../slide/LoginSlide";
import { useDispatch, useSelector } from "react-redux"
import { addMessage, readMessage, setMessages } from '../../slide/MessageSlide';

const MessagesList = () => {
    const dispatch = useDispatch();
    const conversationDetails = useSelector(setConversation);
    const conversationId = conversationDetails ? conversationDetails.conversationId : null;
    const participantIds = conversationDetails ? conversationDetails.participantIds : null;
    console.log("conversationId" + conversationId);
    console.log("participantIds" + participantIds);
    const authorization = useSelector(selectAuthorization);
    // const [messages, setMessages] = useState([]);

    const [numMessagesToShow, setNumMessagesToShow] = useState(7);
    const scrollViewRef = useRef();
    const messages = useSelector(setMessages);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/message/' + conversationId, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authorization}`,
                    },
                });
                if (response.ok) {
                    const responseData = await response.json();
                    dispatch(readMessage(responseData.messages));
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();
    }, [conversationId, authorization]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;
        if (isAtBottom) {
            // Nếu đang ở cuối danh sách, tăng số lượng tin nhắn hiển thị lên
            setNumMessagesToShow(prevNum => prevNum + 6);
        }
    };


    useEffect(() => {
        // Cuộn xuống vị trí mới của danh sách tin nhắn sau khi có tin nhắn mới
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                style={{ height: 500 }}
                contentContainerStyle={styles.contentContainer}
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {messages.length > 0 ? (
                    messages.map((message, index) => {
                        if (message) {
                            return (
                                <Message
                                    key={index}
                                    time={message.createdAt}
                                    isLeft={message.senderId !== participantIds[0]}
                                    message={message.content}
                                />
                            );
                        }
                        return null;
                    })
                ) : (
                    <Text>No messages</Text>
                )}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%',
    },
    contentContainer: {
        backgroundColor: "#f7f7f7",
    },
});

export default MessagesList;
