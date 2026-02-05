import { configureStore } from '@reduxjs/toolkit';
import challengeReducer from './features/challengeSlice';
import userReducer from './features/userSlice';
import userChallengeReducer from './features/userChallengeSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        challenge: challengeReducer,
        userChallenge: userChallengeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;