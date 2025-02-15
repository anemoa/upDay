import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MobileNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
        navigate('/');
        setIsMenuOpen(false);
    };

    return (
        <div className="md:hidden ">
            <button
                className='flex flex-col items-center justify-center w-8 h-8 z-[100] relative'
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                {isMenuOpen ? (
                    <span className='text-4xl font-bold text-black absolute'>
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

            {isMenuOpen && (
                <div className='fixed inset-0 bg-white flex flex-col items-center justify-center h-screen w-screen z-[99]'>
                    <nav className='text-center space-y-10'>
                        <ul className='text-2xl font-semibold w-full'>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/challengelist' onClick={() => setIsMenuOpen(false)}>챌린지 둘러보기</Link>
                            </li>
                            <li className='block py-4 text-center w-full'>
                                <Link to='/mypage' onClick={() => setIsMenuOpen(false)}>마이페이지</Link>
                            </li>
                            <li className='block py-4 text-center'>
                                {loggedInUser ? (
                                    <button onClick={handleLogout}>
                                        로그아웃
                                    </button>
                                ) : (
                                    <Link
                                        to='/login'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        로그인
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default MobileNav;
