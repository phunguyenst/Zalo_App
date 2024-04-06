import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    profile: null,
    loading: false,
    error: "",
};

const ProfileSlide = createSlice({

    name: 'profile',
    initialState,
    reducers: {
        readProfile: (state, action) => {
            state.profile = action.payload;
            console.log(action.payload);
        },
        clearProfile: (state) => {
            state.profile = null;
        },
    },

});

export const { readProfile, clearProfile } = ProfileSlide.actions;
export const setProfile = (state) => state.profile.profile;
export const selectUserId = (state) => state.profile.profile?.userID;
export default ProfileSlide.reducer;
