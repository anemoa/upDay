import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRequiredModal from './components/LoginRequiredModal';

const ModalForLogin = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login'); // 로그인 페이지로 리디렉션
        onClose(); // 모달 닫기
    };
    return (
        <LoginRequiredModal
            isOpen={isOpen}
            onClose={onClose}
            onNavigate={handleNavigateToLogin} // 로그인 페이지로 가는 클릭 처리
        />
    );
};

export default ModalForLogin;