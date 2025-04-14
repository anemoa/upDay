import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserChallengeSearch from './UserChallengeSearch';
import UserChallengeList from './UserChallengeList';
import { fetchChallengesFromSupabase } from '../../store/features/challengeSlice';
import ModalForLogin from '../../common/ModalForLogin';

const UserChallengeSection = () => {
    const dispatch = useDispatch();
    const joinedChallenges = useSelector((state) => state.userChallenge.joinedChallenges) || [];
	const loading = useSelector((state) => state.userChallenge.loading.joinedChallenges);

    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByMyPost, setFilterByMyPost] = useState(false);
    const [filterByDoingStatus, setFilterByDoingStatus] = useState(false);
    const [filterByDoneStatus, setFilterByDoneStatus] = useState(false);
    const [filteredChallenges, setFilteredChallenges] = useState([]);

	// 초기화 시 로컬스토리지에서 값 바로 가져오기
	const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('loggedInUser'));

	// 로그인하지 않은 유저의 경우 모달창 표시 초기 상태를 false로 하고 나중에 확인
	const [loginModalOpen, setLoginModalOpen] = useState(false);

	useEffect(() => {
		if(!loggedInUser){
			setLoginModalOpen(true);
		}
	}, [loggedInUser]);

	const handleCloseLoginModal = () => {
		setLoginModalOpen(false);
	}

	// supabase에서 참여한 챌린지 글 가져오기
    useEffect(() => {
		const userId = localStorage.getItem('loggedInUser');
		if(userId){
			setLoggedInUser(userId);
			dispatch(fetchChallengesFromSupabase(userId));
		}
    }, [dispatch]);

	// 데이터가 로드되면 필터링된 챌린지 초기화
    useEffect(() => {
        if (joinedChallenges.length > 0) {
            setFilteredChallenges([...joinedChallenges]);
        }
    }, [joinedChallenges]);


    // 검색에 따른 목록 노출
    useEffect(() => {
        let filtered = [...joinedChallenges];

		// 카테고리 필터링

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

        // 결과가 없으면 빈 배열을 설정하여 "검색 결과 없음"을 표시
        setFilteredChallenges(filtered.length > 0 ? filtered : []);
    }, [
        categoryFilter,
        searchTerm,
        joinedChallenges,
        filterByMyPost,
        filterByDoingStatus,
        filterByDoneStatus,
		loggedInUser
    ]);



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
            <UserChallengeList filteredChallenges={filteredChallenges} />
			
			{/* 로그인 모달 */}
			<ModalForLogin isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
        </div>
    );
}

export default UserChallengeSection;