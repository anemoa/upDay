import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchChallengesFromSupabase,
    joinChallengeToSupabase,
} from '../../store/features/challengeSlice';
import useLoginModal from '../../common/hooks/useLoginModal';
import { supabaseApi } from '../../utils/supabaseApi';

const ModalFooter = ({
    userImg,
    nickname,
    isMyPost,
    mode,
    onSubmit,
    onClose,
    challengeId,
}) => {
    const dispatch = useDispatch();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const { openLoginModal, renderLoginModal } = useLoginModal();
    const selectedChallenge = useSelector(
        (state) => state.challenge.selectedChallenge
    );

    // ✅ 참여 여부 확인 함수 추가
    const isJoined = () => {
        console.log('🔍 isJoined 체크 시작');
        console.log('🔍 loggedInUser:', loggedInUser);
        console.log('🔍 selectedChallenge:', selectedChallenge);
        console.log('🔍 participants:', selectedChallenge?.participants);
        if (!loggedInUser || !selectedChallenge?.participants) {
            return false;
        }

        // localStorage에서 현재 사용자 ID 가져오기 (동기)
        const userString = localStorage.getItem('users');
        const localUsers = userString ? JSON.parse(userString) : [];
        const currentUser = localUsers.find(
            (user) => user.email === loggedInUser
        );

        console.log('🔍 currentUser:', currentUser);
        console.log('🔍 currentUser.id:', currentUser?.id);

        const result = selectedChallenge.participants?.some((p) => {
            console.log('🔍 비교:', p.author_id, '===', currentUser?.id);
            return String(p.author_id) === String(currentUser?.id);
        });

        console.log('🔍 isJoined 결과:', result);
        return result;
    };

    const handleJoin = async () => {
        if (!loggedInUser) {
            openLoginModal();
            return;
        }

        try {
            console.log('🔍 1. loggedInUser:', loggedInUser);

            // currentUser 정보 가져오기 필요
            const userId = await supabaseApi.getUserIdByEmail(loggedInUser);

            console.log('🔍 2. 받은 userId:', userId);
            console.log('🔍 3. userId 타입:', typeof userId);

            if (!userId) {
                alert('사용자 정보를 찾을 수 없습니다.');
                return;
            }

            await dispatch(
                joinChallengeToSupabase({
                    challengeId: challengeId,
                    authorId: userId,
                })
            ).unwrap();

            // ✅ 챌린지 목록 다시 가져오기!
            await dispatch(fetchChallengesFromSupabase());

            alert('챌린지 참여 성공!');
        } catch (error) {
            console.error('참여 실패:', error);
            alert('참여에 실패했습니다.');
        }
    };

    const handleShare = () => {
        alert('준비중입니다');
    };

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="flex justify-between">
                <button className="btn btn-negative w-[35%]" onClick={onClose}>
                    취소하기
                </button>
                <button className="btn btn-primary w-[60%]" onClick={onSubmit}>
                    {mode === 'create' ? '등록하기' : '수정하기'}
                </button>
            </div>
        );
    }

    return (
        <div className="flex justify-between w-[100%]">
            <div className="flex items-center">
                <div className="w-8 h-8 overflow-hidden rounded-[50%]">
                    <img
                        src={userImg}
                        alt={`${nickname} 사진`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="ml-2 text-sm font-light">{nickname}</p>
            </div>
            <div className="w-[50%]">
                {isMyPost ? (
                    <button
                        onClick={handleShare}
                        className="btn-primary btn w-[100%]"
                    >
                        공유하기
                    </button>
                ) : (
                    <button
                        onClick={handleJoin}
                        className="btn-primary btn w-[100%]"
                        disabled={isJoined()}
                    >
                        {console.log('🎯 버튼 렌더링, isJoined():', isJoined())}
                        {isJoined() ? '참여중' : '참여하기'}
                    </button>
                )}
            </div>
            {renderLoginModal()}
        </div>
    );
};

export default ModalFooter;
