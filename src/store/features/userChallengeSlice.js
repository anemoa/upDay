import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseApi } from '../../utils/supabaseApi';


async function getNumericUserIdFromEmail(email) {
	// supabaseApi에 있는 함수 활용
	const userId = await supabaseApi.getUserIdByEmail(email);
	return userId;
}

// 내가 작성한 챌린지 데이터 가져오기
export const fetchMyPostFromSupabase = createAsyncThunk(
	'userChallenge/fetchMyPostFromSupabase',
	async (email, {rejectWithValue}) => {
		try{
			console.log('내 글 가져오는지 확인 시작');
			
			// 1. 이메일을 숫자 id로 변환하기
			const numericUserId = await supabaseApi.getUserIdByEmail(email);
			console.log('email: ', email, '숫자 아이디: ', numericUserId);
			
			// 2. 모든 챌린지 글 가져오기
			const challenges = await supabaseApi.get('challenges', '*');
			console.log('전체 챌린지 수: ', challenges.length);
			

			// // 내가 작성한 챌린지만 필터링
			// const myPosts = challenges.filter(post => String(post.authorId) === String(numericUserId));

			// console.log('필터링 된 내 포스트들의 수: ', myPosts.length);
			const myPosts = challenges.filter(post => {
				console.log('Post authorId:', post.author_id, 'type:', typeof post.author_id);
				console.log('My userId:', numericUserId, 'type:', typeof numericUserId);
				console.log('Comparison result:', String(post.authorId) === String(numericUserId));
				return String(post.author_id) === String(numericUserId);
			});
			console.log('필터링된 내 포스트:', myPosts);

			return myPosts;
		} catch(error){
			return rejectWithValue(error.message);
		}
	}
);


// 참여한 챌린지 데이터 가져오기
export const fetchJoinedChallengesFromSupabase = createAsyncThunk(
	'userChallenge/fetchJoinedChallengesFromSupabase',
	async (email, {rejectWithValue}) => {
		try{
			console.log('참여한 챌린지 가져오기 시작');
            
            // 이메일을 숫자 id로 변환
            const numericUserId = await supabaseApi.getUserIdByEmail(email);
            console.log('2. 변환된 ID:', numericUserId);

            // 챌린지 데이터 가져오기
            const challenges = await supabaseApi.get('challenges', '*, participants(*)');
            console.log('3. 챌린지 개수:', challenges.length);
            
            // 참여 챌린지 필터링
            const joinedChallenges = challenges.filter(challenge => 
                challenge.participants && 
                challenge.participants.some(p => String(p.author_id) === String(numericUserId))
            );
            console.log('참여 챌린지 개수:', joinedChallenges.length);

			return joinedChallenges;
		} catch(error){
			console.error('오류 발생:', error);
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
		joinedChallenges: false
	},
	error: null,
};




// 슬라이스 생성
const userChallengeSlice = createSlice({
	name: 'userChallenge',
	initialState,
	reducers: {
		// setSelectedChallenge: (state, action) => {
		// 	state.selectedChallenge = action.payload;
		// }
	},
	extraReducers: (builder) => {
		builder
			// 내가 작성한 챌린지 가져오기
			.addCase(fetchMyPostFromSupabase.pending, (state)=> {
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
				//state.error.joinChallenges = null;
			})
			.addCase(fetchJoinedChallengesFromSupabase.fulfilled, (state, action) => {
				state.joinedChallenges = action.payload;
				state.loading.joinChallenges = false;
			})
			.addCase(fetchJoinedChallengesFromSupabase.rejected, (state, action) => {
				state.loading.joinedChallenges = false;
				state.error = action.payload;
			})
	}
});



//export const { setSelectedChallenge } = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
