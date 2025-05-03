import axios from 'axios';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
};

export const supabaseApi = {
    // 조회
    async get(table, query = '*') {
        try {
            const response = await axios.get(
                `${supabaseUrl}/rest/v1/${table}?select=${query}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    },

    // email로 id 사용자 id 조회 함수
    async getUserIdByEmail(email) {
        try {
            const response = await axios.get(
                `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=id`,
                { headers }
            );
            return response.data[0]?.id;
        } catch (error) {
            console.error('API error: ', error);
            console.log('test');

            throw error;
        }
    },

    // 생성
    async post(table, data) {
        try {
            const response = await axios.post(
                `${supabaseUrl}/rest/v1/${table}`,
                data,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    },

    // 삭제
	async delete(table, id){
		try{
			const response = await axios.delete(
				`${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
				{headers}
			);
			return response.data;
		} catch(error){
			console.error('API Error:', error);
			throw error;
		}
	},

	//수정
	async patch(table, id, data){
		try{
			const response = await axios.patch(
				`${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
				data,
				{headers}
			);
			return response.data;
		} catch(error){
			console.error('API Error:', error);
			throw error;
		}
	}
};


// 참여자 정보 가져오기
const getParticipant = async (challengeId, userId) => {
	try {
	  const response = await axios.get(`/api/participants`, {
		params: {
		  challenge_id: challengeId,
		  author_id: userId
		}
	  });
	  return response.data.length > 0 ? response.data[0] : null;
	} catch (error) {
	  console.error('참여자 정보 조회 실패:', error);
	  throw error;
	}
  };
  
  // 참여자 상태 업데이트
  const updateParticipantStatus = async (participantId, status) => {
	try {
	  const response = await axios.put(`/api/participants/${participantId}`, {
		status: status
	  });
	  return response.data;
	} catch (error) {
	  console.error('참여자 상태 업데이트 실패:', error);
	  throw error;
	}
  };
  
  // 새 참여자 생성
  const createParticipant = async (challengeId, userId, status) => {
	try {
	  const response = await axios.post(`/api/participants`, {
		challenge_id: challengeId,
		author_id: userId,
		status: status
	  });
	  return response.data;
	} catch (error) {
	  console.error('참여자 생성 실패:', error);
	  throw error;
	}
  };
  
  // 함수 내보내기 (기존 export에 추가)
  export {
	// 기존 export 함수들...
	getParticipant,
	updateParticipantStatus,
	createParticipant
  };