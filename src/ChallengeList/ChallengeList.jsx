import React, { useEffect } from 'react';
import ChallengeListLayout from './components/ChallengeListLayout';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaPlus } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { fetchChallengesFromSupabase } from '../store/features/challengeSlice';

const ChallengeList = () => {
    // 글 생성하는 모달로 가게 하기 위해 호출
    const navigate = useNavigate();

	const dispatch = useDispatch();


	// 컴폰너트 마운트 시 Supabase에서 챌린지 데이터 가져오기
	useEffect(() => {
		console.log('Dispatching fetchChallengesFromSupabase');
		dispatch(fetchChallengesFromSupabase())
	}, [dispatch])

    // 클릭시 글 생성하는 모달로 이동하는 로직
    const handleCreateClick = () => {
        navigate('create');
    };

    return (
        <>
            <Helmet>
                <title>챌린지 둘러보기 - UpDay</title>
            </Helmet>
            <ChallengeListLayout />
            <Outlet />
            <button
                className='flex items-center justify-center fixed bottom-[10%] right-[10%] w-[6.125rem] max-md:w-[3.5rem]  h-[6.125rem] max-md:h-[3.5rem] text-7xl max-md:text-3xl text-neutral-100 rounded-full bg-blue-500'
                onClick={handleCreateClick}
            >
                <FaPlus />
            </button>
        </>
    );
};

export default ChallengeList;
