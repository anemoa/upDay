import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setMyPosts,
    toggleClgState,
    setSelectedChallenge,
    getMyJoinedChallenge,
} from '../../store/features/userChallengeSlice';
import { BsDot } from 'react-icons/bs';
import { HiFire, HiDocumentCheck } from 'react-icons/hi2';
import UserChallengeCard from './UserChallengeCard';

export default function UserChallengeList({ filteredChallenges }) {
    const dispatch = useDispatch();
    const myPosts = useSelector((state) => state.myClgList.myPosts);
    const joinedChallenges =
        useSelector((state) => state.myClgList.joinedChallenges) || [];

    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        dispatch(setMyPosts());
        dispatch(getMyJoinedChallenge()); // 삭제 후 목록 새로고침
    }, [dispatch]); // `joinedChallenges`가 변경될 때마다 실행

    // 노출할 목록 선택
    const challengesToDisplay =
        (filteredChallenges?.length > 0
            ? filteredChallenges
            : joinedChallenges) || [];

    // 참여날짜 오래된 순으로 정렬
    const sortedChallenges = [...challengesToDisplay].sort(
        (a, b) => new Date(b.joinDate) - new Date(a.joinDate)
    );

    // 역순 번호 매핑
    const clgNum = (index) => sortedChallenges.length - index;

    // 챌린지 상태 변경 핸들러
    const handleToggle = (id, type) => {
        dispatch(toggleClgState({ id, type }));
    };

    // 챌린지 카테고리별 뱃지 클래스
    const badgeClasses = {
        식단: 'budge-meal',
        학습: 'budge-study',
        운동: 'budge-sport',
        습관: 'budge-habit',
    };
    const getBadgeClass = (category) => badgeClasses[category] || '';

    // 챌린지 상태 클래스
    const getClgTitleClass = (doing, done) =>
        !doing && done
            ? 'line-through'
            : !doing && !done
              ? 'line-through text-neutral-500'
              : '';
    const getClgDoingClass = (doing) => (doing ? 'doing-on' : 'doing-off');
    const getClgDoneClass = (done) => (done ? 'done-on' : 'done-off');

    // 내 챌린지 여부 아이콘 표시
    const isMyChallenge = (authorId) => {
        if (!Array.isArray(myPosts)) return 'opacity-0';
        return myPosts.some((post) => post.authorId === authorId)
            ? 'opacity-100'
            : 'opacity-0';
    };

    // 모달 열기
    const openModal = (challenge) => {
        dispatch(setSelectedChallenge(challenge));
        setModalOpen(true);
    };

    return (
        <>
            <ul className='w-full h-[486px] md:h-[566px] text-xs md:text-sm overflow-scroll list-none'>
                {filteredChallenges && filteredChallenges.length === 0 ? (
                    <li className='text-center text-gray-500 py-4'>
                        검색 결과가 없습니다.
                    </li>
                ) : sortedChallenges.length > 0 ? (
                    sortedChallenges.map((challenge, index) => (
                        <li
                            key={challenge.id}
                            className='flex flex-1 gap-x-1 md:gap-x-1.5 h-15 py-3 md:py-4 border-b border-neutral-300 items-center cursor-pointer'
                        >
                            <div className='flex flex-row justify-center w-[8%] text-[10px] md:text-xs text-neutral-500'>
                                {clgNum(index)}
                            </div>
                            <BsDot
                                className={`${isMyChallenge(challenge.authorId)} text-2xl text-blue-500 ml-[-3%]`}
                            />
                            <div
                                className={`${getBadgeClass(challenge.category)}`}
                            >
                                {challenge.category}
                            </div>
                            <div className='flex flex-1 gap-1 h-6 items-center overflow-hidden'>
                                {/* Title을 클릭해야만 모달 열림 */}
                                <span
                                    className={`${getClgTitleClass(challenge.clgDoing, challenge.clgDone)} block w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer`}
                                    onClick={() => openModal(challenge)}
                                >
                                    {challenge.title}
                                </span>
                            </div>
                            <div className='w-[48px] flex justify-between items-center'>
                                <button
                                    className={getClgDoingClass(
                                        challenge.clgDoing
                                    )}
                                    onClick={(e) =>
                                        handleToggle(challenge.id, 'doing', e)
                                    }
                                >
                                    <HiFire />
                                </button>
                                <button
                                    className={getClgDoneClass(
                                        challenge.clgDone
                                    )}
                                    onClick={(e) =>
                                        handleToggle(challenge.id, 'done', e)
                                    }
                                >
                                    <HiDocumentCheck />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className='text-center text-gray-500 py-4'>
                        참여한 챌린지가 없습니다.
                    </li>
                )}
            </ul>
            {/* 모달 컴포넌트 */}
            <UserChallengeCard
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
}
