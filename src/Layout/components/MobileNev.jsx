import React from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoMenu } from 'react-icons/io5';

const MobileNav = ({
    isMenuOpen,
    setIsMenuOpen,
    loggedInUser,
    handleLogout,
}) => {
    return (
        <>
            {isMenuOpen ? (
                <>
                    <div className='fixed inset-0 bg-neutral-100/95 flex flex-col items-center justify-center z-60 h-screen w-screen min-w-[390px]'>
                        <button
                            className='md:hidden flex flex-col items-center justify-center w-8 h-8 z-70 fixed top-5 right-8'
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <IoClose className='text-4xl font-bold text-black ' />
                        </button>
                        <nav className='text-center space-y-10'>
                            <ul className='text-2xl font-semibold w-full'>
                                <li className='block py-6 text-center w-full'>
                                    <Link
                                        to='/challengelist'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        챌린지 둘러보기
                                    </Link>
                                </li>
                                <li className='block py-6 text-center w-full'>
                                    <Link
                                        to='/mypage'
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        마이페이지
                                    </Link>
                                </li>
                                <li className='block py-6 text-center w-full'>
                                    {loggedInUser ? (
                                        <button onClick={handleLogout}>
                                            로그아웃
                                        </button>
                                    ) : (
                                        <Link
                                            to='/login'
                                            className='block'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            로그인
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            ) : (
                <button
                    className='md:hidden flex flex-col items-center justify-center w-8 h-8 z-70'
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                    {' '}
                    <IoMenu className='text-4xl font-bold text-black' />
                </button>
            )}
        </>
    );
};

export default MobileNav;
