import useProfileSetup from '../hooks/UseProfileSetup';
import pic1 from '../img/Group 195.svg';
import pic2 from '../img/Group 145.svg';

const ProfileForm = () => {
    const {
        nickname,
        profileImage,
        error,
        isModalOpen,
        setNicknameState,
        handleImageUpload,
        handleSubmit,
        closeModal,
    } = useProfileSetup();

    return (
        <div className='flex items-center flex-col text-center'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col items-start gap-1 mb-3'
            >
                <label
                    htmlFor='file-upload'
                    className='flex items-center justify-center cursor-pointer rounded-lg block bg-neutral-300 w-[18rem] h-[18rem] mt-[2.5rem] 
                    md:w-[20rem] md:h-[20rem] md:mt-[3rem]'
                >
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt='프로필 미리보기'
                            className='w-[18rem] h-[18rem] object-cover rounded-lg
                            md:w-[20rem] md:h-[20rem]'
                        />
                    ) : (
                        <span className='text-neutral-500'>이미지 업로드</span>
                    )}
                </label>
                <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                />
                <input
                    type='text'
                    placeholder='닉네임'
                    value={nickname}
                    onChange={(e) => setNicknameState(e.target.value)}
                    className='input-field w-[18rem] h-[2.8rem] mb-3 mt-[1rem]
                    md:w-80 md:mb-4 md:mb-3 md:pl-3 md:mt-[2rem]'
                />
                {error && <div className='text-red-400'>{error}</div>}
                <button
                    type='submit'
                    className='btn btn-black w-[18rem] h-[2.8rem] mt-[2rem]
                    md:w-[20rem] md:py-3 md:mt-[2.5rem] md:mb-[2.1258rem]'
                >
                    설정 완료
                </button>
            </form>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-50 backdrop-blur-sm'>
                    <div
                        className='relative  flex items-center justify-center w-[360px] h-[411px]
                        md:w-[630px] md:h-[640px]'
                    >
                        <img
                            src={pic1}
                            alt='회원가입 완료'
                            className='absolute inset-0 w-full h-full object-cover hidden md:block'
                        />
                        <img
                            src={pic2}
                            alt='회원가입 완료'
                            className='absolute inset-0 object-cover block md:hidden'
                        />

                        <div className='absolute top-[12%] left-1/2 transform -translate-x-1/2 text-center text-black'>
                            <div
                                className='font-bold whitespace-nowrap text-2xl
                                md:mb-4 md:text-4xl '
                            >
                                회원 가입이 완료되었습니다 !
                            </div>
                            <div className='leading-relaxed mt-[2rem]  leading-[2.2] md:text-xl md:mt-[3rem] '>
                                이제 업데이와 함께 챌린지 도전해보세요! <br />
                                원하던 목표를 이룰 수 있게 도와드려요 ❤ <br />
                            </div>
                            <button
                                onClick={closeModal}
                                className='text-basic bg-blue-400 text-white rounded-lg mt-[1.5rem] px-4 py-1 md:mt-[4rem] md:px-6 md:py-2 md:rounded-xl md:text-xl '
                            >
                                로그인 하러가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileForm;
