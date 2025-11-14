import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    fetchMyPostFromSupabase
} from '../../store/features/userChallengeSlice';
import ModalHeader from '../../Modal/components/ModalHeader';
import ModalContent from '../../Modal/components/ModalContent';
import ModalFooter from '../../Modal/components/ModalFooter';
import { CATEGORY_IMAGES } from '../../data/userChallengeData';

const UserChallengeModal = ({ isOpen, onClose, stopPropagation = false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const selectedChallenge = useSelector(
        (state) => state.userChallenge.selectedChallenge
    );
    const myPosts = useSelector((state) => state.userChallenge.myPosts);
    const loggedInUser = localStorage.getItem('loggedInUser');

    // 현재 모드 확인
    const isEditMode = isOpen && pathname.includes('/edit');
    const isViewMode = isOpen && !isEditMode;

    // 챌린지 수정 모드일 때 사용할 상태
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        duration: '',
    });

    useEffect(() => {
		if(loggedInUser){
			dispatch(fetchMyPostFromSupabase(loggedInUser));
		}
    }, [dispatch, myPosts]);

    useEffect(() => {
        if (isEditMode && selectedChallenge) {
            setFormData({
                title: selectedChallenge.title || '',
                content: selectedChallenge.content || '',
                category: selectedChallenge.category || '',
                duration: selectedChallenge.duration || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditMode, selectedChallenge]); // id가 변경될 때만 실행

    if (!isOpen || !selectedChallenge) return null;

    const { id, authorId } = selectedChallenge;

    // 내가 작성한 챌린지인지 확인
    const isMyPost = loggedInUser === authorId;

    // 카테고리별 이미지를 가져오는 함수 추가
    const getCategoryImage = (category) => {
        return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
    };

    // 창 닫기
    const handleClose = () => {
        navigate('/mypage');
    };

    // 배경 누르면 창 닫기
    const handleBackgroundClick = (e) => {
        if (stopPropagation) {
            e.stopPropagation();
        }
        onClose(e);
    };

    // 수정 버튼 클릭시 수정하는 모달 상태창으로 변경하는 로직
    const handleUpdate = () => {
        navigate(`/mypage/${selectedChallenge.id}/edit`);
    };

    // 글 수정하는 로직
    const handleSubmit = () => {
        if (!isEditMode || !selectedChallenge) return;

        if (
            !formData.title ||
            !formData.content ||
            !formData.duration ||
            !formData.category
        ) {
            alert('모든 항목을 입력하시오');
            return;
        }

        // 수정된 내용 저장하는 로직
        const updatedChallenge = {
            ...selectedChallenge,
            ...formData,
        };

		// 임시로 콘솔 로그만
		console.log('challenge update not implemented yet', updatedChallenge);
		
		if(loggedInUser){
			dispatch(fetchMyPostFromSupabase(loggedInUser));
		}

        navigate('/mypage');
        onClose();
    };

    // 삭제 버튼 클릭 시 챌린지 삭제
    const handleDelete = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            console.log('챌린지 삭제 기능 아직임', id);
			
            onClose(); // 모달 닫기
        }
    };

    return (
        <div
            className='fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-[100]'
            onClick={handleBackgroundClick}
        >
            {/* 모달 내부 클릭시 닫히지 않도록 하는 메소드 */}
            <div
                className='w-[440px] max-md:w-[90%] max-md:mx-4 p-6 max-md:p-4 rounded-2xl bg-neutral-100'
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className='h-[384px] max-md:h-[280px] mb-4 max-md:mb-3 overflow-hidden rounded-2xl'
                    style={{
                        backgroundColor: isViewMode
                            ? selectedChallenge?.category === '식단'
                                ? '#e6f4f2'
                                : selectedChallenge?.category === '학습'
                                  ? '#fff9e6'
                                  : selectedChallenge?.category === '운동'
                                    ? '#f2f2ff'
                                    : selectedChallenge?.category === '습관'
                                      ? '#fff1f5'
                                      : '#F7F7F7'
                            : formData.category === '식단'
                              ? '#c5ebe6'
                              : formData.category === '학습'
                                ? '#fef2c8'
                                : formData.category === '운동'
                                  ? '#e3e3f4'
                                  : formData.category === '습관'
                                    ? '#ffdee7'
                                    : '#F7F7F7',
                    }}
                >
                    <img
                        className='h-full mx-auto p-[1rem]'
                        src={
                            isViewMode
                                ? getCategoryImage(selectedChallenge?.category)
                                : formData.category
                                  ? getCategoryImage(formData.category)
                                  : CATEGORY_IMAGES.default
                        }
                        alt=''
                    />
                </div>
                <ModalHeader
                    mode={isEditMode ? 'edit' : 'view'}
                    category={
                        isEditMode
                            ? formData.category // 수정 모드일 때 formData 사용
                            : selectedChallenge?.category // 보기 모드일 때 selectedChallenge 사용
                    }
                    duration={
                        isEditMode
                            ? formData.duration
                            : selectedChallenge?.duration
                    }
                    isMyPost={isMyPost}
                    onChange={setFormData}
                    formData={formData}
                    onDelete={() => handleDelete(selectedChallenge.id)}
                    onUpdate={handleUpdate}
                />
                <ModalContent
                    mode={isEditMode ? 'edit' : 'view'}
                    title={
                        isEditMode ? formData.title : selectedChallenge?.title
                    }
                    content={
                        isEditMode
                            ? formData.content
                            : selectedChallenge?.content
                    }
                    onChange={setFormData}
                    formData={formData}
                />
                <ModalFooter
                    mode={isEditMode ? 'edit' : 'view'}
                    userImg={
                        isEditMode
                            ? 'https://img.freepik.com/free-photo/happy-smiling-young-woman-outdoor-with-headphones_624325-2774.jpg?t=st=1739337349~exp=1739340949~hmac=09682bb91bc32e12f74294761387c2d0b03eb8ba74bc808b70070949c2b90a8c&w=900'
                            : selectedChallenge?.users?.user_img || 'https://via.placeholder.com/150'
                    }
                    nickname={isEditMode ? '' : selectedChallenge?.users?.nickname || '작성자'}
                    isMyPost={isMyPost}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                    challengeId={selectedChallenge?.id}
                />
            </div>
        </div>
    );
};

export default UserChallengeModal;