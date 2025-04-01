import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalHeader from './components/ModalHeader';
import ModalContent from './components/ModalContent';
import ModalFooter from './components/ModalFooter';
import { createChallengeToSupabase, deleteChallengeFromSupbase, fetchChallengesFromSupabase, updateChallenge, updateChallengeInSupabase } from '../store/features/challengeSlice';
import { CATEGORY_IMAGES, userChallengeList } from '../data/userChallengeData';
import useLoginModal from '../common/hooks/useLoginModal';
import { supabaseApi } from '../utils/supabaseApi';


const PostDetailModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
	// 로그인 모달 커스텀 훅
	const {openLoginModal, renderLoginModal} = useLoginModal();

    // 현재 모드 확인
    const isCreateMode = pathname.endsWith('/create');
    const isEditMode = pathname.endsWith('/edit');
    const isViewMode = !isCreateMode && !isEditMode;

    const selectedChallenge = useSelector(
        (state) => state.challenge.selectedChallenge
    );

	console.log('selectedChallenge', selectedChallenge);
	

    const loggedInUser = localStorage.getItem('loggedInUser');
    
	// 로그인하지 않은 상태로 글 작성 시도할 경우 로그인 모달 표시하는 함수
    const checkLoginStatus = React.useCallback(() => {
        if (isCreateMode && !loggedInUser) {
            openLoginModal();
        }
    }, [isCreateMode, loggedInUser, openLoginModal]);

	// 글 작성 시도 시 로그인 상태 확인
    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    // 챌린지 생성 & 수정 모드일 때 사용할 상태
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        duration: '',
    });

    useEffect(() => {
        if (isEditMode && selectedChallenge) {
            setFormData({
                title: selectedChallenge.title,
                content: selectedChallenge.content,
                category: selectedChallenge.category,
                duration: selectedChallenge.duration,
            });
        }
    }, [isEditMode, selectedChallenge]); // isEditMode 혹은 selectedChallenge가 변경될 때마다 재렌더링

    // 존재하지 않는 글을 보려고 할 때 빈 화면을 보여주는 안전장치
    if (isViewMode && !selectedChallenge) {
        return null;
    }

    // 카테고리별 이미지를 가져오는 함수 추가
    const getCategoryImage = (category) => {
        return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
    };

    // 로그인 한 유저인지 확인하는 로직
    const isMyPost =
        isCreateMode || (selectedChallenge && selectedChallenge.users && selectedChallenge.users.email === loggedInUser);

    // 창 닫기
    const handleClose = () => {
        navigate('/challengelist');
    };

    // 수정 버튼 클릭시 수정하는 모달 상태창으로 변경하는 로직
    const handleUpdate = () => {
        navigate(`/challengelist/${selectedChallenge.id}/edit`);
    };

    // 글 작성하는 로직
    const handleSubmit = async () => {
		// 필수 입력 체크
    	if (
    	    !formData.title ||
    	    !formData.content ||
    	    !formData.duration ||
    	    !formData.category
    	) {
    	    alert('모든 항목을 입력하시오');
    	    return;
    	}

        if (isCreateMode) {
			try{

				// 유저의 숫자 ID 가져오기
				const userId = await supabaseApi.getUserIdByEmail(loggedInUser);

				if(!userId){
					alert('사용자 정보 없다');
					return
				}

				// Supabase에 저장할 데이터 형식에 맞춰 객체 생성
				const newChallengeData = {
					title: formData.title,
					content: formData.content,
					category: formData.category,
					duration: formData.duration,
					author_id: userId,
					post_date: new Date().toISOString(),
					post_clicked: 0,
				};
				
				// 챌린지 생성
				 await dispatch(createChallengeToSupabase(newChallengeData));
				 console.log('챌린지 생성 완료');

				 // 목록 새로 고침
				 await dispatch(fetchChallengesFromSupabase());
				 console.log('목록 새로고침 완료');
				 
				 // 페이지 이동
				 navigate('/challengelist');
				 
			} catch (error){
				console.error('error creating challenge: ' ,error);
				alert('글 작성 오류!')
			}

        } else if (isEditMode) {
			try{
				const updateData = {
					title: formData.title,
					content: formData.content,
					category: formData.category,
					duration: formData.duration,
					updated_at: new Date().toISOString()
				};

				// 챌린지 ID 가져오기
				const challengedId = selectedChallenge.id;

				// 수정 액션 디스패치
				await dispatch(updateChallengeInSupabase({
					id: challengedId,
					challengeData: updateData
				}))
			}catch (error){
				console.error('글 수정 중 오류:', error);
				alert('글 수정 중 오류가 발생했습니다.');
			}
            // 필수 입력 체크
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

            dispatch(updateChallenge(updatedChallenge));
            navigate('/challengelist');
        }
    };

    // 글 삭제하는 로직
    const handleDelete = async (id) => {
		try{
			await dispatch(deleteChallengeFromSupbase(id));
			console.log('챌린지 삭제 완료');
			
			// 목록 새로 고침
			await dispatch(fetchChallengesFromSupabase());
			console.log('삭제후 목록 새로고침 완료');

			// 페이지 이동
			navigate('/challengelist');
		} catch(error){
			console.error('error creating challenge: ' ,error);
			alert('글 삭제 오류!')
		}

    };

    return (
        <>
            {isCreateMode && !loggedInUser ? (
                renderLoginModal()
            ) : (
                <div
                    className='fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-[100]'
                    onClick={handleClose}
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
                                          : selectedChallenge?.category ===
                                              '운동'
                                            ? '#f2f2ff'
                                            : selectedChallenge?.category ===
                                                '습관'
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
                                        ? getCategoryImage(
                                              selectedChallenge?.category
                                          )
                                        : formData.category
                                          ? getCategoryImage(formData.category)
                                          : CATEGORY_IMAGES.default
                                }
                                alt=''
                            />
                        </div>
                        <ModalHeader
                            mode={ isCreateMode ? 'create' : isEditMode ? 'edit' : 'view' }
                            category={ isViewMode ? selectedChallenge?.category : formData.category }
                            duration={ isViewMode ? selectedChallenge?.duration : formData.duration }
                            isMyPost={isMyPost}
                            onChange={setFormData}
                            formData={formData}
                            onDelete={() => handleDelete(selectedChallenge.id)}
                            onUpdate={handleUpdate}
                        />
                        <ModalContent
                            mode={ isCreateMode ? 'create' : isEditMode ? 'edit' : 'view' }
                            title={ isViewMode ? selectedChallenge?.title : formData.title }
                            content={
                                isViewMode
                                    ? selectedChallenge?.content
                                    : formData.content
                            }
                            onChange={setFormData}
                            formData={formData}
                        />
                        <ModalFooter
                            mode={
                                isCreateMode ? 'create' : isEditMode ? 'edit' : 'view' }
                            userImg={ isViewMode ? selectedChallenge?.users.user_img
                                    : 'https://img.freepik.com/free-photo/happy-smiling-young-woman-outdoor-with-headphones_624325-2774.jpg?t=st=1739337349~exp=1739340949~hmac=09682bb91bc32e12f74294761387c2d0b03eb8ba74bc808b70070949c2b90a8c&w=900'
                            }
                            nickname={ isViewMode ? selectedChallenge?.users.nickname : '' }
                            isMyPost={isMyPost}
                            onSubmit={handleSubmit}
                            onClose={handleClose}
                            challengeId={selectedChallenge?.id}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default PostDetailModal;
