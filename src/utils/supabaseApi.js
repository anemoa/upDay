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
    async delete(table, id) {
        try {
            const response = await axios.delete(
                `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // 수정
    async patch(table, id, data) {
        try {
            console.log('🔧 PATCH 요청 시작:', {
                table,
                id,
                data,
                url: `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
            });

            const response = await axios.patch(
                `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
                data,
                {
                    headers: {
                        ...headers,
                        Prefer: 'return=representation', // 🎯 이게 핵심!
                    },
                }
            );

            console.log('🔧 PATCH 응답:', response.data);
            console.log('🔧 PATCH 상태 코드:', response.status);

            return response.data;
        } catch (error) {
            console.error('❌ PATCH 에러:', error);
            if (error.response) {
                console.error('❌ 응답 데이터:', error.response.data);
                console.error('❌ 응답 상태:', error.response.status);
            }
            throw error;
        }
    },
};

// 참여자 정보 가져오기
const getParticipant = async (challengeId, userId) => {
    try {
        const participants = await supabaseApi.get('participants', '*');

        // 메모리에서 필터링
        return (
            participants.find(
                (p) =>
                    String(p.challenge_id) === String(challengeId) &&
                    String(p.author_id) === String(userId)
            ) || null
        );
    } catch (error) {
        console.error('참여자 정보 조회 실패:', error);
        throw error;
    }
};

// 참여자 상태 업데이트
const updateParticipantStatus = async (participantId, status) => {
    try {
        console.log('🔄 참여자 상태 업데이트 요청:', {
            participantId,
            status,
        });

        const result = await supabaseApi.patch('participants', participantId, {
            status,
        });

        console.log('✅ 참여자 상태 업데이트 성공:', result);
        return result;
    } catch (error) {
        console.error('참여자 상태 업데이트 실패:', error);
        throw error;
    }
};

// 새 참여자 생성
// createParticipant 함수 수정
const createParticipant = async (challengeId, userId, status) => {
    try {
        // userId가 없으면 임시값 사용 (개발용)
        const actualUserId = userId || 1; // 데이터베이스에 존재하는 ID 사용

        const response = await axios.post(
            `${supabaseUrl}/rest/v1/participants`,
            {
                challenge_id: challengeId,
                author_id: actualUserId, // 수정된 부분
                status: status,
            },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('참여자 생성 실패:', error);
        if (error.response) {
            console.error('응답 데이터:', error.response.data);
            console.error('응답 상태:', error.response.status);
        }
        throw error;
    }
};

export { getParticipant, updateParticipantStatus, createParticipant };
