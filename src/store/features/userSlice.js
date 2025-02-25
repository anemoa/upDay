import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: '',
    password: '',
    nickname: '',
    profileImage: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setNickname: (state, action) => {
            state.nickname = action.payload;
        },
        setProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.nickname = action.payload.nickname;
            state.profileImage = action.payload.profileImage;
        },
    },
});

export const { setEmail, setPassword, setNickname, setProfileImage, setUser } =
    userSlice.actions;

export default userSlice.reducer;
