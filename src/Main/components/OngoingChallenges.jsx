// OngoingChallenges.jsx

import React from 'react';
import MainChallenge from './MainChallenge';

const OngoingChallenges = ({ userChallengeData, isLoggedIn }) => {
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
