import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNav = ({ loggedInUser, handleLogout }) => {
    return (
        <nav className='hidden md:flex items-center justify-center text-[20px] h-full'>
            <ul className='flex space-x-10'>
                <li>
                    <Link
                        to='/challengelist'
                        className='hover:font-black flex items-center w-[130px] h-[46px] text-end'
                    >
                        챌린지 둘러보기
                    </Link>
                </li>
                
                {loggedInUser && ( // 로그인 상태일 때만 마이페이지 표시
                    <li>
                        <Link
                            to='/mypage'
                            className='hover:font-black flex items-center w-[88px] h-[46px] text-end'
                        >
                            마이페이지
                        </Link>
                    </li>
                )}

                <li>
                    {loggedInUser ? (
                        <button
                            onClick={handleLogout}
                            className='hover:font-black flex items-center w-[70px] h-[46px] text-end'
                        >
                            로그아웃
                        </button>
                    ) : (
                        <Link
                            to='/login'
                            className='hover:font-black flex items-center w-[70px] h-[46px] text-end'
                        >
                            로그인
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default DesktopNav;
