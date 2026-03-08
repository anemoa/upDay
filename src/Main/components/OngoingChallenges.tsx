// OngoingChallenges.jsx

import React from 'react';
import MainChallenge from './MainChallenge';
import { Challenge } from '../../types';

interface OngoingChallengesProps {
    userChallengeData: Challenge[];
    isLoggedIn: boolean;
}

const OngoingChallenges = ({ userChallengeData, isLoggedIn }: OngoingChallengesProps) => {
    return (
        <div className=''>
            <MainChallenge
                userChallengeData={userChallengeData}
                isLoggedIn={isLoggedIn}
            />
        </div>
    );
};

export default OngoingChallenges;