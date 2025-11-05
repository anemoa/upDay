import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinChallengeToSupabase } from '../../store/features/challengeSlice';
import useLoginModal from '../../common/hooks/useLoginModal';

const ModalFooter = ({ userImg, nickname, isMyPost, mode, onSubmit, onClose, challengeId }) => {

	const dispatch = useDispatch();
	const loggedInUser = localStorage.getItem('loggedInUser');
	const {openLoginModal, renderLoginModal} = useLoginModal();
	const selectedChallenge = useSelector(state => state.challenge.selectedChallenge);

	const handleJoin = async () => {
    if (!loggedInUser) {
        openLoginModal();
        return;
    }
    
    try {
        // currentUser 정보 가져오기 필요
        const userString = localStorage.getItem('users');
        const localUsers = userString ? JSON.parse(userString) : [];
        const currentUser = localUsers.find((user) => user.email === loggedInUser);
        
        await dispatch(joinChallengeToSupabase({ 
            challengeId: challengeId,
            authorId: currentUser?.id
        })).unwrap();
        
        alert('챌린지 참여 성공!');
    } catch (error) {
        console.error('참여 실패:', error);
        alert('참여에 실패했습니다.');
    }
}

	const handleShare = ()=> {
		alert('준비중입니다')
	}

	if(mode === 'create' || mode === 'edit'){
		return (
			<div className='flex justify-between'>
				<button className='btn btn-negative w-[35%]' onClick={onClose}>취소하기</button>
				<button className='btn btn-primary w-[60%]' onClick={onSubmit}>
					{mode === 'create' ? '등록하기' : '수정하기'}
				</button>
			</div>
		)
	}

    return (
        <div className='flex justify-between w-[100%]'>
            <div className='flex items-center'>
                <div className='w-8 h-8 overflow-hidden rounded-[50%]'>
                    <img src={userImg} alt={`${nickname} 사진`} className='w-full h-full object-cover' />
                </div>
                <p className='ml-2 text-sm font-light'>{nickname}</p>
            </div>
            <div className='w-[50%]'>
                {isMyPost ? (
                    <button onClick={handleShare} className='btn-primary btn w-[100%]'>
                        공유하기
                    </button>
                ) : (
                    <button onClick={handleJoin} className='btn-primary btn w-[100%]'>
                        {selectedChallenge?.clgJoin ? '참여중' : '참여하기'}
                    </button>
                )}
            </div>
			{renderLoginModal()}
        </div>
    );
};

export default ModalFooter;
