import React, { useState, useEffect } from 'react';
import ChallengeIcon from '../images/challenge-2.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PopularChallenges = ({ challenges }) => {
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [challengeIndex, setChallengeIndex] = useState(0);

    // 초기 데이터 설정
    useEffect(() => {
        if (challenges && challenges.length > 0) {
            const sortedChallenges = [...challenges].sort((a, b) => b.postClicked - a.postClicked);
            setCurrentChallenges(sortedChallenges.slice(0, 9));
        }
    }, [challenges]);

    // 3초마다 challengeIndex 업데이트
    useEffect(() => {
        if (currentChallenges.length > 0) {
            const interval = setInterval(() => {
                setChallengeIndex((prevIndex) => (prevIndex + 1) % currentChallenges.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [currentChallenges]);

    // 현재 챌린지를 가져오는 함수
    const getChallenge = (offset) => {
        if (currentChallenges.length === 0) return null;
        const index = (challengeIndex + offset) % currentChallenges.length;
        return currentChallenges[index];
    };

    const handlePrevChallenge = () => {
        setChallengeIndex((prevIndex) => 
            (prevIndex - 1 + currentChallenges.length) % currentChallenges.length
        );
    };

    const handleNextChallenge = () => {
        setChallengeIndex((prevIndex) => 
            (prevIndex + 1) % currentChallenges.length
        );
    };

    return (
        <div className="relative w-full">
            {/* 제목과 아이콘 */}
            <div className="relative z-10">
                <img
                    src={ChallengeIcon}
                    alt="챌린지 아이콘"
                    className="absolute w-[170px] top-[-12px] left-[-5px] hidden md:block"
                />
                <h2 className="relative text-lg md:text-xl font-bold md:text-white mb-6 z-20 top-[-135px] md:top-[-5px] md:left-[12px]">
                    인기 있는 챌린지
                </h2>
            </div>

            {/* 챌린지 리스트 */}
            <div className="relative z-10 flex gap-4 md:flex-col snap-mandatory scrollbar-hide top-[-145px] md:top-[0] md:mt-0">
                {[0, 1, 2].map((offset) => {
                    const challenge = getChallenge(offset);
                    return (
                        <div
                            key={offset}
                            className={`bg-white p-4 rounded-xl md:text-lg font-semibold transform transition-all duration-500 ease-in-out 
                                ${offset === 0 ? 'opacity-100' : 'opacity-50 md:opacity-100'} 
                                w-[100%] md:w-full shrink-0 snap-center ${offset !== 0 ? 'hidden md:block' : ''}
                                relative flex items-center justify-between`}
                        >
                            <button onClick={handlePrevChallenge} className="absolute left-2 md:hidden">
                                <IoIosArrowBack size={24} />
                            </button>
                            <div className="w-full px-8">
                                {challenge ? (
                                    <>
                                        <div>{challenge.title}</div>
                                        <div>{challenge.description}</div>
                                    </>
                                ) : (
                                    <div>데이터를 불러오는 중...</div>
                                )}
                            </div>
                            <button onClick={handleNextChallenge} className="absolute right-2 md:hidden">
                                <IoIosArrowForward size={24} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularChallenges;