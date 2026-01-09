// MainChallenge.jsx

import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../index';

const ArrowButton = ({ direction, onClick }) => {
    return (
        <button
            onClick={onClick}
            className='bg-white rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 md:w-8 md:h-8'
        >
            {direction === 'left' ? (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='black'
                    className='w-5 h-5'
                >
                    <path
                        fillRule='evenodd'
                        d='M15.707 19.707a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 1 1 1.414 1.414L9.414 12l6.293 6.293a1 1 0 0 1 0 1.414z'
                        clipRule='evenodd'
                    />
                </svg>
            ) : (
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='black'
                    className='w-5 h-5'
                >
                    <path
                        fillRule='evenodd'
                        d='M8.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 1 1-1.414-1.414L14.586 12 8.293 5.707a1 1 0 0 1 0-1.414z'
                        clipRule='evenodd'
                    />
                </svg>
            )}
        </button>
    );
};

const calculateDaysPassed = (joinDate) => {
    const start = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const MainChallenge = ({ userChallengeData, isLoggedIn }) => {
    const navigate = useNavigate();
    const [startIndex, setStartIndex] = useState(0);
    const challengesPerPage = 4;

	    const sortedChallenges = useMemo(() => {
        if (!userChallengeData || userChallengeData.length === 0) {
            return [];
        }

        return [...userChallengeData]
            .map((challenge) => {
                // participants에서 join_date 찾기
                const participant = challenge.participants?.find(
                    (p) => p.status === 'doing'
                );
                
                return {
                    ...challenge,
                    joinDate: participant?.join_date || participant?.created_at || challenge.created_at
                };
            })
            .sort((a, b) => {
                const dateA = new Date(a.joinDate);
                const dateB = new Date(b.joinDate);
                return dateA - dateB; // 오래된 순 (도전 일수가 많은 순)
            });
    }, [userChallengeData]);


    const handleLeftClick = () => {
        setStartIndex((prev) =>
            prev - challengesPerPage < 0 ? 0 : prev - challengesPerPage
        );
    };

    const handleRightClick = () => {
        setStartIndex((prev) =>
            prev + challengesPerPage >= filteredChallenges.length
                ? prev
                : prev + challengesPerPage
        );
    };

    return (
        <div>
            <div className='w-full flex justify-between items-center pl-0 p-4 md:p-4 rounded-t-3xl md:bg-neutral-800'>
                <h2 className='text-lg font-bold md:text-xl md:text-neutral-100'>
                    도전 중인 챌린지
                </h2>
                <div className='flex gap-3'>
                    <ArrowButton direction='left' onClick={handleLeftClick} />
                    <ArrowButton direction='right' onClick={handleRightClick} />
                </div>
            </div>

            {isLoggedIn ? (
                sortedChallenges.length > 0 ? (
                    <>
                        <div className='flex flex-wrap gap-3 md:py-2 md:mt-5 md:hidden w-full justify-start'>
                            {[...Array(3)].map((_, index) => {
                                const challenge =
                                    sortedChallenges[startIndex + index];
                                return (
                                    <div
                                        key={index}
                                        className='w-[calc(33.333%-0.5rem)] h-[100px] bg-white rounded-xl p-4 flex flex-col justify-between'
                                    >
                                        {challenge ? (
                                            <>
                                                <span className='text-medium font-semibold text-gray-700 truncate'>
                                                    {challenge.title}
                                                </span>
                                                <span className='text-[12px] md:text-sm text-gray-500'>
                                                    도전
                                                    <span className='ml-1'>
                                                        {calculateDaysPassed(
                                                            challenge.joinDate
                                                        )}
                                                    </span>
                                                    일 째
                                                </span>
                                            </>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>

                        <ul className='hidden md:block'>
                            {[...Array(challengesPerPage)].map((_, index) => {
                                const challenge =
                                    sortedChallenges[startIndex + index];
                                return (
                                    <li
                                        key={index}
                                        className={`py-4 bg-white border flex justify-between items-center ${index === challengesPerPage - 1 ? 'rounded-b-3xl' : ''} mb-0`}
                                        style={{ height: '60px' }}
                                    >
                                        {challenge ? (
                                            <>
                                                <span className='text-lg font-semibold text-gray-700 truncate w-2/3 ml-4'>
                                                    {challenge.title}
                                                </span>
                                                <span className='flex text-[10px] md:text-sm text-neutral-500 mr-4 whitespace-nowrap'>
                                                    도전
                                                    <span className='ml-1'>
                                                        {calculateDaysPassed(
                                                            challenge.joinDate
                                                        )}
                                                    </span>
														일 째
                                                    </span>
                                                    
                                            </>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <div className='text-center text-gray-500 py-6 font-semibold md:min-h-[250px] md:bg-neutral-100 md:rounded-b-3xl bg-neutral-100 rounded-xl'>
                        진행 중인 챌린지가 없습니다.
                    </div>
                )
            ) : (
                <div className='w-full h-[100px] md:h-[240px] card md:rounded-t-none flex md:flex-col items-center justify-between p-5 md:p-6 md:pt-20'>
                    <h2 className='text-sm md:text-base font-semibold text-neutral-700 ml-[3%]'>
                        로그인이 필요한 기능입니다.
                    </h2>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-key px-4 py-2 text-sm md:text-base '
                    >
                        로그인하러 가기
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainChallenge;
