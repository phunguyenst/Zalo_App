import { createSlice } from "@reduxjs/toolkit";

const conservationSlide = createSlice({


    name: 'conservation',
    initialState:{
        conversations:[],
        loading: false,
        error: "",
        conversationDetails: null,
    },
    reducers:{
        readConversation: (state, action) => {
            console.log(action.payload);
            state.conversations = action.payload;
        },
        setConversationDetails: (state, action) =>{
            state.conversationDetails = action.payload;
            console.log("conversationDetails", action.payload);
           
        },
    },
    extraReducers: (builder) => {
        // Add any extra reducers here
    //     builder.addCase(getAPI.fulfilled, (state, action) => {
    //         console.log("action.payload");    
    //       state.data = action.payload;
    //       console.log(action.payload);
    //   })
    }
})

export const { readConversation,setConversationDetails } = conservationSlide.actions;
export const setConversation = (state) => state.conservation.conversations;
export default conservationSlide.reducer;

