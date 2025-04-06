import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyJoinedChallenge } from '../../store/features/userChallengeSlice';
import UserChallengeSearch from './UserChallengeSearch';
import UserChallengeList from './UserChallengeList';

const UserChallengeSection = () => {
    const dispatch = useDispatch();
    const joinedChallenges =
        useSelector((state) => state.myClgList.joinedChallenges) || [];
    const TEST_ACCOUNT_EMAIL = 'test01@naver.com'; // 테스트 계정 이메일 고정
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isTestAccount, setIsTestAccount] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMyPost, setIsMyPost] = useState('');
    const [isDoingClg, setIsDoingClg] = useState('');
    const [isDoneClg, setIsDoneClg] = useState('');
    const [filteredChallenges, setFilteredChallenges] = useState([]);

    useEffect(() => {
        dispatch(getMyJoinedChallenge());
    }, [dispatch]);

    useEffect(() => {
        if (joinedChallenges.length > 0) {
            setFilteredChallenges([...joinedChallenges]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 테스트 계정 여부 확인
    useEffect(() => {
        if (users.length > 0 && loggedInUser) {
            setIsTestAccount(loggedInUser === TEST_ACCOUNT_EMAIL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUser]);

    // localStorage 값 가져올 때 예외 처리
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('loggedInUser') || '';
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

            setLoggedInUser(storedUser);
            setUsers(storedUsers);
        } catch (error) {
            console.error('Error parsing localStorage data:', error);
            setLoggedInUser('');
            setUsers([]);
        }
    }, []);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        categoryFilter,
        searchTerm,
        joinedChallenges,
        isMyPost,
        isDoingClg,
        isDoneClg,
    ]);

    if (!isTestAccount) {
        return (
            <div className='w-full h-[637px] md:h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 px-[24px] py-[32px] md:p-[36px]'>
                <UserChallengeSearch />
                <p className='text-xs md:text-sm text-center text-gray-500 mt-4'>
                    테스트 계정이 아닌 경우, 해당 기능은 제한됩니다.
                </p>
            </div>
        );
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
        </div>
    );
}

export default UserChallengeSection;