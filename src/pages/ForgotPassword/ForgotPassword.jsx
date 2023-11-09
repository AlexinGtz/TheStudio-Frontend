import './ForgotPassword.css'
import { Whatsapp } from '../../components/Whatsapp/Whatsapp';
import { UpdatePassword } from '../UpdatePassword/UpdatePassword';
import { useState } from 'react';

export const ForgotPassword = () => {
    const [step, setStep] = useState(1);

    return (
        <div className='forgotPasswordContainer'>
            {step <= 2 && <Whatsapp step={step} setStep={setStep} />}
            { step > 2 && <UpdatePassword resetPassword />}
        </div>
    );
}