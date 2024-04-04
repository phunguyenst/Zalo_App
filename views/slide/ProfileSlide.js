import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	profile: null,
	loading: false,
	error: '',
};

const ProfileSlide = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		readProfile: (state, action) => {
			state.profile = action.payload;
		},
		clearProfile: (state) => {
			state.profile = null;
		},
	},
});

export const { readProfile, clearProfile } = ProfileSlide.actions;
export const setProfile = (state) => state.profile.profile;
export default ProfileSlide.reducer;
