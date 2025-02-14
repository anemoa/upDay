import React, { useState, useEffect, useMemo } from 'react';
import MainLayout from '../Main/components/MainLayout';
import PopularChallenges from '../Main/components/PopularChallenges';
import OngoingChallenges from '../Main/components/OngoingChallenges';
import UserInfo from './components/UserInfo';
import ChallengeIcon from './images/challenge-2.svg';
import ButtonIcon from './images/button.svg';
import SpoonIcon from '../assets/images/common/spoon.svg';
import DustIcon from '../assets/images/common/dust.svg';
import LampIcon from '../assets/images/common/Lamp.svg'; // 대소문자 확인 필수
import HeartIcon from '../assets/images/common/heart.svg';
import MainFlower from './images/main_logo.svg';
import { userChallengeList } from '../data/userChallengeData';
import { Link } from 'react-router-dom';

const Main = () => {
    const [userName, setUserName] = useState('');
    const [challengeDays, setChallengeDays] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 상태 확인 및 사용자 정보 설정
    useEffect(() => {
        const loggedInUserEmail = localStorage.getItem('loggedInUser');
        const usersData = localStorage.getItem('users');

        if (usersData && loggedInUserEmail) {
            try {
                const users = JSON.parse(usersData);
                const foundUser = users.find(
                    (user) => user.email === loggedInUserEmail
                );

                if (foundUser) {
                    setUserName(foundUser.nickname || '데이메이커');
                    if (foundUser.signupDate) {
                        const signUpDate = new Date(foundUser.signupDate);
                        const today = new Date();
                        const diffDays = Math.floor(
                            (today - signUpDate) / (1000 * 60 * 60 * 24)
                        );
                        setChallengeDays(diffDays + 1); // 하루 더해서 설정
                    }
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('로컬 스토리지 데이터 파싱 오류:', error);
            }
        }
    }, []);

    // 진행 중인 챌린지 필터링 (useMemo로 최적화)
    const filteredChallenges = useMemo(() => {
        return Array.isArray(userChallengeList)
            ? userChallengeList.filter((challenge) => challenge.clgDoing)
            : [];
    }, []);

    // 인기 챌린지 정렬 (원본 배열을 수정하지 않도록 slice() 추가)
    const sortedChallenges = useMemo(() => {
        return Array.isArray(userChallengeList)
            ? [...userChallengeList]
                  .sort((a, b) => b.postClicked - a.postClicked)
                  .slice(0, 5)
            : [];
    }, []);

    // 챌린지 카테고리 데이터
    const categories = [
        {
            name: '식단',
            color: 'bg-mint-200',
            icon: SpoonIcon,
            path: '/challengelist/category/식단',
        },
        {
            name: '학습',
            color: 'bg-yellow-200',
            icon: LampIcon,
            path: '/challengelist/category/학습',
        },
        {
            name: '운동',
            color: 'bg-purple-200',
            icon: DustIcon,
            path: '/challengelist/category/운동',
        },
        {
            name: '습관',
            color: 'bg-pink-200',
            icon: HeartIcon,
            path: '/challengelist/category/습관',
        },
    ];

    return (
        <MainLayout>
            <div className='flex flex-col md:flex-row gap-6 md:gap-[90px]'>
                {/* 왼쪽 콘텐츠 */}
                <div className='w-full sm:w-full md:w-[600px] flex flex-col items-center relative'>
                    <div className='absolute top-[-20px] z-10 w-full text-center'>
                        <img
                            src={MainFlower}
                            alt='메인 로고'
                            className='hidden md:block absolute top-[265px] right-[-5px] w-[300px] md:w-[600px] h-auto'
                        />
                        <UserInfo
                            userName={userName}
                            challengeDays={challengeDays}
                            className='md:text-left text-right pr-4'
                        />
                    </div>
                    <div className='w-full mt-[100px]'>
                        {/* 진행 중인 챌린지 컴포넌트 */}
                        <OngoingChallenges
                            userChallengeData={filteredChallenges}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>
                </div>

                {/* 오른쪽 콘텐츠 */}
                <div className='w-full sm:w-full md:w-[650px] mt-20'>
                    {/* 인기 챌린지 컴포넌트 */}
                    <PopularChallenges challenges={sortedChallenges} />

                    <div className='mt-10 relative'>
                        <img
                            src={ChallengeIcon}
                            alt='챌린지 아이콘'
                            className='absolute z-0 top-[-7px] left-[-3px] w-[100px] md:w-[180px] mt-5 hidden md:block'
                        />
                        <h2 className='ml-1 text-lg font-bold md:text-white md:text-xl md:font-medium mb-1 flex items-center gap-2 relative z-100 top-[28px] md:left-[18px]'>
                            챌린지 카테고리
                        </h2>
                        <div className='grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 gap-5 mt-[50px] md:grid-cols-2'>
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={category.path}
                                    className={`p-4 rounded-xl ${category.color} flex flex-col justify-between relative`}
                                    style={{ height: '180px' }}
                                >
                                    <span className='text-2xl font-semibold'>
                                        {category.name}
                                    </span>
                                    <img
                                        src={ButtonIcon}
                                        alt='Button'
                                        className='absolute bottom-4 left-4 w-8 h-8'
                                    />
                                    <img
                                        src={category.icon}
                                        alt={`${category.name} icon`}
                                        className='absolute bottom-4 right-8 object-contain'
                                        style={{
                                            height:
                                                window.innerWidth <= 512
                                                    ? '100px'
                                                    : category.name === '식단'
                                                      ? '80%'
                                                      : category.name === '학습'
                                                        ? '70%'
                                                        : category.name ===
                                                            '운동'
                                                          ? '70%'
                                                          : '70%',
                                        }}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Main;
