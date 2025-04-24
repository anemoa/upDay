import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMyPosts,
    toggleClgState,
    setSelectedChallenge,
    getMyJoinedChallenge,
    fetchMyPostFromSupabase,
    fetchJoinedChallengesFromSupabase,
} from '../../store/features/userChallengeSlice';
import { BsDot } from 'react-icons/bs';
import { HiFire, HiDocumentCheck } from 'react-icons/hi2';
import UserChallengeModal from './UserChallengeModal';
import { supabaseApi } from '../../utils/supabaseApi';

export default function UserChallengeList({ filteredChallenges, myPosts }) {
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const numericUserId = useSelector(
        (state) => state.userChallenge.numericUserId
    );
    const isLoading = useSelector(
        (state) => state.userChallenge.loading.joinedChallenges
    );
    const userId = localStorage.getItem('loggedInUser');
    const getBadgeClass = (category) => badgeClasses[category] || '';

    // 참여날짜 오래된 순으로 정렬
    // const sortedChallenges = [...filteredChallenges].sort(
    // 	(a, b) => new Date(b.joinDate) - new Date(a.joinDate)
    // );
    const sortedChallenges =
        filteredChallenges?.length > 0
            ? [...filteredChallenges].sort(
                  (a, b) => new Date(b.joinDate) - new Date(a.joinDate)
              )
            : [];

    // 역순 번호 매핑
    const challengeNumber = (index) => sortedChallenges.length - index;

    // 챌린지 상태 변경 핸들러
    const handleToggle = (id, type) => {
        //dispatch(toggleClgState({ id, type }));
        console.log(`Challenge ${id} toggle ${type} - 현재는 읽기만`);
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
            (p) => p.authorId === userId
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
        const userPaticipation = challenge.participants?.find(
            (p) => p.authorId === userId
        );
        return userPaticipation?.status === 'doing' ? 'doing-on' : 'doing-off';
    };

    const getChallengeDoneClass = (challenge) => {
        const userPaticipation = challenge.participants?.find(
            (p) => p.authorId === userId
        );
        return userPaticipation?.status === 'done' ? 'done-on' : 'done-off';
    };

    // 내 챌린지 여부 아이콘 표시
    const isMyChallenge = (authorId) => {
        if (!numericUserId || !Array.isArray(myPosts)) return 'opacity-0';

        return authorId === numericUserId ? 'opacity-100' : 'opacity-0';
    };

    // 모달 열기
    const openModal = (challenge) => {
        dispatch(setSelectedChallenge(challenge));
        setModalOpen(true);
    };

    return (
        <>
            {isLoading ? (
                <div className="text-center py-4">데이터를 불러오는 중...</div>
            ) : (
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
                                    className={`${isMyChallenge(challenge.authorId)} text-2xl text-blue-500 ml-[-3%]`}
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
                                            handleToggle(
                                                challenge.id,
                                                'doing',
                                                e
                                            )
                                        }
                                    >
                                        <HiFire className="text-xl" />
                                    </button>
                                    <button
                                        className={getChallengeDoneClass(
                                            challenge
                                        )}
                                        onClick={(e) =>
                                            handleToggle(
                                                challenge.id,
                                                'done',
                                                e
                                            )
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
            )}
            {/* 모달 컴포넌트 */}
            <UserChallengeModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}
