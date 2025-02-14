import React from 'react';
import ChallengeListLayout from './components/ChallengeListLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaPlus } from 'react-icons/fa6';

const ChallengeList = () => {
    // 글 생성하는 모달로 가게 하기 위해 호출
    const navigate = useNavigate();

    // 클릭시 글 생성하는 모달로 이동하는 로직
    const handleCreateClick = () => {
        navigate('create');
    };

    return (
        <>
            <Helmet>
                <title>챌린지 둘러보기 - upDay</title>
            </Helmet>
            <ChallengeListLayout />
            <Outlet />
            <button
                className='flex items-center justify-center fixed bottom-[10%] right-[10%] w-[6.125rem] h-[6.125rem] text-7xl text-neutral-100 rounded-full bg-blue-500'
                onClick={handleCreateClick}
            >
                <FaPlus />
            </button>
        </>
    );
};

export default ChallengeList;
