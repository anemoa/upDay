import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem('loggedInUser')
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedInUser(localStorage.getItem('loggedInUser'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <header className='flex justify-between items-center w-[80%] max-w-[1344px] mx-auto h-20 mb-10 mt-3 relative'>
            {/* 로고 */}
            <Link to='main' className='h-10 bagel-fat-one-regular text-3xl'>
                UpDay
            </Link>

            {/* 햄버거 버튼 / X 버튼 (모바일) */}
            <button
                className='md:hidden flex flex-col items-center justify-center w-8 h-8 z-50 relative'
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                {isMenuOpen ? (
                    <span className='text-4xl font-bold text-black absolute '>
                        ✖
                    </span>
                ) : (
                    <>
                        <div className='w-6 h-1 bg-black mb-1'></div>
                        <div className='w-6 h-1 bg-black mb-1'></div>
                        <div className='w-6 h-1 bg-black'></div>
                    </>
                )}
            </button>

            {/* 네비게이션 (데스크톱) */}
            <nav className='hidden md:block'>
                <ul className='flex space-x-10'>
                    <li>
                        <Link to='/challengelist' className='hover:underline'>
                            챌린지 둘러보기
                        </Link>
                    </li>
                    <li>
                        <Link to='/mypage' className='hover:underline'>
                            마이페이지
                        </Link>
                    </li>
                    <li>
                        {loggedInUser ? (
                            <button
                                onClick={handleLogout}
                                className='hover:underline'
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link to='/login' className='hover:underline'>
                                로그인
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>

            {/* 🛠️ 풀스크린 햄버거 메뉴 (모바일) */}
            {isMenuOpen && (
                <div className='fixed inset-0 bg-white flex flex-col items-center justify-center h-screen w-screen'>
                    {/* 메뉴 리스트 */}
                    <nav className='text-center space-y-10'>
                        <ul className='text-2xl font-semibold w-full'>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/challengelist'>챌린지 둘러보기</Link>
                            </li>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/mypage'>마이페이지</Link>
                            </li>
                            <li className='block py-4 text-center w-full'>
                                {loggedInUser ? (
                                    <button onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                ) : (
                                    <Link to='/login' className='block py-4'>
                                        로그인
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
