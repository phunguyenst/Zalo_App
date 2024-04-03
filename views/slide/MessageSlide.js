import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    loading: false,
    error: "",
    messageDetails: null,
};

const MessageSlide = createSlice({
    name: 'message',
    initialState,
    reducers: {
        readMessage: (state, action) => {
            console.log(action.payload);
            state.messages = action.payload;
        },
        setMessageDetails: (state, action) => {
            state.messageDetails = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);

        }
    },

});

export const { readMessage, setMessageDetails, addMessage } = MessageSlide.actions;
export const setMessages = (state) => state.message.messages;
export default MessageSlide.reducer;