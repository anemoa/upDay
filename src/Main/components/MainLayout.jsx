import React from 'react';
import { Helmet } from 'react-helmet';

const MainLayout = ({ children }) => {
    return (
        <>
            <Helmet>
                <title>홈 - UpDay</title>
            </Helmet>
            <main className="w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[1344px] mx-auto flex flex-wrap gap-4 justify-center">
                {children}
            </main>
        </>
    );
};

export default MainLayout;
