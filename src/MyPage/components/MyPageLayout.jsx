import React from 'react';
import UserProfile from './UserProfileSection';
import UserReport from './UserReportSection';
import TabSwitcher from './TabSwitcher';

const MyPageLayout = () => {
    return (
        <main className="w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto flex flex-col md:flex-row gap-4 justify-between">
            <section className="flex flex-col w-full md:w-[48%] gap-4 md:gap-6">
                <UserProfile />
                <UserReport />
            </section>
            <TabSwitcher />
        </main>
    );
};

export default MyPageLayout;