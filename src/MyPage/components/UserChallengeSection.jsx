import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserChallengeSearch from './UserChallengeSearch';
import UserChallengeList from './UserChallengeList';
import { fetchChallengesFromSupabase } from '../../store/features/challengeSlice';
import ModalForLogin from '../../common/ModalForLogin';
import { fetchJoinedChallengesFromSupabase, fetchMyPostFromSupabase } from '../../store/features/userChallengeSlice';

const UserChallengeSection = () => {
    const dispatch = useDispatch();
    const joinedChallenges = useSelector((state) => state.userChallenge.joinedChallenges) || [];
	const myPosts = useSelector((state) => state.userChallenge.myPosts) || [];
	const loading = useSelector((state) => state.userChallenge.loading);

	// 필터링 관련 상태
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByMyPost, setFilterByMyPost] = useState(true);
    const [filterByDoingStatus, setFilterByDoingStatus] = useState(false);
    const [filterByDoneStatus, setFilterByDoneStatus] = useState(false);
    const [filteredChallenges, setFilteredChallenges] = useState([]);

	// 사용자 id 가져오기
	const userId = localStorage.getItem('loggedInUser');

	// 로그인하지 않은 유저의 경우 모달창 표시 (초기 상태를 false로 하고 나중에 확인)
	const [loginModalOpen, setLoginModalOpen] = useState(false);

	useEffect(() => {
		if(!userId){
			setLoginModalOpen(true);
		}
	}, [userId]);


	const handleCloseLoginModal = () => {
		setLoginModalOpen(false);
	}

	// 데이터 가져오기
	useEffect(() => {
		// localStorage에 이미 데이터가 로드되었다는 표시가 있는지 확인
		const hasLoadedData = localStorage.getItem('hasLoadedChallengeData');
		
		if(userId){
			console.log('데이터 로드 시작');
			dispatch(fetchJoinedChallengesFromSupabase(userId));
			dispatch(fetchMyPostFromSupabase(userId));

		}
	}, [dispatch, userId]);

	useEffect(() => {
	}, [myPosts, joinedChallenges]);


	// 필터링 로직을 메모이제이션 해서 최적화 하기
	const applyFilters = useCallback(() => {
		let dataSource = filterByMyPost ? myPosts : joinedChallenges;

		// 데이터 없으면 빈 배열로 반환하기
		if(!dataSource.length) {
			
			return [];
		}

		let filtered = [...dataSource];

		// 카테고리 필터	
		if (categoryFilter !== '전체') {
			filtered = filtered.filter(
				(challenge) => challenge.category === categoryFilter
			);
		}

		// 검색어 필터링
		if (searchTerm.trim() !== '') {
			const lowerSearchTerm = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(challenge) =>
					challenge.title.toLowerCase().includes(lowerSearchTerm) ||
					challenge.content.toLowerCase().includes(lowerSearchTerm)
			);
		}

		// 진행 중인 상태 필터링
		if (filterByDoingStatus) {
			filtered = filtered.filter((challenge) => challenge.participants && challenge.participants.some(p => String(p.author_id) === String(userId) && p.status === 'doing'));
		}
		
		// 완료 상태 필터링
		if (filterByDoneStatus) {
			filtered = filtered.filter((challenge) => challenge.participants && challenge.participants.some(p => String(p.author_id) === String(userId) && p.status === 'done'));
		}

		return filtered;

	}, [
        categoryFilter,
        searchTerm,
        joinedChallenges,
		myPosts,
        filterByMyPost,
        filterByDoingStatus,
        filterByDoneStatus,
		userId
    ]);



    // 필터링 적용
    useEffect(() => {
		const filtered = applyFilters();
		setFilteredChallenges(filtered);
    }, [applyFilters]);



    return (
        <div className='w-full h-[637px] md:h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 px-[24px] py-[32px] md:p-[36px]'>
            <UserChallengeSearch
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterByMyPost={filterByMyPost}
                setFilterByMyPost={setFilterByMyPost}
                filterByDoingStatus={filterByDoingStatus}
                setFilterByDoingStatus={setFilterByDoingStatus}
                filterByDoneStatus={filterByDoneStatus}
                setFilterByDoneStatus={setFilterByDoneStatus}
            />
            <UserChallengeList filteredChallenges={filteredChallenges} myPosts={myPosts} />
			
			{/* 로그인 모달 */}
			<ModalForLogin isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
        </div>
    );
}


export default UserChallengeSection;