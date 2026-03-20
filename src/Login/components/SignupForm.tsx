import useSignup from '../hooks/UseSignup';

const SignupForm = () => {
    const {
        email,
        password,
        emailError,
        pwError,
        passwordConfirm,
        pwConfirmError,
        error,
        setEmailState,
        setPasswordState,
        setPasswordConfirmState,
        handleSubmit,
    } = useSignup();

    return (
        <div className='flex items-center flex-col text-center'>
            <div className='text-lg mt-[3rem] mb-[2.5rem]'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col items-start gap-1 mb-3'>
                        <label htmlFor='email' className='text-left'>
                            이메일
                        </label>
                        <input
                            type='email'
                            placeholder='ㅇㅇㅇ@example.com'
                            value={email}
                            onChange={(e) => setEmailState(e.target.value)}
                            className='input-field w-[18rem] h-[2.8rem] mb-3 pl-3
                            md:w-80 md:mb-4 '
                        />
                        {emailError && (
                            <div className='text-red-400'>{emailError}</div>
                        )}
                        {error && <div className='text-red-400'>{error}</div>}
                    </div>

                    <div className='flex flex-col items-start gap-2 mb-4'>
                        <label htmlFor='password' className='text-left'>
                            비밀번호
                        </label>
                        <input
                            type='password'
                            placeholder='8자 이상 특수문자 포함'
                            value={password}
                            onChange={(e) => setPasswordState(e.target.value)}
                            className='input-field w-[18rem] h-[2.8rem] mb-3 pl-3
                            md:w-80 md:mb-4 '
                        />
                        {pwError && (
                            <div className='text-red-400'>{pwError}</div>
                        )}
                    </div>

                    <div className='flex flex-col items-start gap-2 mb-4'>
                        <label htmlFor='passwordConfirm' className=' text-left'>
                            비밀번호 확인
                        </label>
                        <input
                            type='password'
                            placeholder='8자 이상 특수문자 포함'
                            value={passwordConfirm}
                            onChange={(e) =>
                                setPasswordConfirmState(e.target.value)
                            }
                            className='input-field w-[18rem] h-[2.8rem] mb-3 pl-3
                            md:w-80 md:mb-4 '
                        />
                        {pwConfirmError && (
                            <div className='text-red-400'>{pwConfirmError}</div>
                        )}
                    </div>

                    <button
                        type='submit'
                        className='btn btn-black w-[18rem] h-[2.8rem] mt-[2.5rem]
                        md:w-[20rem] md:mt-[2.5rem] md:mb-[2.1258rem] '
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;
