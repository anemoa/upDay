import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userChallengeList } from '../../data/userChallengeData';
import { getChallenges } from '../../utils/localStorage';
import axios from 'axios';

// const getInitialList = () => {
//     // 로컬 스토리지에서 챌린지 가져오기
//     const savedChallenges = localStorage.getItem('clglist');

// 	// 로컬 스토리지에 clglist가 없으면
// 	if(!savedChallenges){
// 		// 로컬 스토리지에 clglist 이름으로 기존의 더미데이터를 저장
// 		localStorage.setItem('clglist', JSON.stringify(userChallengeList));
// 		return userChallengeList;
// 	}

// 	// 로컬 스토리지 데이터 파싱
//     const parsedChallenges = JSON.parse(savedChallenges);

//     // 1. 더미데이터의 상태 업데이트
//     const updatedList = userChallengeList.map((challenge) => {
//         const savedChallenge = parsedChallenges.find(
//             (saved) => saved.id === challenge.id
//         );
//         return savedChallenge || challenge;
//     });

//     // 2. 사용자가 작성한 챌린지 추가
//     const userWrittenChallenges = parsedChallenges.filter(
//         (challenge) =>
//             !userChallengeList.some((data) => data.id === challenge.id)
//     );

//     // 3. 업데이트 된 더미데이터 + 사용자가 작성한 챌린지
//     const mergedChallenges =  [...updatedList, ...userWrittenChallenges];

// 	// 병합된 데이터로 로컬 스토리지 업데이트
// 	localStorage.setItem('clglist', JSON.stringify(mergedChallenges));

// 	return mergedChallenges;
// };

// Supabase에서 챌린지 가져오는 비동기 액션 생성
export const fetchChallengesFromSupabase = createAsyncThunk(
    'challenge/fetchChallenges',
    async (_, { rejectWithValue }) => {
        try {
            const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
            const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

            const response = await axios.get(
                `${supabaseUrl}/rest/v1/challenges?select=*,users(nickname,user_img)`,
                {
                    headers: {
                        apikey: supabaseKey,
                        Authorization: `Bearer ${supabaseKey}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            // console.error('API Error:', error); // 에러 상세 정보 확인
            // return rejectWithValue(error.message);
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

        // 새로운 챌린지 생성하는 액션
        addChallenge: (state, action) => {
            state.list.push(action.payload);

            // 로컬 스토리지에 저장
            const currentChallenges = getChallenges();
            const updatedChallenges = [...currentChallenges, action.payload];
            localStorage.setItem('clglist', JSON.stringify(updatedChallenges));
        },

        // 변경된 챌린지 정보를 처리하는 액션
        updateChallenge: (state, action) => {
            // 수정된 새로운 데이터 값
            const updatedChallenge = action.payload;

            // 전체 목록에서 해당 챌린지 정보 업데이트
            state.list = state.list.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );

            // 선택된 챌린지의 상태 업데이트
            state.selectedChallenge = updatedChallenge;

            // 로컬 스토리지 상태 업데이트
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );
            localStorage.setItem('clglist', JSON.stringify(updatedChallenges));
        },

        // 챌린지 삭제하는 액션
        deleteChallenge: (state, action) => {
            // 전체 목록에서 id가 일치하지 않는 챌린지만 남겨 새 배열에 담는 로직
            // redux toolkit의 immer 라이브러리가 원본 보존을 해주기 때문에 코드에선 원본을 건드리는것 같지만 실제론 새 배열에 담는다.
            state.list = state.list.filter(
                (challenge) => challenge.id !== action.payload
            );

            // 삭제된 챌린지를 null로 변경
            if (state.selectedChallenge?.id === action.payload) {
                state.selectedChallenge = null;
            }

            // 로컬 스토리지 업데이트 하기
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.filter(
                (challenge) => challenge.id !== action.payload
            );
            localStorage.setItem('clglist', JSON.stringify(updatedChallenges));
        },

        // 챌린지 참여 액션
        joinChallenge: (state, action) => {
            const { id, authorId, nickname, userImg } = action.payload;
            const joinDate = new Date().toISOString().split('T')[0]; // 현재 날짜

            const addParticipantToChallenge = (challenge) => {
                if (challenge.id !== id) return challenge;

                // participants 배열이 없으면 생성하기
                const participants = challenge.participants || [];

                // 이미 참여중인지 확인하기
                const isAlreadyJoined = participants.some(
                    (p) => p.authorId === authorId
                );

                if (!isAlreadyJoined) {
                    // 새 참여자 추가
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

            // 로컬 스토리지 업데이트
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map(
                addParticipantToChallenge
            );
            localStorage.setItem('clglist', JSON.stringify(updatedChallenges));
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
