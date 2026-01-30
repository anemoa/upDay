import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseApi } from '../../utils/supabaseApi';
import { Challenge } from '../../types';

// Supabase에서 챌린지 가져오는 비동기 액션 생성
export const fetchChallengesFromSupabase = createAsyncThunk <Challenge[]>(
    'challenge/fetchChallenges',
    async (_, { rejectWithValue }) => {
        try {
            return await supabaseApi.get(
                'challenges',
                '*,users(nickname,user_img), participants(*)'
            );
        } catch (error) {
            console.error('API Error Details:', error);
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unknown error');
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

// 챌린지 참여 비동기 액션
export const joinChallengeToSupabase = createAsyncThunk(
    'challenge/joinChallenge',
    async ({ challengeId, authorId }, { rejectWithValue }) => {
        try {
            // 1. 중복 체크
            const participants = await supabaseApi.get('participants');
            const alreadyJoined = participants.some(
                (p) => p.challenge_id === challengeId && p.author_id === authorId
            );

            if (alreadyJoined) {
                return rejectWithValue('이미 참여한 챌린지입니다.');
            }

            const participantData = {
                challenge_id: challengeId,
                author_id: authorId,
                status: 'doing',
            };

            const result = await supabaseApi.post(
                'participants',
                participantData
            );

            return {
                challengeId,
                participant: result,
            };
        } catch (error) {
            console.error('❌ 참여 실패 상세:', error);
            console.error('❌ 에러 응답:', error.response?.data);
            return rejectWithValue(error.message);
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
            })

            // 챌린지 참여
            .addCase(joinChallengeToSupabase.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(joinChallengeToSupabase.fulfilled, (state, action) => {
                state.loading = false;
                // DB에 저장 성공
                console.log('✅ 참여 성공:', action.payload);
            })
            .addCase(joinChallengeToSupabase.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error('❌ 참여 실패:', action.payload);
            });
    },
});

export const {
    setSelectedChallenge,
    updateChallenge,
    addChallenge,
    deleteChallenge,
    setMyPosts,
    getMyJoinedChallenge,
} = challengeSlice.actions;
export default challengeSlice.reducer;
