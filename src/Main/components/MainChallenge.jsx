// MainChallenge.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowButton = ({ direction, onClick }) => {
    return (
        <button
            onClick={onClick}
            className='bg-white rounded-full p-2 shadow-md flex items-center justify-center w-8 h-8'
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

    const filteredChallenges = userChallengeData
        .filter(
            (challenge) =>
                challenge.clgJoin === true && challenge.clgDoing === true
        )
        .sort((a, b) => {
            const daysA = calculateDaysPassed(a.joinDate);
            const daysB = calculateDaysPassed(b.joinDate);
            return daysA - daysB; // 숫자가 작은 순서대로 정렬
        });

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

    if (!isLoggedIn) {
        return (
            <div className='relative bg-neutral-800 rounded-xl w-full md:w-[600px] md:bottom-[-440px] bottom-[-260px]'>
                {/* 로그아웃 상태일 때 로그인 유도 화면 */}
                <div className='flex flex-col items-center justify-center p-10 bg-white rounded-xl max-h-[200px] md:max-h-none md:min-h-[300px]'>
                    <h2 className='text-xl font-medium text-gray-700 mb-4'>
                        로그인이 필요한 서비스입니다!
                    </h2>
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-blue-500 text-white px-5 py-3 rounded-lg text-medium font-semibold'
                    >
                        로그인 하러 가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='relative md:bg-neutral-800 rounded-xl top-[250px] md:top-[440px] w-full md:w-[600px] bottom-[-440px]'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-bold md:text-xl md:text-white relative md:left-4 top-2'>
                    도전 중인 챌린지
                </h2>
                <div className='relative flex gap-2 top-2 right-4 z-[30]'>
                    <ArrowButton direction='left' onClick={handleLeftClick} />
                    <ArrowButton direction='right' onClick={handleRightClick} />
                </div>
            </div>

            {/* 모바일에서는 카드 형식으로 변경 */}

            <div className='flex flex-wrap gap-3 py-2 mt-5 md:hidden w-full justify-start'>
                {[...Array(3)].map((_, index) => {
                    const challenge = filteredChallenges[startIndex + index];
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
                                    <span className='text-sm text-gray-500'>
                                        도전한 지{' '}
                                        {calculateDaysPassed(
                                            challenge.joinDate
                                        )}
                                        일째
                                    </span>
                                </>
                            ) : (
                                <span className='text-lg font-semibold text-gray-300'>
                                    챌린지를 더 늘려보세요!
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* 데스크탑에서는 기존 ul 형식 유지 */}
            <ul className='hidden md:block'>
                {[...Array(challengesPerPage)].map((_, index) => {
                    const challenge = filteredChallenges[startIndex + index];
                    return (
                        <li
                            key={index}
                            className={`py-4 bg-white border flex justify-between items-center ${index === challengesPerPage - 1 ? 'rounded-b-xl' : ''} mb-0`}
                            style={{ height: '60px' }}
                        >
                            {challenge ? (
                                <>
                                    <span className='text-lg font-semibold text-gray-700 truncate w-2/3 ml-4'>
                                        {challenge.title}
                                    </span>
                                    <span className='text-sm text-gray-500 mr-4'>
                                        도전한 지{' '}
                                        {calculateDaysPassed(
                                            challenge.joinDate
                                        )}
                                        일째
                                    </span>
                                </>
                            ) : (
                                <span className='text-lg font-semibold text-gray-300 ml-4'>
                                    챌린지를 더 늘려보세요!
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MainChallenge;
