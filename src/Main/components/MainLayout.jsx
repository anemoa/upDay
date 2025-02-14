import React from 'react';
import { Helmet } from 'react-helmet';

const MainLayout = ({ children }) => {
    return (
        <>
            <Helmet>
                <title>홈 - UpDay</title>
            </Helmet>
            <main className='w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto flex flex-col md:flex-row gap-4 justify-between'>
                {children}
                <section className='flex flex-col w-full md:w-[48%] gap-4 md:gap-6'></section>
            </main>
        </>
    );
};

export default MainLayout;

