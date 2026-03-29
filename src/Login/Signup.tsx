import { Helmet } from 'react-helmet';
import LoginLayout from './components/LoginLayout';
import SignupForm from './components/SignupForm';

const Signup = () => {
    return (
        <>
            <Helmet>
                <title>회원가입 - UpDay</title>
            </Helmet>
            <LoginLayout title="회원가입">
                <SignupForm />
            </LoginLayout>
        </>
    );
};

export default Signup;
