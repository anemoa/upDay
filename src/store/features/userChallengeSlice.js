import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseApi } from '../../utils/supabaseApi';


// 내가 작성한 챌린지 데이터 가져오기
export const fetchMyPostFromSupabase = createAsyncThunk(
	'userChallenge/fetchMyPostFromSupabase',
	async (id, {rejectWithValue}) => {
		try{
			const challenges = await supabaseApi.get('challenges', '*');

			// 내가 작성한 챌린지만 필터링
			const myPosts = challenges.filter(post => post.authorId === id );
			return myPosts;
		} catch(error){
			return rejectWithValue(error.message);
		}
	}
);


// 참여한 챌린지 데이터 가져오기
export const fetchJoinedChallengesFromSupabase = createAsyncThunk(
	'userChallenge/fetchJoinedChallengesFromSupabase',
	async (id, {rejectWithValue}) => {
		try{
			// 전체 챌린지 가져오기
			const challenges = await supabaseApi.get('challenges', '*, participants(*)');

			// 참여 중인 챌린지 필터링
			const joinedChallenges = challenges.filter(
				challenge => challenge.participants && challenge.participants.some(p => p.authorId === id)
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
