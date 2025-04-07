import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJoinedChallenge } from '../../store/features/userChallengeSlice';
import UserChallengeSearch from './UserChallengeSearch';
import UserChallengeList from './UserChallengeList';
import { fetchChallengesFromSupabase } from '../../store/features/challengeSlice';
import ModalForLogin from '../../common/ModalForLogin';

const UserChallengeSection = () => {
    const dispatch = useDispatch();
    const joinedChallenges = useSelector((state) => state.userChallenge.joinedChallenges) || [];
	const loading = useSelector((state) => state.userChallenge.loading.joinedChallenges);

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMyPost, setIsMyPost] = useState('');
    const [isDoingClg, setIsDoingClg] = useState('');
    const [isDoneClg, setIsDoneClg] = useState('');
    const [filteredChallenges, setFilteredChallenges] = useState([]);


	// supabase에서 참여한 챌린지 글 가져오기
    useEffect(() => {
		const userId = localStorage.getItem('loggedInUser');
		if(userId){
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

        if (categoryFilter !== '전체') {
            filtered = filtered.filter(
                (challenge) => challenge.category === categoryFilter
            );
        }
        if (searchTerm.trim() !== '') {
            const lowerSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (challenge) =>
                    challenge.title.toLowerCase().includes(lowerSearchTerm) ||
                    challenge.content.toLowerCase().includes(lowerSearchTerm)
            );
        }

        if (isMyPost) {
            filtered = filtered.filter(
                (challenge) => challenge.authorId === loggedInUser
            );
        }
        if (isDoingClg) {
            filtered = filtered.filter((challenge) => challenge.clgDoing);
        }
        if (isDoneClg) {
            filtered = filtered.filter((challenge) => challenge.clgDone);
        }

        // 결과가 없으면 빈 배열을 설정하여 "검색 결과 없음"을 표시
        setFilteredChallenges(filtered.length > 0 ? filtered : []);
    }, [
        categoryFilter,
        searchTerm,
        joinedChallenges,
        isMyPost,
        isDoingClg,
        isDoneClg,
		loggedInUser
    ]);

	// 로그인하지 않은 유저의 경우
	const [loginModalOpen, setLoginModalOpen] = useState(!loggedInUser);

	const handleCloseLoginModal = () => {
		setLoginModalOpen(false);
	}
	
    

    return (
        <div className='w-full h-[637px] md:h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 px-[24px] py-[32px] md:p-[36px]'>
            <UserChallengeSearch
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isMyPost={isMyPost}
                setIsMyPost={setIsMyPost}
                isDoingClg={isDoingClg}
                setIsDoingClg={setIsDoingClg}
                isDoneClg={isDoneClg}
                setIsDoneClg={setIsDoneClg}
            />
            <UserChallengeList filteredChallenges={filteredChallenges} />
			
			{/* 로그인 모달 */}
			<ModalForLogin isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
        </div>
    );
}

export default UserChallengeSection;