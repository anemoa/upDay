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
	const myPosts = useSelector((state) => state.userChallenge.myPosts);
	const loading = useSelector((state) => state.userChallenge.loading.joinedChallenges);

    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByMyPost, setFilterByMyPost] = useState(false);
    const [filterByDoingStatus, setFilterByDoingStatus] = useState(false);
    const [filterByDoneStatus, setFilterByDoneStatus] = useState(false);
    const [filteredChallenges, setFilteredChallenges] = useState([]);
	const [dataFetched, setDataFetched] = useState(false);


	// 초기화 시 로컬스토리지에서 값 바로 가져오기
	const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'));

	// 로그인하지 않은 유저의 경우 모달창 표시 (초기 상태를 false로 하고 나중에 확인)
	const [loginModalOpen, setLoginModalOpen] = useState(false);

	useEffect(() => {
		if(!loggedInUser){
			setLoginModalOpen(true);
		}
	}, [loggedInUser]);

	const handleCloseLoginModal = () => {
		setLoginModalOpen(false);
	}


	// 데이터 한 번만 가져오기
	useEffect(() => {
		if(loggedInUser && !dataFetched){
			dispatch(fetchJoinedChallengesFromSupabase(loggedInUser));
			dispatch(fetchMyPostFromSupabase(loggedInUser));
			setDataFetched(true);
		}
	}, [loggedInUser, dataFetched, dispatch]);


	// 필터링 로직을 메모이제이션 해서 최적화 하기

	const applyFilters = useCallback(() => {
		if(!joinedChallenges.length) return [];

		let filtered = [...joinedChallenges];

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

		// 내가 작성한 챌린지 글 필터링
		if (filterByMyPost) {
			filtered = filtered.filter(
				(challenge) => challenge.authorId === loggedInUser
			);
		}

		// 진행 중인 상태 필터링
		if (filterByDoingStatus) {
			filtered = filtered.filter((challenge) => challenge.participants && challenge.participants.some(p => p.authorId === loggedInUser && p.status === 'doing'));
		}
		
		// 완료 상태 필터링
		if (filterByDoneStatus) {
			filtered = filtered.filter((challenge) => challenge.participants && challenge.participants.some(p => p.authorId === loggedInUser && p.status === 'done'));
		}

		return filtered;

	}, [
        categoryFilter,
        searchTerm,
        joinedChallenges,
        filterByMyPost,
        filterByDoingStatus,
        filterByDoneStatus,
		loggedInUser
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