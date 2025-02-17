import { Helmet } from 'react-helmet';
import LoginLayout from './components/LoginLayout';
import ProfileForm from './components/ProfileForm';

const ProfileSetup = () => {

    return (
        <>
            <Helmet>
                <title>프로필 설정 - UpDay</title>
            </Helmet>
            <LoginLayout title='프로필 설정'>
                <ProfileForm />
            </LoginLayout>
        </>
    );
};

export default ProfileSetup;
