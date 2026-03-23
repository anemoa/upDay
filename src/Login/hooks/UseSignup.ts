import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../../store/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';

const useSignup = () => {
    const [email, setEmailState] = useState<string>('');
    const [password, setPasswordState] = useState<string>('');
    const [passwordConfirm, setPasswordConfirmState] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [pwError, setPwError] = useState<string>('');
    const [pwConfirmError, setPwConfirmError] = useState<string>('');
    const [error, setError] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const clglist = useSelector(
        (state: RootState) => state.challenge.list ?? []
    );

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password: string) =>
        password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newEmailError = '';
        let newPwError = '';
        let newPwConfirmError = '';
        let newError = '';

        if (!validateEmail(email)) {
            newEmailError = '올바른 이메일 형식을 입력하세요.';
        }

        if (!validatePassword(password)) {
            newPwError = '8자 이상이며 특수문자를 포함해야 합니다.';
        }

        if (password !== passwordConfirm) {
            newPwConfirmError = '비밀번호가 일치하지 않습니다.';
        }

        const users:{email: string}[] = JSON.parse(localStorage.getItem('users') ?? '[]');
        if (users.some((user) => user.email === email)) {
            newError = '이미 등록된 아이디입니다.';
        }

        if (clglist.some((challenge) => challenge.author_id === Number(email))) {
            newError = '이미 등록된 아이디입니다.';
        }

        setEmailError(newEmailError);
        setPwError(newPwError);
        setPwConfirmError(newPwConfirmError);
        setError(newError);

        if (newEmailError || newPwError || newPwConfirmError || newError)
            return;

        dispatch(setEmail(email));
        dispatch(setPassword(password));

        navigate('/profile');
    };

    return {
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
    };
};

export default useSignup;
