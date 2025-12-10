import React, { useEffect, useState } from 'react';
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
        (state) => state.userChallenge.selectedChallenge
    );

    // ✅ userId를 state로 관리
    const [currentUserId, setCurrentUserId] = useState(null);

    // ✅ 컴포넌트 마운트 시 userId 가져오기
    useEffect(() => {
        const fetchUserId = async () => {
            if (loggedInUser) {
                const userId = await supabaseApi.getUserIdByEmail(loggedInUser);
                setCurrentUserId(userId);
            }
        };
        fetchUserId();
    }, [loggedInUser]);

    // ✅ 이제 동기 함수로 체크 가능!
    const isJoined = () => {
        if (!currentUserId || !selectedChallenge?.participants) {
            return false;
        }

        return selectedChallenge.participants?.some(
            (p) => String(p.author_id) === String(currentUserId)
        );
    };

    const handleJoin = async () => {
        if (!loggedInUser) {
            openLoginModal();
            return;
        }

        try {
            // currentUser 정보 가져오기 필요
            const userId = await supabaseApi.getUserIdByEmail(loggedInUser);

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
                        {isJoined() ? '참여중' : '참여하기'}
                    </button>
                )}
            </div>
            {renderLoginModal()}
        </div>
    );
};

export default ModalFooter;
