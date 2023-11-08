import './PasswordInput.css'
import EyeIcon from '../../assets/Icons/icon_eye.svg'
import OpenEyeIcon from '../../assets/Icons/icon_open_eye.svg'
import { useState } from 'react';

export const PasswordInput = (props) => {
    const [passwordInput, setPasswordInput] = useState(true);

    const handleClick = () => {
        setPasswordInput(!passwordInput)
    }

    return (
    <div className='passwordInputContainer'>
        <input {...props} type={passwordInput ? 'password' : 'text'} className='passwordInput' />
        <img src={passwordInput ? OpenEyeIcon : EyeIcon} onClick={handleClick} />
    </div>
    );
}