import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabaseApi } from '../../utils/supabaseApi';


// 내가 작성한 챌린지 데이터 가져오기
export const fetchMyPostFromSupabase = createAsyncThunk(
	'userChallenge/fetchMyPostFromSupabase',
	async (email, {getState, rejectWithValue}) => {

		// 데이터가 이미 있는 경우에만 스킵 (로딩 상태는 확인하지 않음)
        const {myPosts} = getState().userChallenge;
        if (myPosts && myPosts.length > 0) {
            console.log('이미 데이터가 있음: ', myPosts.length);
            return myPosts;
        }


		try{
			console.log('내 글 가져오는지 확인 시작');
			
			// 1. 이메일을 숫자 id로 변환하기
			const numericUserId = await supabaseApi.getUserIdByEmail(email);
			console.log('email: ', email, '숫자 아이디: ', numericUserId);
			
			// 2. 모든 챌린지 글 가져오기
			const challenges = await supabaseApi.get('challenges', '*');
			console.log('전체 챌린지 수: ', challenges.length);
			

			// // 내가 작성한 챌린지만 필터링
			const myPosts = challenges.filter(post =>  String(post.author_id) === String(numericUserId));
			console.log('필터링된 내 포스트 수:', myPosts.length);
            console.log('내 포스트 목록:', myPosts);

			return myPosts;
		} catch(error){
			return rejectWithValue(error.message);
		}
	}
);


// 참여한 챌린지 데이터 가져오기
export const fetchJoinedChallengesFromSupabase = createAsyncThunk(
	'userChallenge/fetchJoinedChallengesFromSupabase',
	async (email, {getState, rejectWithValue}) => {
		
        // 데이터가 이미 있는 경우에만 스킵
        const {joinedChallenges} = getState().userChallenge;
        if (joinedChallenges && joinedChallenges.length > 0) {
            console.log('이미 참여 챌린지 데이터가 있음:', joinedChallenges.length);
            return joinedChallenges;
        }

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
		setSelectedChallenge: (state, action) => {
			state.selectedChallenge = action.payload;
		}
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



export const { setSelectedChallenge } = userChallengeSlice.actions;

export default userChallengeSlice.reducer;
