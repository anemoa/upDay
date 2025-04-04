import React, { useEffect } from 'react';
import MyPageLayout from './components/MyPageLayout';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { fetchMyPostFromSupabase } from '../store/features/userChallengeSlice';

const MyPage = () => {

	const dispacth = useDispatch();

	useEffect(() => {
		const userId = localStorage.getItem('loggedInUser');
		dispacth(fetchMyPostFromSupabase(userId));
	}, [dispacth]);

    return (
        <>
            <Helmet>
                <title>마이페이지 - UpDay</title>
            </Helmet>
            <MyPageLayout className="mt-[200px]" />
        </>
    );
};

export default MyPage;
