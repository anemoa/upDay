import { createSlice } from '@reduxjs/toolkit';
import { userChallengeList } from '../../data/userChallengeData';
import { getChallenges } from '../../utils/localStorage';

const getInitialList = () => {
    // 로컬 스토리지에서 챌린지 가져오기
    const savedChallenges = localStorage.getItem('clglist');

	// 로컬 스토리지에 clglist가 없으면
	if(!savedChallenges){
		// 로컬 스토리지에 clglist 이름으로 기존의 더미데이터를 저장
		localStorage.setItem('clglist', JSON.stringify(userChallengeList));
		return userChallengeList;
	}

	// 로컬 스토리지 데이터 파싱
    const parsedChallenges = JSON.parse(savedChallenges);

    // 1. 더미데이터의 상태 업데이트
    const updatedList = userChallengeList.map((challenge) => {
        const savedChallenge = parsedChallenges.find(
            (saved) => saved.id === challenge.id
        );
        return savedChallenge || challenge;
    });

    // 2. 사용자가 작성한 챌린지 추가
    const userWrittenChallenges = parsedChallenges.filter(
        (challenge) =>
            !userChallengeList.some((data) => data.id === challenge.id)
    );

    // 3. 업데이트 된 더미데이터 + 사용자가 작성한 챌린지
    const mergedChallenges =  [...updatedList, ...userWrittenChallenges];

	// 병합된 데이터로 로컬 스토리지 업데이트
	localStorage.setItem('clglist', JSON.stringify(mergedChallenges));

	return mergedChallenges;
};


const challengeSlice = createSlice({
    name: 'challenge',
    initialState: {
        list: getInitialList(), // 초기 데이터,
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
            localStorage.setItem(
                'clglist',
                JSON.stringify(updatedChallenges)
            );
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
            localStorage.setItem(
                'clglist',
                JSON.stringify(updatedChallenges)
            );
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
            localStorage.setItem(
                'clglist',
                JSON.stringify(updatedChallenges)
            );
        },

        // 챌린지 참여 액션
        joinChallenge: (state, action) => {
            const {id, authorId, nickname, userImg} = action.payload;
			const joinDate = new Date().toISOString().split('T')[0] // 현재 날짜

            // redux 스토어의 list 업데이트
            state.list = state.list.map((challenge) => {
                if (challenge.id === id) {
					// participants 배열이 없으면 생성하기
                    const participants = challenge.participants || [];
					
					// 이미 참여중인지 확인하기
					const isAlreadyJoined = participants.some(p => p.authorId === authorId)

					if(!isAlreadyJoined){
						// 새 참여자 추가
						return {
							...challenge,
							participants: [
								...participants, {
									authorId,
									nickname,
									userImg,
									joinDate,
									status: 'doing'
								}
							]
						};
					}
                }
                return challenge;
            });

			// selectedChallenge도 업데이트
			if (state.selectedChallenge && state.selectedChallenge.id === id) {
				state.selectedChallenge = {
					...state.selectedChallenge,
					clgJoin: true
				};
			}

            // 로컬 스토리지 업데이트
			const currentChallenges = getChallenges();
            const updatedChallenge = currentChallenges.map((challenge) => {
                if (challenge.id === id) {
                    return {
                        ...challenge,
                        clgJoin: true,
                        // clgDoing: true,
						joinDate: joinDate
                    };
                }
                return challenge;
            });
            localStorage.setItem(
                'clglist',
                JSON.stringify(updatedChallenge)
            );
        },
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
