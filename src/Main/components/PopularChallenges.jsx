import React, { useState, useEffect, useMemo } from 'react';
import ChallengeIcon from '../images/challenge-2.svg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedChallenge } from '../../store/features/challengeSlice';

const PopularChallenges = ({ challenges }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [challengeIndex, setChallengeIndex] = useState(0);

    const currentChallenges = useMemo(() => {
        return challenges?.slice(0, 9) || [];
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

	const handleChallengeClick = (challenge) => {
        dispatch(setSelectedChallenge(challenge));
        navigate(`/challengelist/${challenge.id}`);
    };

    return (
        <div className="w-full">
            <div className="relative mb-4 -mt-10 md:mt-4">
                <img
                    src={ChallengeIcon}
                    alt="챌린지 아이콘"
                    className="hidden md:block w-[180px]"
                />
                <h2 className="md:absolute md:top-[6px] md:left-[24px] z-20 font-bold text-lg md:text-xl md:text-neutral-100 md:mb-6">
                    인기 있는 챌린지
                </h2>
            </div>

            <div className="relative z-10 flex gap-4 md:flex-col snap-mandatory scrollbar-hide md:top-[0] md:mt-0 justify-center md:justify-start ">
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
                                className="absolute z-20 left-2 md:hidden"
                            >
                                <IoIosArrowBack size={18} />
                            </button>
                            <div className="w-full px-8">
                                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                                    <span className="mr-2 font-bold">
                                        {index + 1}.
                                    </span>
                                    {challenge.title}
                                </div>
                                <div className="text-sm text-gray-600 line-clamp-2">
                                    {challenge.content}
                                </div>
                            </div>
                            <button
                                onClick={handleNextChallenge}
                                className="absolute z-20 right-2 md:hidden"
                            >
                                <IoIosArrowForward size={18} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularChallenges;
