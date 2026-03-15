import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ useLocation 추가
import { setUser } from '../../store/features/userSlice';
import { userData } from '../../data/userData';
import { getUserProfile, supabaseApi } from '../../utils/supabaseApi';
import { AppDispatch } from '../../store';

interface LocationState {
    email?: string;
    password?: string;
}

const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
	const locationState = location.state as LocationState | null;

    const defaultEmail = 'test01@naver.com';
    const [defaultPassword, setDefaultPassword] = useState<string>('aaaa11!!');

    const [email, setEmail] = useState<string>(location.state?.email || defaultEmail);
    const [password, setPassword] = useState<string>(
        location.state?.password || defaultPassword
    );
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const loadTestPassword = async () => {
            try {
                const userId = await supabaseApi.getUserIdByEmail(defaultEmail);
                const userData = await getUserProfile(userId);
                setDefaultPassword(userData.password || 'aaaa11!!');
            } catch (error) {
                console.log('기본 비밀번호 로드 실패');
            }
        };
        loadTestPassword();
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
