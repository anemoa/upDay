import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation 추가
import { setUser } from '../../store/features/userSlice';
import { userData } from '../../data/userData';
import { getUserProfile, supabaseApi } from '../../utils/supabaseApi';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const defaultEmail = 'test01@naver.com';
    const defaultPassword = 'aaaa11!!';

    const [email, setEmail] = useState(location.state?.email || defaultEmail);
    const [password, setPassword] = useState(
        location.state?.password || defaultPassword
    );
    const [error, setError] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(userData));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userId = await supabaseApi.getUserIdByEmail(email);
            if (!userId) {
                setError('등록되지 않은 이메일입니다.');
                return;
            }

            const userData = await getUserProfile(userId);

            if (userData.password === password) {
                setError('');
                localStorage.setItem('loggedInUser', userData.email);
                dispatch(setUser({ email: userData.email }));
                navigate('/main');
                window.location.reload();
            } else {
                setError('비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            setError('로그인 중 오류가 발생했습니다.');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleSubmit,
    };
};

export default useLogin;
