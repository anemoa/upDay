import axios from 'axios';
import { Challenge, User, Participant } from '../types';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
};

export const supabaseApi = {
    // 조회
    async get<T = any>(table: string, query: string = '*'): Promise<T[]> {
        try {
            const response = await axios.get(
                `${supabaseUrl}/rest/v1/${table}?select=${query}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            if (axios.isAxiosError(error)) {
                console.error('❌ 응답:', error.response);
            }
            throw error;
        }
    },

    // email로 id 사용자 id 조회 함수
    async getUserIdByEmail(email: string): Promise<number | undefined> {
        try {
            const response = await axios.get(
                `${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=id`,
                { headers }
            );
            return response.data[0]?.id;
        } catch (error) {
            console.error('API error: ', error);
            if (axios.isAxiosError(error)) {
                console.error('❌ 응답:', error.response);
            }
            throw error;
        }
    },

    // 생성
    async post<T = any>(table: string, data: any): Promise<T> {
        try {
            const response = await axios.post(
                `${supabaseUrl}/rest/v1/${table}`,
                data,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            if (axios.isAxiosError(error)) {
                console.error('❌ 응답:', error.response);
            }
            throw error;
        }
    },

    // 삭제
    async delete(table: string, id: number): Promise<void> {
        try {
            const response = await axios.delete(
                `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            if (axios.isAxiosError(error)) {
                console.error('❌ 응답:', error.response);
            }
            throw error;
        }
    },

    // 수정
    async patch<T = any>(table: string, id: number, data: any): Promise<T[]> {
        try {
            const url = `${supabaseUrl}/rest/v1/${table}?id=eq.${id}`;
            const response = await axios.patch(url, data, {
                headers: {
                    ...headers,
                    Prefer: 'return=representation',
                },
            });
            return response.data;
        } catch (error) {
            console.error('❌ PATCH 에러:', error);
            if (error instanceof Error) {
                // ✅ 타입 체크 추가
                console.error('❌ 에러 메시지:', error.message);
            }
            // axios 에러인 경우
            if (axios.isAxiosError(error)) {
                // ✅ axios 에러 체크
                console.error('❌ 응답 데이터:', error.response?.data);
                console.error('❌ 응답 상태:', error.response?.status);
            }
            throw error;
        }
    },
};

// 참여자 정보 가져오기
const getParticipant = async (
    challengeId: number,
    userId: number
): Promise<Participant | null> => {
    try {
        const participants = await supabaseApi.get<Participant>(
            'participants',
            '*'
        );

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
const updateParticipantStatus = async (
    participantId: number,
    status: 'doing' | 'done' | 'not_started'
): Promise<Participant[]> => {
    try {
        const result = await supabaseApi.patch('participants', participantId, {
            status,
        });

        return result;
    } catch (error) {
        console.error('참여자 상태 업데이트 실패:', error);
        throw error;
    }
};

// 새 참여자 생성
// createParticipant 함수 수정
const createParticipant = async (
    challengeId: number,
    userId: number,
    status: 'doing' | 'done' | 'not_started'
): Promise<any> => {
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
        if (axios.isAxiosError(error)) {
            console.error('응답 데이터: ', error.response?.data);
            console.error('응답 상태: ', error.response?.status);
        }
        throw error;
    }
};

// 사용자 프로필 조회 (JOIN 사용)
const getUserProfile = async (userId: number): Promise<User | null> => {
    try {
        const url = `${supabaseUrl}/rest/v1/users?id=eq.${userId}&select=id,email,nickname,password,user_profiles(about,profile_image)`;
        const response = await axios.get(url, { headers });

        return response.data[0] || null;
    } catch (error) {
        console.error('프로필 조회 실패:', error);
        throw error;
    }
};

// 프로필 업데이트 (users 테이블)
const updateUserInfo = async (userId: number, userData: Partial<User>): Promise<any> => {
    try {
        const result = await supabaseApi.patch('users', userId, userData);

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
const upsertUserProfile = async (
    userId: number,
    profileData: Partial<{ about: String; profile_image: string }>
): Promise<User[]> => {
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
