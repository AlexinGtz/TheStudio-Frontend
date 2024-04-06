import './ForgotPassword.css'
import { Email } from '../../components/Email/Email';
import { UpdatePassword } from '../UpdatePassword/UpdatePassword';
import { useState } from 'react';

export const ForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [token, setToken] = useState('');

    return (
        <div className='forgotPasswordContainer'>
            { step <= 2 && <Email step={step} setStep={setStep} setToken={setToken} />}
            { step > 2 && <UpdatePassword resetPassword token={token} />}
        </div>
    );
}