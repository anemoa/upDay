import React, { useState, useEffect } from 'react';
import { differenceInDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/1.svg';
import img2 from '../img/2.svg';
import img3 from '../img/3.svg';
import img4 from '../img/4.svg';

const UserProfile = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [daysSinceSignup, setDaysSinceSignup] = useState(0);
    const defaultImages = [img1, img2, img3, img4];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoggedInUser = () => {
            const loggedInUserEmail = localStorage.getItem('loggedInUser');
            const usersData = localStorage.getItem('users');

            if (!loggedInUserEmail) {
                navigate('/login');
                return;
            }

            if (usersData) {
                try {
                    const users = JSON.parse(usersData);
                    const foundUser = users.find(user => user.email === loggedInUserEmail);

                    if (foundUser) {
                        setLoggedInUser(foundUser);
                        const signupDate = new Date(foundUser.signupDate);
                        const today = new Date();
                        const days = differenceInDays(today, signupDate);
                        setDaysSinceSignup(days + 1);
                    }
                } catch (error) {
                    console.error('로컬 스토리지 데이터 파싱 오류:', error);
                }
            }
        };

        fetchLoggedInUser();
    }, [navigate]);

    if (!loggedInUser) {
        return null;
    }


    return (
        <div className='flex flex-col gap-2'>
            <h1 className='text-xl md:text-2xl font-semibold'>내 프로필</h1>
            <div className='card flex flex-col gap-3 md:gap-6 p-[24px] md:p-[36px]'>
                <div className='flex flex-row items-center'>
                    <div className='inline-block w-[42%] max-w-[180px] md:w-[50%] md:max-w-[200px] aspect-square mr-[10%]'>
                        {loggedInUser.profileImage ? (
                            <img
                                alt='프로필 이미지'
                                src={loggedInUser.profileImage}
                                className='w-full h-full object-cover rounded-full ring-2 ring-neutral-300 overflow-hidden'
                            />
                        ) : (
                            <img
                                alt='기본 프로필 이미지'
                                src={defaultImages[Math.floor(Math.random() * defaultImages.length)]}
                                className='w-full h-full object-cover rounded-full ring-2 ring-neutral-300 overflow-hidden'
                            />
                        )}


                    </div>
                    <div className='flex flex-col h-[200px] justify-evenly'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xl md:text-2xl font-semibold'>
                                {loggedInUser.nickname || '닉네임 없음'}
                            </p>
                            <p className='text-xs md:text-sm font-normal text-neutral-500'>
                                {loggedInUser.email || '이메일 없음'}
                            </p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-xs md:text-sm font-semibold'>
                                <span className='text-blue-500'>
                                    {daysSinceSignup}
                                </span>
                                일 째 업데이 중
                            </p>
                            <p className='text-xs md:text-sm font-normal text-neutral-500'>
                                {loggedInUser.signupDate || '가입일 정보 없음'}
                            </p>
                        </div>
                    </div>
                </div>
                <p className='text-xs md:text-sm h-[62px] md:h-[100px] overflow-hidden text-ellipsis whitespace-wrap'>
                    {loggedInUser.about ||
                        '아직 소개글을 작성하지 않았습니다. 프로필을 업데이트해보세요!'}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
