import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiFire, HiDocumentCheck, HiMiniTrophy } from 'react-icons/hi2';
import { FaStar } from 'react-icons/fa6';
import { fetchJoinedChallengesFromSupabase } from '../../store/features/userChallengeSlice';

const UserReportSection = () => {
    const dispatch = useDispatch();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const joinedChallenges =
        useSelector((state) => state.userChallenge.joinedChallenges) || [];

    // localStorage 값 가져오기
    useEffect(() => {
        const userId = localStorage.getItem('loggedInUser') || '';
        setLoggedInUser(userId);

        if (userId) {
            dispatch(fetchJoinedChallengesFromSupabase(userId));
        }
    }, [dispatch]);

    // 내가 참여한 챌린지 상태 값
    const doingChallengesCount = joinedChallenges.filter((challenge) => {
        return (
            challenge.participants &&
            challenge.participants.some(
                (p) =>
                    String(p.author_id) === String(1) && // 임시 ID 사용
                    p.status === 'doing'
            )
        );
    }).length;
    const completedChallengesCount = joinedChallenges.filter((challenge) => {
        return (
            challenge.participants &&
            challenge.participants.some(
                (p) => String(p.author_id) === String(1) && p.status === 'done'
            )
        );
    }).length;
    const incompleteChallengesCount = joinedChallenges.filter((challenge) => {
        return (
            challenge.participants &&
            challenge.participants.some(
                (p) =>
                    String(p.author_id) === String(1) &&
                    p.status !== 'doing' &&
                    p.status !== 'done'
            )
        );
    }).length;

    const completionRate =
        completedChallengesCount + incompleteChallengesCount > 0
            ? Math.round(
                  (completedChallengesCount /
                      (completedChallengesCount + incompleteChallengesCount)) *
                      100
              )
            : 0;

    return (
        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-xl md:text-2xl font-semibold">업데이 리포트</h1>
            <div className="card flex flex-row gap-2 p-6 w-full h-[172px] md:h-[296px] justify-evenly items-center">
                <div className="flex flex-col justilfy-center items-center gap-6 w-[30%]">
                    <p className="text-sm md:text-base font-semibold">
                        진행 중
                    </p>
                    <HiFire className="text-4xl md:text-6xl text-orange-400" />
                    <p className="text-sm md:text-base font-bold">
                        {doingChallengesCount}
                    </p>
                </div>
                <div className="flex flex-col justilfy-center items-center gap-6 w-[30%]">
                    <p className="text-sm md:text-base font-semibold">완료</p>
                    <HiDocumentCheck className="text-4xl md:text-6xl text-green-400" />
                    <p className="text-sm md:text-base font-bold">
                        {completedChallengesCount}
                    </p>
                </div>
                <div className="flex flex-col justilfy-center items-center gap-6 w-[30%]">
                    <p className="text-sm md:text-base font-semibold">
                        목표 달성율
                    </p>
                    <div className="relative flex justify-center">
                        <HiMiniTrophy className="text-4xl md:text-6xl text-yellow-400" />
                        <FaStar className="absolute text-neutral-100 text-xs top-1 md:text-lg md:top-2" />
                    </div>
                    <p className="text-sm md:text-base font-bold">
                        {completionRate}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserReportSection;
