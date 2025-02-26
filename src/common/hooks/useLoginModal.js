// useLoginModal.js - 전용 훅 만들기
import { useNavigate } from 'react-router-dom';
import useModal from './useModal';
import LoginRequiredModal from '../components/LoginRequiredModal';

const useLoginModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  
  const navigateToLogin = () => {
    closeModal();
    navigate('/login');
  };
  
  const renderLoginModal = (props = {}) => (
    <LoginRequiredModal
      isOpen={isModalOpen}
      onClose={closeModal}
      onNavigate={navigateToLogin}
      stopPropagation={true}
      {...props}
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