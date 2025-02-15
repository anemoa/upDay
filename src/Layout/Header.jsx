import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './components/MobileNev';
import DesktopNav from './components/DesktopNav';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-100 z-50">
        <header className='flex justify-between items-center w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto pb-[20px] pt-[12px]'>
                <Link
                    to='main'
                    className='bagel-fat-one-regular h-[46px] text-[30px]/9  z-[40]'
                >
                    UpDay
                </Link>
        <MobileNav />
        <DesktopNav />
        </header>
    </div>
  );
};

export default Header;
