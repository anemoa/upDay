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
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false); // 화면이 커지면 메뉴 닫기
            }
        };
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    return (
        
        <header className='bpx=border flex justify-between items-center w-full mx-auto h-[80px] pb-[20px] pt-[12px] px-[10%] fixed top-0 z-[50] box-border bg-blue-100 no-scroll'>
            {/* 로고 */}
            <Link
                to='main'
                className='bagel-fat-one-regular h-[46px] text-[30px]'
            >
                UpDay
            </Link>

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
                        <div className='w-6 h-1 bg-black mb-1 rounded-full'></div>
                        <div className='w-6 h-1 bg-black mb-1 rounded-full'></div>
                        <div className='w-6 h-1 bg-black rounded-full'></div>
                    </>
                )}
            </button>

            {/* (데스크톱) */}
            <nav className='mt-[22px] items-center justify-center hidden md:text-[20px] md:block h-full '>
                <ul className='flex space-x-10'>
                    <li className='w-[130px] h-[46px] text-end'>
                        <Link to='/challengelist' className='hover:font-black'>
                            챌린지 둘러보기
                        </Link>
                    </li>
                    <li className='w-[90px] h-[46px] text-end'>
                        <Link to='/mypage' className='hover:font-black'>
                            마이페이지
                        </Link>
                    </li>
                    <li className='w-[70px] h-[46px] text-start'>
                        {loggedInUser ? (
                            <button
                                onClick={handleLogout}
                                className='hover:font-black'
                            >
                                로그아웃
                            </button>
                        ) : (
                            <Link to='/login' className='hover:font-black'>
                                로그인
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>

            {isMenuOpen && (
                <div className='fixed inset-0 bg-white flex flex-col items-center justify-center h-screen w-screen z-[40]'>
                    {/* 메뉴 리스트 */}
                    <nav className='text-center space-y-10'>
                        <ul className='text-2xl font-semibold w-full'>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/challengelist'>챌린지 둘러보기</Link>
                            </li>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/mypage'>마이페이지</Link>
                            </li>
                            <li className='block py-4 text-center'>
                                {loggedInUser ? (
                                    <button onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                ) : (
                                    <Link to='/login'>
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
