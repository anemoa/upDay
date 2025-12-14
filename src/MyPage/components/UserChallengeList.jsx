import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSelectedChallenge,
    updateChallengeStatus,
} from '../../store/features/userChallengeSlice';
import { BsDot } from 'react-icons/bs';
import { HiFire, HiDocumentCheck } from 'react-icons/hi2';
import UserChallengeModal from './UserChallengeModal';

export default function UserChallengeList({ filteredChallenges, myPosts }) {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const numericUserId = useSelector(
        (state) => state.userChallenge.numericUserId
    );
    const userId = localStorage.getItem('loggedInUser');

    // Redux 상태를 직접 구독
    const joinedChallenges = useSelector(
        (state) => state.userChallenge.joinedChallenges
    );

    const getBadgeClass = (category) => badgeClasses[category] || '';

    const sortedChallenges =
        filteredChallenges?.length > 0
            ? [...filteredChallenges].sort(
                  (a, b) => new Date(b.joinDate) - new Date(a.joinDate)
              )
            : [];

    // 역순 번호 매핑
    const challengeNumber = (index) => sortedChallenges.length - index;

    // 챌린지 상태 변경 핸들러
    const handleToggle = async (challengeId, type) => {

		if(!numericUserId) return;

        // Redux 상태에서 최신 챌린지 찾기
        const challenge = joinedChallenges.find((c) => c.id === challengeId);
        if (!challenge) {
            return;
        }

        // Redux 상태에서 현재 사용자의 참여 정보 찾기
        const userParticipation = challenge.participants?.find(
            (p) => String(p.author_id) === String(numericUserId)
        );

        // 상태 결정하기
        let newStatus;
        if (type === 'doing') {
            newStatus =
                userParticipation?.status === 'doing' ? 'not_started' : 'doing';
        } else if (type === 'done') {
            newStatus =
                userParticipation?.status === 'done' ? 'not_started' : 'done';
        }

        // 리덕스 액션 디스패치 (async/await 완성!)
        try {
            const result = await dispatch(
                updateChallengeStatus({
                    challengeId,
                    userId: numericUserId,
                    status: newStatus,
                })
            ).unwrap(); // unwrap()으로 성공/실패 확인

        } catch (error) {
            console.error('❌ 상태 업데이트 실패:', error);
        }
    };

    // 챌린지 카테고리별 뱃지 클래스
    const badgeClasses = {
        식단: 'budge-meal',
        학습: 'budge-study',
        운동: 'budge-sport',
        습관: 'budge-habit',
    };

    // 챌린지 상태 클래스
    const getChallengeTitleClass = (challenge) => {
        const userParticipation = challenge.participants?.find(
            (p) => p.author_id === userId
        );

        if (!userParticipation) return '';

        //참여자 상태에 따른 클래스 변환
        if (userParticipation.status === 'done') {
            return 'line-through';
        } else if (userParticipation.status !== 'doing') {
            return 'line-through text-neutral-500';
        }
        return '';
    };

    const getChallengeDoingClass = (challenge) => {

        // Redux 상태에서 직접 챌린지 찾기
        const reduxChallenge = joinedChallenges.find(
            (c) => c.id === challenge.id
        );

        // reduxChallenge를 사용해야 함!
        const userParticipation = reduxChallenge?.participants?.find(
            (p) => String(p.author_id) === String(numericUserId)
        );

        const classResult = userParticipation?.status === 'doing' ? 'doing-on' : 'doing-off';

        return classResult;
    };

    const getChallengeDoneClass = (challenge) => {

        // Redux 상태에서 직접 챌린지 찾기
        const reduxChallenge = joinedChallenges.find(
            (c) => c.id === challenge.id
        );

        const userParticipation = reduxChallenge?.participants?.find(
            (p) => String(p.author_id) === String(numericUserId)
        );

        return userParticipation?.status === 'done' ? 'done-on' : 'done-off';
    };

    // 내 챌린지 여부 아이콘 표시
    const isMyChallenge = (author_id) => {
        if (!numericUserId || !Array.isArray(myPosts)) return 'opacity-0';

        return author_id === numericUserId ? 'opacity-100' : 'opacity-0';
    };

    // 모달 열기
    const openModal = (challenge) => {
        dispatch(setSelectedChallenge(challenge));
        setModalOpen(true);
    };

    return (
        <>
            <ul className="w-full h-[486px] md:h-[566px] text-xs md:text-sm overflow-scroll scrollbar-none list-none">
                {filteredChallenges && filteredChallenges.length === 0 ? (
                    <li className="text-center text-gray-500 py-4">
                        검색 결과가 없습니다.
                    </li>
                ) : sortedChallenges.length > 0 ? (
                    sortedChallenges.map((challenge, index) => (
                        <li
                            key={challenge.id}
                            className="flex flex-1 gap-x-1 md:gap-x-1.5 h-15 py-3 md:py-4 border-b border-neutral-300 items-center cursor-pointer"
                        >
                            <div className="flex flex-row justify-center w-[8%] text-[10px] md:text-xs text-neutral-500">
                                {challengeNumber(index)}
                            </div>
                            <BsDot
                                className={`${isMyChallenge(challenge.author_id)} text-2xl text-blue-500 ml-[-3%]`}
                            />
                            <div
                                className={`${getBadgeClass(challenge.category)}`}
                            >
                                {challenge.category}
                            </div>
                            <div className="flex flex-1 gap-1 h-6 items-center overflow-hidden">
                                {/* Title을 클릭해야만 모달 열림 */}
                                <span
                                    className={`${getChallengeTitleClass(challenge)} block w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}
                                    onClick={() => openModal(challenge)}
                                >
                                    {challenge.title}
                                </span>
                            </div>
                            <div className="w-14 flex justify-between items-center">
                                <button
                                    className={getChallengeDoingClass(
                                        challenge
                                    )}
                                    onClick={(e) =>
                                        handleToggle(challenge.id, 'doing', e)
                                    }
                                >
                                    <HiFire className="text-xl" />
                                </button>
                                <button
                                    className={getChallengeDoneClass(challenge)}
                                    onClick={(e) =>
                                        handleToggle(challenge.id, 'done', e)
                                    }
                                >
                                    <HiDocumentCheck className="text-xl" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500 py-4">
                        참여한 챌린지가 없습니다.
                    </li>
                )}
            </ul>
            {/* 모달 컴포넌트 */}
            <UserChallengeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}
