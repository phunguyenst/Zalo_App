import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  listRequestAddFriendsSent: [],
  listRequestAddFriendsReceived: [],
  friends: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
    },
    setListRequestAddFriendsSent: (state, action) => {
      state.listRequestAddFriendsSent = action.payload.listRequestAddFriendsSent;
      console.log("sent", state.listRequestAddFriendsSent);
    },
    setListRequestAddFriendsReceived: (state, action) => {
      state.listRequestAddFriendsReceived = action.payload.listRequestAddFriendsReceived;
      console.log("received", state.listRequestAddFriendsReceived);
    },
    setFriends: (state, action) => { 
      state.friends = action.payload.friends;
      console.log("friends", state.friends);
    },
    setSentRequests: (state, action) => {
      state.sentRequests = action.payload;
      console.log("sentsss", state.sentRequests);
    },
    setReceivedRequests: (state, action) => {
      state.receivedRequests = action.payload;
      console.log("receivedsss", state.receivedRequests);
    },
  },
});

export const {setSentRequests,setReceivedRequests, setProfile, setListRequestAddFriendsSent, setListRequestAddFriendsReceived,setFriends } = userSlice.actions;

export default userSlice.reducer;
