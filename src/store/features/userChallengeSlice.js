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
			// 1. 이메일을 숫자 id로 변환하기
			const numericUserId = await supabaseApi.getUserIdByEmail(email);
			//console.log('email: ', email, '숫자 아이디: ', numericUserId);
			
			// 2. 모든 챌린지 글 가져오기
			const challenges = await supabaseApi.get('challenges', '*');

			// 내가 작성한 챌린지만 필터링
			const myPosts = challenges.filter(post => post.authorId === numericUserId);

			//console.log('필터링 된 내 포스트들', myPosts);
			
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
			// 1. 이메일을 숫자 id로 변환하기
			const numericUserId = await supabaseApi.getUserIdByEmail(email);

			// 2. 전체 챌린지 가져오기
			const challenges = await supabaseApi.get('challenges', '*, participants(*)');

			// 3. 참여 중인 챌린지 필터링
			const joinedChallenges = challenges.filter(
				challenge => challenge.participants && challenge.participants.some(p => p.authorId === numericUserId)
			);
			return joinedChallenges;
		} catch(error){
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
		joinChallenges: false
	},
	error: {
		myPosts: null,
		joinChallenges: null
	}
};


// 슬라이스 생성
const userChallengeSlice = createSlice({
	name: 'userChallenge',
	initialState,
	reducers: {
		setSelectedChallenge: (state, action) => {
			state.selectedChallenge = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			// 내가 작성한 챌린지 가져오기
			.addCase(fetchMyPostFromSupabase.pending, (state)=> {
				state.loading.myPosts = true;
				state.error.myPosts = null;
			})
			.addCase(fetchMyPostFromSupabase.fulfilled, (state, action) => {
				state.myPosts = action.payload;
				state.error.myPosts = null;
			})
			.addCase(fetchMyPostFromSupabase.rejected, (state, action) => {
				state.loading.myPosts = false;
				state.error.myPosts = action.payload;
			})

			// 참여한 챌린지 가져오기
			.addCase(fetchJoinedChallengesFromSupabase.pending, (state) => {
				state.loading.joinedChallenges = true;
				state.error.joinChallenges = null;
			})
			.addCase(fetchJoinedChallengesFromSupabase.fulfilled, (state, action) => {
				state.joinedChallenges = action.payload;
				state.loading.joinChallenges = false;
			})
			.addCase(fetchJoinedChallengesFromSupabase.rejected, (state, action) => {
				state.loading.joinedChallenges = false;
				state.error.joinChallenges = action.payload;
			})
	}
});




export const { setSelectedChallenge } = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
