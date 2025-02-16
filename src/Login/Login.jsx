import { Helmet } from 'react-helmet';
import LoginLayout from './components/LoginLayout';
import LoginForm from './components/LoginForm';

const Login = () => {
    return (
        <>
            <Helmet>
                <title>로그인 - UpDay</title>
            </Helmet>
            <LoginLayout title="로그인 / 회원가입">
                <LoginForm />
            </LoginLayout>
        </>
    );
};

export default Login;
