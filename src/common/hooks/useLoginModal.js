import { useNavigate } from 'react-router-dom';
import useModal from './useModal';
import LoginRequiredModal from '../components/LoginRequiredModal';

// 로그인 모달 관련 기능을 제공하는 커스텀 훅 정의
const useLoginModal = () => {
  // 기본 모달 상태 관리 기능 가져오기
  const { isModalOpen, openModal, closeModal } = useModal();
  
  // 페이지 이동을 위한 함수 가져오기
  const navigate = useNavigate();
  
  // 로그인 페이지로 이동하는 함수
  // 모달을 닫고 로그인 페이지로 이동하는 작업을 한 번에 처리
  const navigateToLogin = () => {
    closeModal(); // 먼저 모달 닫기
    navigate('/login'); // 그 다음 로그인 페이지로 이동
  };
  
  // 로그인 모달을 렌더링하는 함수
  // 컴포넌트에서 매번 props를 설정하지 않고 쉽게 모달을 추가할 수 있게 함
  // props = {} : 추가 props가 없을 경우 기본값으로 빈 객체 사용
  const renderLoginModal = (props = {}) => (
    <LoginRequiredModal
      isOpen={isModalOpen} // 모달 표시 여부
      onClose={closeModal} // 모달 닫기 함수
      onNavigate={navigateToLogin} // 로그인 페이지 이동 함수
      stopPropagation={true} // 기본적으로 이벤트 버블링 방지 설정
      {...props} // 추가로 전달된 props가 있다면 병합 (기존 props 덮어쓰기 가능)
    />
  );
  
  // 훅의 반환값 - 외부에서 사용할 기능들을 객체로 묶어서 반환
  return {
    openLoginModal: openModal, // 모달 열기 함수 (이름을 더 명확하게 변경)
    closeLoginModal: closeModal, // 모달 닫기 함수 (이름을 더 명확하게 변경)
    isLoginModalOpen: isModalOpen, // 모달 상태 (이름을 더 명확하게 변경)
    navigateToLogin, // 로그인 페이지 이동 함수 (단축 속성명 사용: navigateToLogin: navigateToLogin과 동일)
    renderLoginModal // 모달 렌더링 함수 (단축 속성명 사용: renderLoginModal: renderLoginModal과 동일)
  };
};

export default useLoginModal;