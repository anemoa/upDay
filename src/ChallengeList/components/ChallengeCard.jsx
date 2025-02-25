import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    joinChallenge,
    setSelectedChallenge,
} from '../../store/features/challengeSlice';
import { CATEGORY_IMAGES } from '../../data/userChallengeData';
import LoginRequiredModal from '../../common/components/LoginRequiredModal';
import useModal from '../../common/hooks/useModal';

const ChallengeCard = ({ cardData }) => {
    // cardData 구조분해할당
    const {
        id,
        category,
        duration,
        title,
        content,
        userImg,
        nickname,
        authorId,
        clgJoin,
    } = cardData;

    const { isModalOpen, openModal, closeModal } = useModal();

    // 라우터 이동을 위한 navigate 함수
    const navigate = useNavigate();

    // Redux 액션 dispatch를 위한 함수
    const dispatch = useDispatch();

    // 로그인 한 유저의 아이디
    const loggedInUser = localStorage.getItem('loggedInUser');

    // 로그인한 유저 정보 가져오기 (users 배열에서)
    const userString = localStorage.getItem('users');
    const users = userString ? JSON.parse(userString) : [];

    // 현재 로그인한 유저 정보 찾기
    const currentUser = users.find((user) => user.email === loggedInUser);

    // 내가 작성한 글이 아니고, 로그인한 유저가 있는 경우에만 참여 가능
    // const canJoin = loggedInUser && loggedInUser !== authorId && currentUser;
    // 로그인한 유저인지 확인
    const isLoggedIn = loggedInUser && currentUser;
    const isAuthor = loggedInUser === authorId;

    // 참여하기 버튼 핸들링
    const handleJoin = (e) => {
        e.stopPropagation(); // 이벤트 전파 중지
        e.preventDefault(); // 기본 동작 방지

        if (!loggedInUser) {
            openModal();
        } else {
            dispatch(joinChallenge({ id }));
        }
    };

    // 모달창 닫고 로그인 페이지로 이동하는 로직
    const handleNavigateToLogin = () => {
        closeModal();
        navigate('/login');
    };

    // 카드 클릭시 모달을 띄우는 이벤트 핸들러
    const handleCardClick = () => {
        // 선택한 카드의 데이터를 Redux store에 저장
        dispatch(setSelectedChallenge(cardData));

        // 해당 카드의 상세 모달 페이지로 이동
        navigate(`/challengelist/${id}`);
    };

    const getCategoryImage = (category) => {
        return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.default;
    };

    return (
        <div
            className="p-4 max-md:p-3 rounded-2xl bg-white"
            onClick={handleCardClick}
        >
            {/* 카테고리 & 기간 */}
            <div className="mb-4">
                <span
                    className="px-6 max-md:px-2 py-[6px] max-md:py-1 rounded-xl max-md:rounded-lg max-md:text-xs"
                    style={{
                        backgroundColor:
                            category === '식단'
                                ? '#c5ebe6'
                                : category === '학습'
                                  ? '#fef2c8'
                                  : category === '운동'
                                    ? '#e3e3f4'
                                    : category === '습관'
                                      ? '#ffdee7'
                                      : '#FBDCC3',
                    }}
                >
                    {category}
                </span>
                <span className="ml-4 max-md:ml-2 max-md:text-xs">
                    {duration}
                </span>
            </div>

            {/* 기본 제공 이미지 */}
            <div
                className="h-72 max-md:h-36 mb-4 p-[16px] rounded-2xl overflow-hidden"
                style={{
                    backgroundColor:
                        category === '식단'
                            ? '#e6f4f2'
                            : category === '학습'
                              ? '#fff9e6'
                              : category === '운동'
                                ? '#f2f2ff'
                                : category === '습관'
                                  ? '#fff1f5'
                                  : '#FBDCC3',
                }}
            >
                <img
                    src={getCategoryImage(cardData.category)}
                    className="h-full mx-auto"
                    alt={`${cardData.category} 챌린지`}
                />
            </div>

            {/* 챌린지 제목 & 내용 */}
            <div className="mb-4">
                <p className="h-auto mb-1 text-xl max-md:text-sm font-semibold line-clamp-1">
                    {title}
                </p>
                <p className="h-auto text-sm font-light max-md:text-xs line-clamp-2">
                    {content}
                </p>
            </div>

            {/* 유저 닉네임 & 사진 */}
            <div className="flex justify-between">
                <div className="flex justify-between items-center">
                    <div className="w-8 max-md:w-6 h-8 max-md:h-6 rounded-full overflow-hidden">
                        <img
                            src={userImg}
                            alt={`${nickname} 사진`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="ml-2 max-md:ml-1 text-sm max-md:text-xs font-light">
                        {nickname}
                    </p>
                </div>

                {/* 버튼 */}
                {/* {canJoin && (
                    <button
                        type='button'
                        className='btn btn-primary w-[40%] max-md:text-xs'
                        onClick={handleJoin}
                        disabled={clgJoin}
                    >
                        {clgJoin ? '참여중' : '참여하기'}
                    </button>
                )} */}
                {isLoggedIn && (
                    <button
                        type="button"
                        className="btn btn-primary w-[40%] max-md:text-xs"
                        onClick={handleJoin}
                    >
                        {isAuthor || clgJoin ? '참여중' : '참여하기'}
                    </button>
                )}
                <LoginRequiredModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onNavigate={handleNavigateToLogin}
                    stopPropagation={true}
                />
            </div>
        </div>
    );
};

export default ChallengeCard;
