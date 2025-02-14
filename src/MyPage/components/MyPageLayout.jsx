import React, { useEffect, useState, useCallback } from 'react';
import useModal from '../../common/hooks/useModal';
import { Helmet } from 'react-helmet';
import MyPageNonLogin from './MyPageNonLogin';
import UserProfile from './UserProfileSection';
import UserReport from './UserReportSection';
import TabSwitcher from './TabSwitcher';
import ModalForLogin from '../../common/ModalForLogin';

const MyPageLayout = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const checkUserLogin = useCallback(() => {
        const storedUser = localStorage.getItem('loggedInUser');
        const storedUsers = localStorage.getItem('users');
        if (!storedUser || !storedUsers) {
            openModal();
        } else {
            try {
                setLoggedInUser(storedUser);
            } catch (error) {
                console.error('Error parsing loggedInUser:', error);
                setLoggedInUser(storedUser);
            }
        }
    }, [openModal]);

    useEffect(() => {
        checkUserLogin();
    }, [checkUserLogin]);

    return (
        <main className='w-[90%] md:w-[80%] md:max-w-[1344px] mx-auto flex flex-col md:flex-row gap-4 justify-between'>
            <Helmet>
                <title>마이페이지 - UpDay</title>
            </Helmet>
            {!loggedInUser ? (
                <MyPageNonLogin />
            ) : (
                <>
                    <section className='flex flex-col w-full md:w-[48%] gap-4 md:gap-6'>
                        <UserProfile />
                        <UserReport />
                    </section>
                    <TabSwitcher />
                </>
            )}
            <ModalForLogin
                isOpen={isModalOpen} // 모달 열기 여부
                onClose={closeModal} // 모달 닫기
            />
        </main>
    );
};

export default MyPageLayout;
