import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNickname, setProfileImage } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/1.svg';
import img2 from '../img/2.svg';
import img3 from '../img/3.svg';
import img4 from '../img/4.svg';
import { AppDispatch, RootState } from '../../store';

interface NewUser {
    email: string;
    password: string;
    nickname: string;
    profileImage: string;
    signupDate: string;
}

const useProfileSetup = () => {
    const [nickname, setNicknameState] = useState<string>('');
    const [profileImage, setProfileImageState] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const email = useSelector((state: RootState) => state.user.email);
    const password = useSelector((state: RootState) => state.user.password);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
				const result = reader.result as string;
                setProfileImageState(result);
                dispatch(setProfileImage(result));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (nickname.length > 6) {
            setError('닉네임은 6글자 이내여야 합니다.');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some((user) => user.nickname === nickname)) {
            setError('이 닉네임은 이미 사용 중입니다.');
            return;
        }

        const defaultImages = [img1, img2, img3, img4];
        const randomImage =
            defaultImages[Math.floor(Math.random() * defaultImages.length)];

        // Redux 상태 업데이트
        dispatch(setNickname(nickname));

        const newUser = {
            email,
            password,
            nickname,
            profileImage: profileImage || randomImage, // 기본이미지 설정정
            signupDate: new Date().toISOString().split('T')[0], // 날짜만 저장
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setIsModalOpen(true); // 모달창 열기
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/login', { state: { email, password } }); // 로그인 페이지로 이동
    };

    return {
        nickname,
        profileImage,
        error,
        isModalOpen,
        setNicknameState,
        handleImageUpload,
        handleSubmit,
        closeModal,
    };
};

export default useProfileSetup;
