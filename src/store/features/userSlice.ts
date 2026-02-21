import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';

const initialState = {
    email: '',
    password: '',
    nickname: '',
    profileImage: '',
    about: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload;
        },
        setProfileImage: (state, action: PayloadAction<string>) => {
            state.profileImage = action.payload;
        },
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            state.email = action.payload.email || '';
            state.password = action.payload.password || '';
            state.nickname = action.payload.nickname || '';
            state.profileImage = action.payload.profileImage || '';
            state.about = action.payload.about || '';
        },
        setAbout: (state, action: PayloadAction<string>) => {
            state.about = action.payload;
        },
    },
});

export const { setEmail, setPassword, setNickname, setProfileImage, setUser, setAbout } = userSlice.actions;

export default userSlice.reducer;
