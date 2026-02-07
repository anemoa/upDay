import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createParticipant,
    getParticipant,
    supabaseApi,
    updateParticipantStatus,
} from '../../utils/supabaseApi';
import { Challenge, UserChallengeState } from '../../types';
import { RootState } from '../index';

// 내가 작성한 챌린지 데이터 가져오기
export const fetchMyPostFromSupabase = createAsyncThunk<
    { myPosts: Challenge[]; numericUserId: number },
    string,
    { state: RootState }
>(
    'userChallenge/fetchMyPostFromSupabase',
    async (email, { getState, rejectWithValue }) => {
        // 데이터가 이미 있는 경우에만 스킵 (로딩 상태는 확인하지 않음)
        const { myPosts, numericUserId } = getState().userChallenge;
        if (myPosts && myPosts.length > 0 && numericUserId) {
            return { myPosts, numericUserId };
        }

        try {
            // 1. 이메일을 숫자 id로 변환하기
            const fetchedUserId = await supabaseApi.getUserIdByEmail(email);
			
			if (!fetchedUserId) {  // ✅ undefined 체크
                throw new Error('사용자를 찾을 수 없습니다.');
            }

            // 2. 모든 챌린지 글 가져오기
            const challenges = await supabaseApi.get<Challenge>(
                'challenges',
                '*,users(nickname,user_img)'
            );

            // // 내가 작성한 챌린지만 필터링
            const myPosts = challenges.filter(
                (post) => String(post.author_id) === String(numericUserId)
            );

            return { myPosts, numericUserId: fetchedUserId };
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue('Unknown error');
        }
    }
);

