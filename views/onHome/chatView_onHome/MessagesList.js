import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Message from './Message';
import { setConversationDetails } from "../../slide/ConsevationSlide"
import { selectAuthorization } from "../../slide/LoginSlide";
import { useDispatch, useSelector } from "react-redux"

const MessagesList = () => {
    const dispatch = useDispatch();
    const conversationDetails = useSelector(state => state.conservation.conversationDetails);
    const conversationId = conversationDetails ? conversationDetails.conversationId : null;
    const participantIds = conversationDetails ? conversationDetails.participantIds : null;
    console.log("conversationId" + conversationId);
    console.log("participantIds" + participantIds);
    const authorization = useSelector(selectAuthorization);
    const [messages, setMessages] = useState([]);
    const [numMessagesToShow, setNumMessagesToShow] = useState(4);
    const scrollViewRef = useRef();

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
                    setMessages(responseData.messages);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchData();
    }, [conversationId, authorization]);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        if (contentOffset.y === 0) {
            // Nếu đang ở đầu danh sách, tăng số lượng tin nhắn hiển thị lên
            setNumMessagesToShow(prevNum => prevNum + 6);
        }
    };

    useEffect(() => {
        // Cuộn xuống vị trí mới của danh sách tin nhắn sau khi có tin nhắn mới
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);

    return (
        <ScrollView
            style={styles.container}
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            {messages.slice(-numMessagesToShow).map((message, index) => (
                <Message key={index} time={message.createdAt} isLeft={message.senderId !== participantIds[0]} message={message.content} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff",
        paddingBottom: 20,
        maxHeight: 500,
    },
});

export default MessagesList;
