import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DesktopNav = () => {
    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem('loggedInUser')
    );
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedInUser(localStorage.getItem('loggedInUser'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/');
    };

    return (
        <nav className='hidden md:flex items-center justify-center md:text-[20px] '>
            <ul className='flex space-x-10'>
                <li>
                    <Link
                        to='/challengelist'
                        className='hover:font-black flex items-center w-[130px] h-[46px] text-end'
                    >
                        챌린지 둘러보기
                    </Link>
                </li>
                <li>
                    <Link
                        to='/mypage'
                        className='hover:font-black flex items-center w-[88px] h-[46px] text-end'
                    >
                        마이페이지
                    </Link>
                </li>
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
