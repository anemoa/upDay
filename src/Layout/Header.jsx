import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNev';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useState(
        localStorage.getItem('loggedInUser')
    );
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    // 특정 페이지에만 z-index 높게 설정
    const isHighZIndexPage = [
        '/challengelist',
        '/',
        '/main',
        '/mypage',
    ].includes(location.pathname);

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

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`w-full h-[80px] fixed top-0 bg-blue-100 no-scroll  ${isHighZIndexPage ? 'z-50' : ''}`}
        >
            <header className='flex justify-between items-center w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto pb-[20px] pt-[12px]'>
                {/* 로고 */}
                <Link
                    to='main'
                    className='bagel-fat-one-regular h-[46px] text-[30px]/9 '
                >
                    UpDay
                </Link>

                {/* 데스크톱 메뉴 */}
                <DesktopNav
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                />

                {/* 모바일 메뉴 */}
                <MobileNav
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                    loggedInUser={loggedInUser}
                    handleLogout={handleLogout}
                />
            </header>
        </div>
    );
};

export default Header;
