import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseApi } from '../../utils/supabaseApi';

// Supabase에서 챌린지 가져오는 비동기 액션 생성
export const fetchChallengesFromSupabase = createAsyncThunk(
    'challenge/fetchChallenges',
    async (_, { rejectWithValue }) => {
        try {
            return await supabaseApi.get('challenges', '*,users(*)');
        } catch (error) {
            console.error('API Error Details:', error.response || error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

// 챌린지 글 생성 액션
export const createChallengeToSupabase = createAsyncThunk(
    'challenge/createChallenge',
    async (challengeData, { rejectWithValue }) => {
        try {
            return await supabaseApi.post('challenges', challengeData);
        } catch (error) {
            console.error('API Error Details:', error.response || error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

// 챌린지 글 삭제 액션
export const deleteChallengeFromSupbase = createAsyncThunk(
    'challenge/deleteChallenge',
    async (id, { rejectWithValue }) => {
        try {
            await supabaseApi.delete('challenges', id);
            return id; // 삭제된 ID 반환
        } catch (error) {
            console.error('API Error Details:', error.response || error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

// 챌린기 글 수정 액셩
export const updateChallengeInSupabase = createAsyncThunk(
    'challenge/updateChallenge',
    async ({ id, challengeData }, { rejectWithValue }) => {
        try {
            await supabaseApi.patch('challenges', id, challengeData);

            // 수정 성공 후 해당 챌린지 데이터 반환
            return { id, ...challengeData };
        } catch (error) {
            console.error('API Error Details:', error.response || error);
            return rejectWithValue(error.message || 'Unknown error');
        }
    }
);

const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        list: [],
        loading: false,
        error: null,
        selectedChallenge: null,
    },
    reducers: {
        // 선택된 챌린지 정보를 저장하는 액션
        setSelectedChallenge: (state, action) => {
            state.selectedChallenge = action.payload;
        },

        joinChallenge: (state, action) => {
            const { id, authorId, nickname, userImg } = action.payload;
            const joinDate = new Date().toISOString().split('T')[0];

            const addParticipantToChallenge = (challenge) => {
                if (challenge.id !== id) return challenge;

                const participants = challenge.participants || [];
                const isAlreadyJoined = participants.some(
                    (p) => p.authorId === authorId
                );

                if (!isAlreadyJoined) {
                    return {
                        ...challenge,
                        participants: [
                            ...participants,
                            {
                                authorId,
                                nickname,
                                userImg,
                                joinDate,
                                status: 'doing',
                            },
                        ],
                    };
                }
                return challenge;
            };

            // redux 스토어의 list 업데이트
            state.list = state.list.map(addParticipantToChallenge);

            // selectedChallenge도 업데이트
            if (state.selectedChallenge && state.selectedChallenge.id === id) {
                state.selectedChallenge = addParticipantToChallenge(
                    state.selectedChallenge
                );
            }

            console.log('🔄 업데이트된 state.list:', state.list);
            console.log(
                '🔄 업데이트된 selectedChallenge:',
                state.selectedChallenge
            );
        },
    },
    extraReducers: (builder) => {
        builder
            // 데이터 로딩 중일 때
            .addCase(fetchChallengesFromSupabase.pending, (state) => {
                state.loading = true; // 로딩 중 표시
                state.error = null; // 이전 에러 초기화
            })
            // 데이터 로딩 성공했을 때
            .addCase(fetchChallengesFromSupabase.fulfilled, (state, action) => {
                console.log('Reducer fulfilled with:', action.payload);
                state.loading = false; // 로딩 끝
                state.list = action.payload; // 받아온 데이터 저장
            })
            // 데이터 로딩 실패했을 때
            .addCase(fetchChallengesFromSupabase.rejected, (state, action) => {
                state.loading = false; // 로딩 끝
                state.error = action.payload; // 에러 메시지 저장
            })

            // 글 작성할 때
            .addCase(createChallengeToSupabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createChallengeToSupabase.fulfilled, (state, action) => {
                state.loading = false;
                // 새로 생성된 챌린지를 목록에 추가
                state.list.push(action.payload);
            })
            .addCase(createChallengeToSupabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 글 삭제하는 액션
            .addCase(deleteChallengeFromSupbase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteChallengeFromSupbase.fulfilled, (state, action) => {
                state.loading = false;
                // 삭제된 ID로 목록에서 제거
                state.list = state.list.filter(
                    (challenge) => challenge.id !== action.payload
                );

                // selectedChallenge도 해당 ID면 null로 설정
                if (state.selectedChallenge?.id === action.payload) {
                    state.selectedChallenge = null;
                }
            })
            .addCase(deleteChallengeFromSupbase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // 글 수정하는 액션
            .addCase(updateChallengeInSupabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateChallengeInSupabase.fulfilled, (state, action) => {
                state.loading = false;

                // 수정된 챌린지를 찾아 업데이트
                const index = state.list.findIndex(
                    (challenge) => challenge.id === action.payload.id
                );
                if (index !== -1) {
                    state.list[index] = {
                        ...state.list[index],
                        ...action.payload,
                    };
                }

                // 현재 선택된 챌린지가 수정된 것이라면 그것도 업데이트
                if (
                    state.selectedChallenge &&
                    state.selectedChallenge.id === action.payload.id
                ) {
                    state.selectedChallenge = {
                        ...state.selectedChallenge,
                        ...action.payload,
                    };
                }
            })
            .addCase(updateChallengeInSupabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setSelectedChallenge,
    updateChallenge,
    addChallenge,
    deleteChallenge,
    joinChallenge,
    setMyPosts,
    getMyJoinedChallenge,
} = challengeSlice.actions;
export default challengeSlice.reducer;