// 참여한 챌린지 데이터 가져오기
export const fetchJoinedChallengesFromSupabase = createAsyncThunk(
    'userChallenge/fetchJoinedChallengesFromSupabase',
    async (email, { getState, rejectWithValue }) => {
        // 데이터가 이미 있는 경우에만 스킵
        const { joinedChallenges, numericUserId } = getState().userChallenge;

        if (joinedChallenges && joinedChallenges.length > 0 && numericUserId) {
            return { joinedChallenges, numericUserId };
        }

        try {
            // 이메일을 숫자 id로 변환
            const numericUserId = await supabaseApi.getUserIdByEmail(email);

            // 챌린지 데이터 가져오기
            const challenges = await supabaseApi.get(
                'challenges',
                '*,users(nickname,user_img),participants(*)'
            );

            // 참여 챌린지 필터링
            const joinedChallenges = challenges.filter(
                (challenge) =>
                    challenge.participants &&
                    challenge.participants.some(
                        (p) => String(p.author_id) === String(numericUserId)
                    )
            );

            return { joinedChallenges, numericUserId };
        } catch (error) {
            console.error('오류 발생:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 챌린지 상태 업데이트
export const updateChallengeStatus = createAsyncThunk(
    'userChallenge/updateChallengeStatus',
    async ({ challengeId, userId, status }, { rejectWithValue }) => {
        try {
            // 1. 현재 참여 정보 가져오기
            const participant = await getParticipant(challengeId, userId);

            let result;
            // 2. 참여 정보가 있으면 업데이트, 없으면 새로 생성
            if (participant) {
                result = await updateParticipantStatus(participant.id, status);
            } else {
                result = await createParticipant(challengeId, userId, status);
            }

            // 3. 업데이트된 챌린지 정보 반환
            return { challengeId, userId, status, result };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 챌린지 수정
export const updateChallengeFromSupabase = createAsyncThunk(
    'userChallenge/updateChallengeFromSupabase',
    async ({ challengeId, updateData }, { rejectWithValue }) => {
        try {
            const result = await supabaseApi.patch(
                'challenges',
                challengeId,
                updateData
            );

            if (!result || result.length === 0) {
                throw new Error('업데이트된 챌린지가 없습니다.');
            }

            return result[0]; // 업데이트된 챌린지 반환
        } catch (error) {
            console.error('챌린지 수정 실패:', error);
            return rejectWithValue(error.message);
        }
    }
);

// 챌린지 삭제
export const deleteChallengeFromSupabase = createAsyncThunk(
    'userChallenge/deleteChallengeFromSupabase',
    async (challengeId, { rejectWithValue }) => {
        try {
            await supabaseApi.delete('challenges', challengeId);
            return challengeId; // 삭제된 챌린지 ID 반환
        } catch (error) {
            console.error('챌린지 삭제 실패:', error);
            return rejectWithValue(error.message);
        }
    }
);

//초기 상태
const initialState = {
    myPosts: [],
    joinedChallenges: [],
    selectedChallenge: null,
    numericUserId: null,
    loading: {
        myPosts: false,
        joinedChallenges: false,
    },
    error: null,
};

// 슬라이스 생성
const userChallengeSlice = createSlice({
    name: 'userChallenge',
    initialState,
    reducers: {
        setSelectedChallenge: (state, action) => {
            state.selectedChallenge = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // 내가 작성한 챌린지 가져오기
            .addCase(fetchMyPostFromSupabase.pending, (state) => {
                state.loading.myPosts = true;
                //state.error.myPosts = null;
            })
            .addCase(fetchMyPostFromSupabase.fulfilled, (state, action) => {
                state.myPosts = action.payload.myPosts;
                state.numericUserId = action.payload.numericUserId;
                state.loading.myPosts = false;
            })
            .addCase(fetchMyPostFromSupabase.rejected, (state, action) => {
                state.loading.myPosts = false;
                state.error = action.payload;
            })

            // 참여한 챌린지 가져오기
            .addCase(fetchJoinedChallengesFromSupabase.pending, (state) => {
                state.loading.joinedChallenges = true;
            })
            .addCase(
                fetchJoinedChallengesFromSupabase.fulfilled,
                (state, action) => {
                    state.joinedChallenges = action.payload.joinedChallenges;
                    state.numericUserId = action.payload.numericUserId;
                    state.loading.joinedChallenges = false;
                }
            )
            .addCase(
                fetchJoinedChallengesFromSupabase.rejected,
                (state, action) => {
                    state.loading.joinedChallenges = false;
                    state.error = action.payload;
                }
            )

            // updateChallengeStatus 액션 처리
            .addCase(updateChallengeStatus.pending, (state) => {
                state.loading.status = true;
            })
            .addCase(updateChallengeStatus.fulfilled, (state, action) => {
                const { challengeId, userId, status } = action.payload;

                // 참여 챌린지 상태 업데이트
                state.joinedChallenges = state.joinedChallenges.map(
                    (challenge) => {
                        if (challenge.id === challengeId) {
                            // 기존 participants 배열 복사
                            const updatedParticipants = [
                                ...(challenge.participants || []),
                            ];

                            // 현재 사용자의 참여 정보 찾기
                            const participantIndex =
                                updatedParticipants.findIndex(
                                    (p) =>
                                        String(p.author_id) === String(userId)
                                );

                            if (participantIndex >= 0) {
                                // 기존 참여자 정보 업데이트
                                updatedParticipants[participantIndex] = {
                                    ...updatedParticipants[participantIndex],
                                    status,
                                };
                            } else {
                                // 새 참여자 추가
                                updatedParticipants.push({
                                    author_id: userId,
                                    challenge_id: challengeId,
                                    status,
                                });
                            }

                            // 업데이트된 챌린지 반환
                            return {
                                ...challenge,
                                participants: updatedParticipants,
                            };
                        }

                        return challenge;
                    }
                );

                state.loading.status = false;
            })
            .addCase(updateChallengeStatus.rejected, (state, action) => {
                state.loading.status = false;
                state.error = action.payload;
            })

            // updateChallengeFromSupabase 액션 처리
            .addCase(updateChallengeFromSupabase.pending, (state) => {
                state.loading.myPosts = true;
            })
            .addCase(updateChallengeFromSupabase.fulfilled, (state, action) => {
                // myPosts에서 해당 챌린지 업데이트
                state.myPosts = state.myPosts.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                );
                state.loading.myPosts = false;
            })
            .addCase(updateChallengeFromSupabase.rejected, (state, action) => {
                state.loading.myPosts = false;
                state.error = action.payload;
            })

            // deleteChallengeFromSupabase 액션 처리
            .addCase(deleteChallengeFromSupabase.pending, (state) => {
                state.loading.myPosts = true;
            })
            .addCase(deleteChallengeFromSupabase.fulfilled, (state, action) => {
                // myPosts에서 해당 챌린지 제거
                state.myPosts = state.myPosts.filter(
                    (post) => post.id !== action.payload
                );
                state.loading.myPosts = false;
            })
            .addCase(deleteChallengeFromSupabase.rejected, (state, action) => {
                state.loading.myPosts = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedChallenge } = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
