import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinChallenge } from '../../store/features/challengeSlice';
import { useNavigate } from 'react-router-dom';
import useLoginModal from '../../common/hooks/useLoginModal';

const ModalFooter = ({ userImg, nickname, isMyPost, mode, onSubmit, onClose, challengeId }) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem('loggedInUser');
	const {openLoginModal, renderLoginModal} = useLoginModal();
	const selectedChallenge = useSelector(state => state.challenge.selectedChallenge);

	const handleJoin = () => {
		!loggedInUser ? openLoginModal() : dispatch(joinChallenge({ id: challengeId }));
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
