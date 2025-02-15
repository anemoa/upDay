import { Link } from 'react-router-dom';
import useLogin from '../hooks/UseLogin';
import pic3 from '../img/kakao_login_large_wide 1.svg';
import pic4 from '../img/kakao_login_large_wide 2.svg';

const LoginForm = () => {
    const { email, setEmail, password, setPassword, error, handleSubmit } =
        useLogin();

    return (
        <div className='flex items-center flex-col text-center'>
            <div
                className='text-base mt-[28px] mb-[20px]
                md:text-lg md:mt-[3rem] md:mb-[2.5rem]'
            >
                로그인 방법을 선택하세요
            </div>
            <form
                onSubmit={handleSubmit}
                className='flex items-center flex-col'
            >
                <input
                    type='email'
                    placeholder='이메일'
                    className='input-field w-[18rem] h-[2.8rem] mb-3 pl-3
                    md:mb-4 md:pl-6 md:w-80'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='비밀번호'
                    className='input-field w-[18rem] h-[2.8rem] mb-3 pl-3
                    md:mb-4 md:pl-6 md:w-80'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className='text-red-400'>{error}</div>}
                <button
                    type='submit'
                    className='btn btn-black w-[18rem] h-[2.8rem] mt-[3rem]
                    md:w-[20rem] md:px-[136.5px] md:py-3'
                >
                    로그인
                </button>
            </form>
            <div className='w-full max-w-[288px] pt-[1.5rem] pb-[1.5rem] md:max-w-none flex items-center justify-center text-gray-700 text-xs font-medium'>
                <span className='flex-1 border-b border-neutral-800'></span>
                <span className='mx-6 leading-none'>또는</span>
                <span className='flex-1 border-b border-neutral-800'></span>
            </div>

            <img
                src={pic3}
                alt='카카오 로그인'
                className='hidden md:block mb:my-9'
            />
            <img src={pic4} alt='카카오 로그인' className='block md:hidden' />
            <Link
                to='/signup'
                className='text-neutral-700 text-base mt-[1.2rem] md:text-lg'
            >
                회원가입하기
            </Link>
        </div>
    );
};

export default LoginForm;
