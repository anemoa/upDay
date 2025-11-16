import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createParticipant,
    getParticipant,
    supabaseApi,
    updateParticipantStatus,
} from '../../utils/supabaseApi';

// 내가 작성한 챌린지 데이터 가져오기
export const fetchMyPostFromSupabase = createAsyncThunk(
    'userChallenge/fetchMyPostFromSupabase',
    async (email, { getState, rejectWithValue }) => {
        // 데이터가 이미 있는 경우에만 스킵 (로딩 상태는 확인하지 않음)
        const { myPosts } = getState().userChallenge;
        if (myPosts && myPosts.length > 0) {
            return myPosts;
        }

        try {
            // 1. 이메일을 숫자 id로 변환하기
            const numericUserId = await supabaseApi.getUserIdByEmail(email);

            // 2. 모든 챌린지 글 가져오기
            const challenges = await supabaseApi.get(
                'challenges',
                '*,users(nickname,user_img)'
            );

            // // 내가 작성한 챌린지만 필터링
            const myPosts = challenges.filter(
                (post) => String(post.author_id) === String(numericUserId)
            );

            return myPosts;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// 참여한 챌린지 데이터 가져오기
export const fetchJoinedChallengesFromSupabase = createAsyncThunk(
    'userChallenge/fetchJoinedChallengesFromSupabase',
    async (email, { getState, rejectWithValue }) => {
        // 데이터가 이미 있는 경우에만 스킵
        const { joinedChallenges } = getState().userChallenge;
        if (joinedChallenges && joinedChallenges.length > 0) {
            return joinedChallenges;
        }

        try {
            // 이메일을 숫자 id로 변환
            const numericUserId = await supabaseApi.getUserIdByEmail(email);

            // 챌린지 데이터 가져오기
            const challenges = await supabaseApi.get(
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

            return joinedChallenges;
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

//초기 상태
const initialState = {
    myPosts: [],
    joinedChallenges: [],
    selectedChallenge: null,
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
                state.myPosts = action.payload;
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
                    state.joinedChallenges = action.payload;
                    state.loading.joinChallenges = false;
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
                console.log('상태 업데이트 액션 실행:', action.payload);
                const { challengeId, userId, status } = action.payload;

                // 상태 업데이트 전 participants 배열 확인
                console.log(
                    '업데이트 전 참가자 배열:',
                    state.joinedChallenges.find((c) => c.id === challengeId)
                        ?.participants
                );

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

                // 상태 업데이트 후 participants 배열 다시 확인
                console.log(
                    '업데이트 후 참가자 배열:',
                    state.joinedChallenges.find((c) => c.id === challengeId)
                        ?.participants
                );

                console.log(
                    '업데이트 후 participants 배열 상세:',
                    JSON.stringify(
                        state.joinedChallenges.find((c) => c.id === challengeId)
                            ?.participants
                    )
                );
            })
            .addCase(updateChallengeStatus.rejected, (state, action) => {
                state.loading.status = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedChallenge } = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
