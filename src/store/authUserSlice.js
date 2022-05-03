import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	userData: {},
};

const authUserSlice = createSlice({
	name: 'authUser',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true;
			state.userData = action.payload;
		},
		logout: (state, action) => {
			state.isAuthenticated = false;
			state.userData = {};
		},
		updateUserData: (state, action) => {
			state.userData = action.payload;
		},
	},
});

export const getAuthUserStatus = (state) => state.authUser.isAuthenticated;
export const getAuthUserData = (state) => state.authUser.userData;
export const { login, logout, updateUserData } = authUserSlice.actions;

export default authUserSlice.reducer;
