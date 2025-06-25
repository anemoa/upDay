import React, { useState, useEffect, useRef, useMemo } from 'react';
import img1 from '../img/1.svg';
import img2 from '../img/2.svg';
import img3 from '../img/3.svg';
import img4 from '../img/4.svg';
import {
    getUserProfile,
    supabaseApi,
    updateUserInfo,
    upsertUserProfile,
} from '../../utils/supabaseApi';
import ImageSelectModal from './ImageSelectModal';

// 비밀번호 유효성 검사 함수
const validatePassword = (password) => {
    if (password.length < 8) {
        return '비밀번호는 8자 이상이어야 합니다.';
    }
    if (!/[a-z]/.test(password)) {
        return '비밀번호에는 소문자가 하나 이상 포함되어야 합니다.';
    }
    if (!/[0-9]/.test(password)) {
        return '비밀번호에는 숫자가 하나 이상 포함되어야 합니다.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
        return '비밀번호에는 특수 문자가 하나 이상 포함되어야 합니다.';
    }
    return null;
};

const validateNickname = (nickname) => {
    if (nickname.length > 6) {
        return '닉네임은 6글자 이내여야 합니다.';
    }
    return null;
};

export default function PersonalInfo() {
    // 1. 모든 useState들 (타입별로 그룹핑)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        nickname: '',
        confirmPassword: '',
        about: '',
        profileImage: null,
        signupDate: '',
    });
    const [passwordError, setPasswordError] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState(null);
    const [challengeList, setChallengeList] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    // 계산된 값
    const loggedInUserEmail = localStorage.getItem('loggedInUser');

    // 2. 모든 useRef들
    const uploadPhotoInput = useRef(null);

    // 3. 모든 useMemo들
    const defaultImages = useMemo(() => [img1, img2, img3, img4], []);

    // 4. 모든 useEffect들

    useEffect(() => {
        const fetchUserData = async () => {
            if (!loggedInUserEmail) return;

            try {
                // 1. email로 userId 찾기
                const userId =
                    await supabaseApi.getUserIdByEmail(loggedInUserEmail);

                // 2. 프로필 정보 가져오기
                if (userId) {
                    const userData = await getUserProfile(userId);
                    setLoggedInUser(userData);
                }
            } catch (error) {
                console.error('사용자 정보 조회 실패:', error);
                alert('프로필 정보를 불러올 수 없습니다.');
            }
        };

        fetchUserData();
    }, [loggedInUserEmail]);

    useEffect(() => {
        if (loggedInUser) {
            setUserInfo((prev) => {
                let initialProfileImage =
                    loggedInUser.user_profiles?.[0]?.profile_image;

                if (!initialProfileImage) {
                    initialProfileImage =
                        defaultImages[
                            Math.floor(Math.random() * defaultImages.length)
                        ];
                }

                const updatedInfo = {
                    ...prev,
                    email: loggedInUser.email || '',
                    password: '',
                    nickname: loggedInUser.nickname || '',
                    signupDate: loggedInUser.signupDate || '',
                    profileImage: initialProfileImage,
                    about: loggedInUser.user_profiles?.[0]?.about || '',
                };
                if (JSON.stringify(prev) === JSON.stringify(updatedInfo)) {
                    return prev;
                }
                return updatedInfo;
            });
        }
    }, [loggedInUser, defaultImages]);

    useEffect(() => {
        const challenges = JSON.parse(localStorage.getItem('clglist')) || [];
        setChallengeList(challenges);
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));

        if (name === 'nickname') {
            const error = validateNickname(value);
            setNicknameError(error || '');
        }

        if (name === 'password') {
            const error = validatePassword(value);
            setPasswordError(error || '');
        }

        if (name === 'confirmPassword') {
            if (value !== userInfo.password) {
                setPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
                setPasswordError('');
            }
        }
    };

    const handleImageChange = (imageUrl) => {
        setUserInfo((prev) => ({
            ...prev,
            profileImage: imageUrl,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. 닉네임 유효성 검사
        let error = validateNickname(userInfo.nickname);
        if (error) {
            setNicknameError(error);
            return;
        }

        // 2. 비밀번호 검사
        if (passwordError) {
            alert(passwordError);
            return;
        }

        if (userInfo.password !== userInfo.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 3. 닉네임 중복 검사
        // try {
        //     const existingUsers = await supabaseApi.get('users', 'nickname');
        //     const isNicknameTaken = existingUsers.some(
        //         (user) =>
        //             user.nickname === userInfo.nickname &&
        //             user.email !== loggedInUserEmail
        //     );

        //     if (isNicknameTaken) {
        //         setNicknameError('이 닉네임은 이미 사용 중입니다.');
        //         return;
        //     }
        // } catch (error) {
        //     console.error('닉네임 검사 실패:', error);
        //     alert('닉네임 검사 중 오류가 발생했습니다.');
        //     return;
        // }

        try {
            console.log('🔄 업데이트 시작');
            console.log('📧 loggedInUserEmail:', loggedInUserEmail);

            // 1. email로 userId 찾기
            const userId =
                await supabaseApi.getUserIdByEmail(loggedInUserEmail);
            console.log('✅ userId:', userId);

            console.log('📝 업데이트할 데이터:', {
                nickname: userInfo.nickname,
                ...(userInfo.password && { password: userInfo.password }),
            });

            // 2. users 테이블 업데이트 (디버깅 + 실제 실행)
            const result1 = await updateUserInfo(userId, {
                nickname: userInfo.nickname,
                ...(userInfo.password && { password: userInfo.password }),
            });
            console.log('✅ users 테이블 결과:', result1);

            // 3. user_profiles 테이블 업데이트 (디버깅 + 실제 실행)
            const result2 = await upsertUserProfile(userId, {
                about: userInfo.about,
                profile_image: userInfo.profileImage,
            });
            console.log('✅ user_profiles 테이블 결과:', result2);

            alert('프로필이 성공적으로 업데이트되었습니다!');
            setEditMode(false);

            // 4. 최신 데이터로 업데이트
            const updatedUserData = await getUserProfile(userId);
            console.log('🔍 getUserProfile 결과:', updatedUserData);
            setLoggedInUser(updatedUserData);
            console.log('🔍 setLoggedInUser 완료');
        } catch (error) {
            console.error('프로필 업데이트 실패:', error);
            alert('프로필 업데이트에 실패했습니다.');
        }
    };

    const handleEditMode = () => {
        setOriginalUserInfo({ ...userInfo });
        setEditMode(true);
    };

    const handleCancel = () => {
        setUserInfo(originalUserInfo);
        setEditMode(false);
        setPasswordError('');
        setNicknameError('');

        // If a new photo was selected but not saved, clear the input
        if (uploadPhotoInput.current) {
            uploadPhotoInput.current.value = ''; // Clear the file input
        }
    };

	const onClose = () => setIsOpen(false);
    const onImageSelect = (selectedImage) => {
        setUserInfo((prev) => ({
            ...prev,
            profileImage: selectedImage
        }));
    };

    if (!loggedInUser) {
        return (
            <div className="w-full h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 p-[36px]">
                <p className="text-center text-gray-500">
                    로그인한 유저 정보를 찾을 수 없습니다.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full h-[756px] rounded-r-3xl rounded-bl-3xl bg-neutral-100 p-[24px] md:p-[36px]">
            <form
                className="h-full flex flex-col justify-between"
                onSubmit={handleSubmit}
            >
                <div className="space-y-4 md:space-y-12">
                    <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-3">
                        <div className="col-span-full">
                            <label htmlFor="photo" className="block text-sm">
                                프로필 사진
                            </label>
                            <div className="mt-2 flex items-center gap-x-3">
                                {userInfo.profileImage ? (
                                    <div className="w-[25%] ring-2 ring-neutral-300 aspect-square overflow-hidden rounded-full flex-shrink-0">
                                        <img
                                            src={userInfo.profileImage}
                                            alt="프로필"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-[25%] aspect-square overflow-hidden rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200">
                                        <img
                                            src={
                                                defaultImages[
                                                    Math.floor(
                                                        Math.random() *
                                                            defaultImages.length
                                                    )
                                                ]
                                            }
                                            alt="기본 프로필"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="upload-photo"
                                    disabled={!editMode}
                                    ref={uploadPhotoInput}
                                />
                                <label
                                    htmlFor="upload-photo"
                                    className={`btn px-3 text-center whitespace-nowrap
                                            ${
                                                editMode
                                                    ? 'btn-primary'
                                                    : 'opacity-0 cursor-default'
                                            } `}
                                >
                                    사진 올리기
                                </label>
                                <input
                                    type="button"
                                    onClick={handleImageDelete}
                                    className="hidden"
                                    id="delete-photo"
                                    disabled={!editMode}
                                />
                                <label
                                    htmlFor="delete-photo"
                                    className={`btn px-3 text-center whitespace-nowrap
                                            ${
                                                editMode
                                                    ? 'btn-negative '
                                                    : 'opacity-0 cursor-default'
                                            } `}
                                >
                                    삭제하기
                                </label> */}
                                <button type='button' onClick={() => setIsOpen(true)}>
                                    이미지 변경
                                </button>

                                <ImageSelectModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    onImageSelect={onImageSelect}
                                    defaultImages={defaultImages}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm/6">
                                소개글
                            </label>
                            <div className="mt-2">
                                {editMode ? (
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        value={userInfo.about}
                                        onChange={handleChange}
                                        className="input-field block w-full rounded-xl bg-neutral-100 px-3 py-1.5 text-base border border-neutral-300 focus:outline-blue-500"
                                    />
                                ) : (
                                    <p className="bg-neutral-100 px-3 py-1.5 text-base border border-neutral-300 rounded-xl min-h-[72px]">
                                        {userInfo.about ||
                                            '아직 소개글을 작성하지 않았습니다. 프로필을 업데이트해보세요!'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 md:gap-x-4 md:gap-y-2 md:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="nickname"
                                className="block text-sm/6 font-medium"
                            >
                                닉네임
                            </label>
                            <div className="mt-2">
                                <input
                                    id="nickname"
                                    name="nickname"
                                    type="text"
                                    value={userInfo.nickname}
                                    onChange={handleChange}
                                    className="input-field block w-full rounded-xl bg-neutral-100 px-3 py-1.5 text-base border border-neutral-300 focus:outline-blue-500"
                                    disabled={!editMode}
                                />
                                {nicknameError && (
                                    <p className="text-red-500 text-sm">
                                        {nicknameError}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium"
                            >
                                email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={userInfo.email}
                                    className="input-field"
                                    readOnly
                                />
                            </div>
                        </div>
                        {editMode && (
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="password"
                                    className="block text-sm/6 font-medium"
                                >
                                    변경할 비밀번호
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={userInfo.password}
                                        onChange={handleChange}
                                        className="input-field block w-full rounded-xl bg-neutral-100 px-3 py-1.5 text-base border border-neutral-300 focus:outline-blue-500"
                                        disabled={!editMode}
                                    />
                                    {passwordError && (
                                        <p className="text-red-500 text-sm">
                                            {passwordError}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        {editMode && (
                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm/6 font-medium"
                                >
                                    변경할 비밀번호 확인
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={userInfo.confirmPassword}
                                        onChange={handleChange}
                                        className="input-field block w-full rounded-xl bg-neutral-100 px-3 py-1.5 text-base border border-neutral-300 focus:outline-blue-500"
                                        disabled={!editMode}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-center gap-x-6">
                    {!editMode ? (
                        <button
                            type="button"
                            onClick={() => setEditMode(true)}
                            className="btn btn-black w-[36%]  text-center whitespace-nowrap"
                        >
                            수정하기
                        </button>
                    ) : (
                        <div className="w-full  flex justify-center gap-x-4 whitespace-nowrap">
                            <button
                                type="button"
                                onClick={() => setEditMode(false)}
                                className="btn btn-negative flex-1 text-center"
                            >
                                취소하기
                            </button>
                            <button
                                type="submit"
                                className="btn btn-black flex-1 text-center"
                            >
                                저장하기
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
