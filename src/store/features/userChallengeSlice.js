import { createSlice } from '@reduxjs/toolkit';
import { getChallenges } from '../../utils/localStorage';

// 초기 참여한 챌린지 가져오기
const getInitialJoinedChallenges = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return getChallenges().filter(
        (challenge) =>
            challenge.participants &&
            challenge.participants.some((p) => p.authorId === loggedInUser)
    );
};

// 챌린지 데이터를 localStorage에 저장
const saveChallengesToLocalStorage = (challenges) =>
    localStorage.setItem('clglist', JSON.stringify(challenges));

const userChallengeSlice = createSlice({
    name: 'myClgList',
    initialState: {
        myPosts: [], // 테스트계정이 작성한 챌린지 목록
        joinedChallenges: getInitialJoinedChallenges(),
        selectedChallenge: null, // 현재 선택된 챌린지
    },
    reducers: {
        // 작성한 챌린지 가져오는 액션
        setMyPosts: (state) => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

            state.myPosts = currentChallenges.filter(
                (post) => post.authorId === loggedInUser
            );
        },

        // 참여한 챌린지 가져오는 액션
        getMyJoinedChallenge: (state) => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

            state.joinedChallenges = currentChallenges.filter(
                (challenge) => challenge.participants && challenge.participants.some((p) => p.authorId === loggedInUser)
            );
        },

        // 참여한 챌린지 상태 변경 및 저장하는 액션
        toggleClgState: (state, action) => {
            const { id, type } = action.payload;
			const loggedInUser = localStorage.getItem('loggedInUser');
            const currentChallenges = getChallenges();

			// 도우미 함수: 참여자 상태 변경
            const updatedParticipantStatus = (challenge) => {
				if(challenge.id !== id || !challenge.participants) return challenge;

				//참여자 배열 업데이트
				const updatedParticipants = challenge.participants.map(participant => {
					if(participant.authorId ===  loggedInUser){
						// 상태에 따라 참여자 상태 업데이트
						if(type === 'doing'){
							return{
								...participant,
								status: participant.status === 'doing' ? 'done' : 'doing'
							}
						} else if(type === 'done'){
							return{
								...participant,
								status: participant.status === 'done' ? 'doing' : 'done'
							};
						}
					}
					return participant;
				});

				return{
					...challenge,
					participant: updatedParticipants
				}

			}

			// 챌린지 목록 업데이트
			const updatedChallenges = currentChallenges.map(updatedParticipantStatus);
            saveChallengesToLocalStorage(updatedChallenges);

			state.list = updatedChallenges;
            state.myPosts = updatedChallenges.filter(
                (post) => post.authorId === loggedInUser
            );
            state.joinedChallenges = updatedChallenges.filter(
                (challenge) => 
                    challenge.participants && 
                    challenge.participants.some(p => p.authorId === loggedInUser)
            );

			
        },

        // 선택된 챌린지 정보를 저장하는 액션
        setSelectedChallenge: (state, action) => {
            state.selectedChallenge = action.payload;
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
            state.myPosts = state.list.filter(
                (post) => post.authorId === localStorage.getItem('loggedInUser')
            );
            state.joinedChallenges = state.list.filter(
                (challenge) => challenge.clgJoin
            );

            saveChallengesToLocalStorage(state.list);
            // 로컬 스토리지 상태 업데이트
            const currentChallenges = getChallenges();
            const updatedChallenges = currentChallenges.map((challenge) =>
                challenge.id === updatedChallenge.id
                    ? updatedChallenge
                    : challenge
            );
            saveChallengesToLocalStorage(updatedChallenges);
        },

        // 챌린지 삭제하는 액션
        deleteChallenge: (state, action) => {
            const challengeId = action.payload;
            const updatedList = state.list.filter(
                (challenge) => challenge.id !== challengeId
            );

            // Redux 상태 업데이트
            state.list = updatedList;
            state.joinedChallenges = updatedList.filter(
                (challenge) => challenge.clgJoin
            );

            // 로컬 스토리지 업데이트
            saveChallengesToLocalStorage(updatedList);
        },
    },
});

export const {
    setMyPosts,
    getMyJoinedChallenge,
    toggleClgState,
    setSelectedChallenge,
    updateChallenge,
    deleteChallenge,
} = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
