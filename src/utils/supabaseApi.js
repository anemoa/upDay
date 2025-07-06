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
            const url = `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`;
            console.log('🌐 PATCH URL:', url);
            console.log('📦 PATCH 데이터:', data);
            console.log('🔑 PATCH 헤더:', headers);

            const response = await axios.patch(url, data, {
                headers: {
                    ...headers,
                    Prefer: 'return=representation',
                },
            });

            console.log('📊 PATCH 전체 응답:', response);
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
            console.error('응답 데이터: ', error.response.data);
            console.error('응답 상태: ', error.response.status);
        }
        throw error;
    }
};

// 사용자 프로필 조회 (JOIN 사용)
const getUserProfile = async (userId) => {
    try {
        const url = `${supabaseUrl}/rest/v1/users?id=eq.${userId}&select=id,email,nickname,password,user_profiles(about,profile_image)`;
        console.log('🔍 getUserProfile URL:', url);

        const response = await axios.get(url, { headers });
        console.log('🔍 getUserProfile 응답:', response.data);

        return response.data[0] || null;
    } catch (error) {
        console.error('프로필 조회 실패:', error);
        throw error;
    }
};

// 프로필 업데이트 (users 테이블)
const updateUserInfo = async (userId, userData) => {
    try {
        console.log('🔧 updateUserInfo 호출:', { userId, userData });
        const result = await supabaseApi.patch('users', userId, userData);
        console.log('🔧 updateUserInfo 결과:', result);

        // 🎯 빈 배열 체크 추가
        if (!result || result.length === 0) {
            throw new Error('업데이트된 행이 없습니다. 권한을 확인하세요.');
        }

        return result;
    } catch (error) {
        console.error('사용자 정보 업데이트 실패:', error);
        throw error;
    }
};

// 프로필 생성/업데이트 (user_profiles 테이블)
const upsertUserProfile = async (userId, profileData) => {
    try {
        // 먼저 기존 프로필이 있는지 확인
        const existing = await axios.get(
            `${supabaseUrl}/rest/v1/user_profiles?user_id=eq.${userId}`,
            { headers }
        );

        if (existing.data.length > 0) {
            // 업데이트
            return await supabaseApi.patch(
                'user_profiles',
                existing.data[0].id,
                profileData
            );
        } else {
            // 생성
            return await supabaseApi.post('user_profiles', {
                user_id: userId,
                ...profileData,
            });
        }
    } catch (error) {
        console.error('프로필 upsert 실패:', error);
        throw error;
    }
};

export {
    getParticipant,
    updateParticipantStatus,
    createParticipant,
    getUserProfile,
    updateUserInfo,
    upsertUserProfile,
};
