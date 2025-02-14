import React, { useState, useEffect } from 'react';
import ChallengeIcon from '../images/challenge-2.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PopularChallenges = ({ challenges }) => {
    const [currentChallenges, setCurrentChallenges] = useState([]);
    const [challengeIndex, setChallengeIndex] = useState(0);

    useEffect(() => {
        if (challenges && challenges.length > 0) {
            const sortedChallenges = [...challenges].sort(
                (a, b) => b.postClicked - a.postClicked
            );
            setCurrentChallenges(sortedChallenges.slice(0, 9));
        }
    }, [challenges]);

    useEffect(() => {
        const interval = setInterval(() => {
            setChallengeIndex(
                (prevIndex) => (prevIndex + 1) % currentChallenges.length
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [currentChallenges.length]);

    const handlePrevChallenge = () => {
        setChallengeIndex(
            (prevIndex) =>
                (prevIndex - 1 + currentChallenges.length) %
                currentChallenges.length
        );
    };

    const handleNextChallenge = () => {
        setChallengeIndex(
            (prevIndex) => (prevIndex + 1) % currentChallenges.length
        );
    };

    if (currentChallenges.length < 3) return null;

    return (
        <div className='relative w-full'>
            <div className='relative z-10'>
                <img
                    src={ChallengeIcon}
                    alt='챌린지 아이콘'
                    className='absolute w-[170px] top-[-12px] left-[-5px] hidden md:block'
                />
                <h2 className='relative text-lg md:text-xl font-bold md:text-white mb-6 z-20 top-[-135px] md:top-[-5px] md:left-[12px]'>
                    인기 있는 챌린지
                </h2>
            </div>

            <div className='relative z-10 flex gap-4 md:flex-col snap-mandatory scrollbar-hide top-[-145px] md:top-[0] md:mt-0 justify-center md:justify-start'>
                {[0, 1, 2].map((offset) => {
                    const index =
                        (challengeIndex + offset) % currentChallenges.length;
                    const challenge = currentChallenges[index];
                    const isHighlighted = offset === 0;
                    return (
                        <div
                            key={index}
                            className={`bg-white p-4 rounded-xl md:text-lg font-semibold transition-all duration-500 ease-in-out 
                                ${isHighlighted ? 'opacity-100 scale-105' : 'opacity-50 scale-100'} 
                                w-[95%] md:w-full shrink-0 snap-center
                                relative flex items-center justify-between
                                ${offset !== 0 ? 'hidden md:flex' : ''}`}
                        >
                            <button
                                onClick={handlePrevChallenge}
                                className='absolute left-2 md:hidden'
                            >
                                <IoIosArrowBack size={24} />
                            </button>
                            <div className='w-full px-8'>
                                <div>
                                    <span className='mr-2 font-bold'>
                                        {index + 1}.
                                    </span>
                                    {challenge.title}
                                </div>
                                <div className='text-sm text-gray-600'>
                                    {challenge.description}
                                </div>
                            </div>
                            <button
                                onClick={handleNextChallenge}
                                className='absolute right-2 md:hidden'
                            >
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
