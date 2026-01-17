import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PopularChallenges from './PopularChallenges';
import OngoingChallenges from './OngoingChallenges';
import UserInfo from './UserInfo';
import ButtonIcon from '../images/button.svg';
import SpoonIcon from '../../assets/images/common/spoon.svg';
import DustIcon from '../../assets/images/common/dust.svg';
import LampIcon from '../../assets/images/common/Lamp.svg';
import HeartIcon from '../../assets/images/common/heart.svg';
import MainFlower from '../images/main_logo.svg';
import MbFlower from '../images/mb_flower.svg';
import ChallengeIcon from '../images/challenge-2.svg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChallengesFromSupabase } from '../../store/features/challengeSlice';
import { supabaseApi } from '../../utils/supabaseApi';

const MainLayout = () => {
    const dispatch = useDispatch();
    const challenges = useSelector((state) => state.challenge.list) || [];
    const [userName, setUserName] = useState('');
    const [challengeDays, setChallengeDays] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    // ✅ 챌린지 데이터 가져오기
    useEffect(() => {
        dispatch(fetchChallengesFromSupabase());
    }, [dispatch]);

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
                        setChallengeDays(diffDays + 1);
                    }
                    setIsLoggedIn(true);

                    // ✅ 이메일 → 숫자 ID 변환
                    const fetchUserId = async () => {
                        const userId =
                            await supabaseApi.getUserIdByEmail(
                                loggedInUserEmail
                            );
                        setCurrentUserId(userId);
                    };
                    fetchUserId();
                }
            } catch (error) {
                console.error('로컬 스토리지 데이터 파싱 오류:', error);
            }
        }
    }, []);

    // ✅ 진행 중인 챌린지 필터링 (participants에서)
    const filteredChallenges = useMemo(() => {
        if (!isLoggedIn || !currentUserId || !challenges.length) {
            return [];
        }

        return challenges.filter((challenge) => {
            return challenge.participants?.some(
                (p) =>
                    String(p.author_id) === String(currentUserId) &&
                    p.status === 'doing'
            );
        });
    }, [isLoggedIn, currentUserId, challenges]);

    // ✅ 인기 챌린지 정렬 (post_clicked 기준)
    const sortedChallenges = useMemo(() => {
        if (!challenges || challenges.length === 0) {
            return [];
        }
        return [...challenges]
            .sort((a, b) => (b.post_clicked || 0) - (a.post_clicked || 0))
            .slice(0, 5);
    }, [challenges]);

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
        <>
            <Helmet>
                <title>홈 - UpDay</title>
            </Helmet>
            <div className="h-[1143px] md:h-[796px] w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto flex flex-col md:flex-row md:gap-[4%]">
                {/* 왼쪽 콘텐츠 */}
                <div className="relative w-full h-[796px] md:w-[48%] flex flex-col items-center">
                    <div className="w-full md:h-full flex flex-col gap-44 md:justify-between z-20">
                        <UserInfo
                            userName={userName}
                            challengeDays={challengeDays}
                        />
                        <OngoingChallenges
                            userChallengeData={filteredChallenges}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>

                    <img
                        src={MainFlower}
                        alt="웹 메인 로고"
                        className="hidden md:flex md:absolute w-[95%] bottom-80 right-0 "
                    />
                    <img
                        src={MbFlower}
                        alt="모바일 메인 로고"
                        className="absolute w-[150px] top-12 right-12 md:hidden"
                    />
                </div>
                <div className="h-[796px] w-full md:w-[48%] flex flex-col gap-60 md:gap-10 -mt-64 md:m-0 ">
                    <PopularChallenges challenges={sortedChallenges} />
                    <div>
                        <div className="relative mt-1 mb-12 md:mt-0 md:mb-4">
                            <img
                                src={ChallengeIcon}
                                alt="챌린지 아이콘"
                                className="hidden md:block w-[180px]"
                            />
                            <h2 className="absolute z-20 font-bold text-lg md:text-xl md:text-neutral-100 mb-6 md:top-[6px] md:left-[28px]">
                                챌린지 카테고리
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={category.path}
                                    className={`card p-4 ${category.color} relative flex justify-between items-center`}
                                    style={{ height: '196.5px' }}
                                >
                                    <div className="h-[100%] flex flex-col justify-between items-between`">
                                        <span className="text-2xl font-semibold whitespace-nowrap">
                                            {category.name}
                                        </span>
                                        <img
                                            src={ButtonIcon}
                                            alt="Button"
                                            className="w-8 h-8"
                                        />
                                    </div>
                                    <div className="absolute h-full right-0 object-contain flex items-center">
                                        <img
                                            src={category.icon}
                                            alt={`${category.name} icon`}
                                            className="mr-4 pt-2 h-[65%]"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainLayout;
