import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiFire, HiDocumentCheck, HiMiniTrophy } from 'react-icons/hi2';
import { FaStar } from 'react-icons/fa6';
import { getMyJoinedChallenge } from '../../store/features/userChallengeSlice';

export default function UserReport() {
    const dispatch = useDispatch();
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isTestAccount, setIsTestAccount] = useState(true);
    const joinedChallenges =
        useSelector((state) => state.myClgList.joinedChallenges) || [];

    useEffect(() => {
        dispatch(getMyJoinedChallenge());
    }, [dispatch]);

    // localStorage 값 가져올 때 예외 처리
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('loggedInUser') || ''; // 문자열 그대로 사용
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            setLoggedInUser(storedUser);
            setUsers(storedUsers);
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            setLoggedInUser('');
            setUsers([]);
        }
    }, []);

    // 테스트 계정 여부 확인
    useEffect(() => {
        if (users.length > 0 && loggedInUser) {
            setIsTestAccount(loggedInUser === users[0].email);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser, users]);

    // 내가 참여한 챌린지 상태 값
    const numClgDoing = joinedChallenges.filter((clg) => clg.clgDoing).length;
    const numClgDone = joinedChallenges.filter((clg) => clg.clgDone).length;
    const numClgOver = joinedChallenges.filter(
        (clg) => !clg.clgDoing && !clg.clgDone
    ).length;

    const achievementRate =
        numClgDone + numClgOver > 0
            ? Math.round((numClgDone / (numClgDone + numClgOver)) * 100)
            : 0;

    // 테스트 계정이 아닐 경우
    if (!isTestAccount) {
        return (
            <div className='relative flex flex-col gap-2'>
                <h1 className='text-xl md:text-2xl font-semibold'>
                    업데이 리포트
                </h1>
                <div className='card flex flex-row gap-2 p-6 w-full h-[172px] md:h-[296px] justify-evenly items-center'>
                    <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                        <p className='text-sm md:text-base font-semibold'>
                            진행 중
                        </p>
                        <HiFire className='text-4xl md:text-6xl text-orange-400' />
                        <p className='text-sm md:text-base font-bold opacity-0'>
                            -
                        </p>
                    </div>
                    <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                        <p className='text-sm md:text-base font-semibold'>
                            완료
                        </p>
                        <HiDocumentCheck className='text-4xl md:text-6xl text-green-400' />
                        <p className='text-sm md:text-base font-bold opacity-0'>
                            -
                        </p>
                    </div>
                    <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                        <p className='text-sm md:text-base font-semibold'>
                            목표 달성율
                        </p>
                        <div className='relative flex justify-center'>
                            <HiMiniTrophy className='text-4xl md:text-6xl text-yellow-400' />
                            <FaStar className='absolute text-neutral-100 text-xs top-1 md:text-lg md:top-2' />
                        </div>
                        <p className='text-sm md:text-base font-bold opacity-0'>
                            -
                        </p>
                    </div>
                </div>
                <p className='absolute top-[80%] md:top-[78%] w-full px-[36px] text-xs md:text-sm text-center text-gray-500'>
                    테스트 계정이 아닌 경우, 해당 기능은 제한됩니다.
                </p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2 w-full'>
            <h1 className='text-xl md:text-2xl font-semibold'>업데이 리포트</h1>
            <div className='card flex flex-row gap-2 p-6 w-full h-[172px] md:h-[296px] justify-evenly items-center'>
                <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                    <p className='text-sm md:text-base font-semibold'>
                        진행 중
                    </p>
                    <HiFire className='text-4xl md:text-6xl text-orange-400' />
                    <p className='text-sm md:text-base font-bold'>
                        {numClgDoing}
                    </p>
                </div>
                <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                    <p className='text-sm md:text-base font-semibold'>완료</p>
                    <HiDocumentCheck className='text-4xl md:text-6xl text-green-400' />
                    <p className='text-sm md:text-base font-bold'>
                        {numClgDone}
                    </p>
                </div>
                <div className='flex flex-col justilfy-center items-center gap-6 w-[30%]'>
                    <p className='text-sm md:text-base font-semibold'>
                        목표 달성율
                    </p>
                    <div className='relative flex justify-center'>
                        <HiMiniTrophy className='text-4xl md:text-6xl text-yellow-400' />
                        <FaStar className='absolute text-neutral-100 text-xs top-1 md:text-lg md:top-2' />
                    </div>
                    <p className='text-sm md:text-base font-bold'>
                        {achievementRate}%
                    </p>
                </div>
            </div>
        </div>
    );
}
