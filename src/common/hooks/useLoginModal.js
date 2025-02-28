import { useNavigate } from 'react-router-dom';
import useModal from './useModal';
import LoginRequiredModal from '../components/LoginRequiredModal';

// 로그인 모달 관련 기능을 제공하는 커스텀 훅
const useLoginModal = () => {
  // 기본 모달 상태와 함수 가져오기
  const { isModalOpen, openModal, closeModal } = useModal();
  
  // 페이지 이동 함수
  const navigate = useNavigate();
  
  // 모달 닫고 로그인 페이지로 이동하는 함수
  const navigateToLogin = () => {
    closeModal();
    navigate('/login');
  };
  
  // 로그인 모달 렌더링 함수
  const renderLoginModal = (props = {}) => (
    <LoginRequiredModal
      isOpen={isModalOpen}
      onClose={closeModal}
      onNavigate={navigateToLogin}
      {...props} // 추가 props 병합
    />
  );
  
  return {
    openLoginModal: openModal,
    closeLoginModal: closeModal,
    isLoginModalOpen: isModalOpen,
    navigateToLogin,
    renderLoginModal
  };
};

export default useLoginModal;