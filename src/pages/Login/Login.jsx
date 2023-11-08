import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Logo } from '../../components/Logo/Logo';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { login } from '../../model/api/api';
import { useState } from 'react';
import './Login.css'
import { loginAction } from '../../redux/reducers/loginReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../../formatters';
import { buttonStyle } from '../../components/Button/Button';

export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await login(phoneNumber, password);
        if(!response) return alert('Usuario o contraseña incorrectos');
        dispatch(loginAction(response));
        if(response.userType === 'admin') {
            navigate('/calendar');
            return;
        } 
        else navigate('/');    
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleForgotPassword = () => {
        navigate('/forgotPassword');
    }

    return (
        <div className='loginContainer'>
            <Logo vertical={true} />
            <div className='loginInputs'>
                <Input 
                    placeholder='Numero de telefono' 
                    type='text'
                    id='phoneNumber'
                    value={phoneNumber} 
                    formatter={formatPhoneNumber}
                    onChange={(e) => { 
                        setPhoneNumber(e.target.value)
                     }} />
                <PasswordInput 
                    placeholder='Contraseña' 
                    id='password'
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value) }} />
                <p className='loginForgotPassword' onClick={handleForgotPassword}>Olvidé mi contraseña</p>
                <Button text='Iniciar sesión' onClick={handleLogin} />
                <Button text='Registrarme' onClick={handleRegister} buttonStyle={buttonStyle.alternative} />
            </div>
        </div>
    );
}