import './Login.css'
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Logo } from '../../components/Logo/Logo';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { login } from '../../model/api/api';
import { useState } from 'react';
import { loginAction } from '../../redux/reducers/loginReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatPhoneNumber } from '../../formatters';
import { buttonStyle } from '../../components/Button/Button';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { enqueueSnackbar } from 'notistack';

export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        if(!formattedNumber) {
            enqueueSnackbar('Debes ingresar un número de teléfono', { variant: 'error' });	
            return;
        }
        if(formattedNumber.length < 10) {
            enqueueSnackbar('El número de teléfono debe tener 10 dígitos', { variant: 'error' });	
            return;
        }
        if(!password) {
            enqueueSnackbar('Debes ingresar una contraseña', { variant: 'error' });	
            return;
        }
        dispatch(setLoading(true));
        const response = await login(formattedNumber, password);
        dispatch(setLoading(false));
        if(!response){
            return;
        };
        dispatch(loginAction(response));
        if(response.userType === 'admin') {
            navigate('/calendar');
            return;
        } 
        else navigate('/userCalendar');
    }

    const handleNumberFormatting = (e) => {
        let phone = e.target.value;
        if(e.target.value.length === 5 && phoneNumber.length >= 5) {
            phone = e.target.value.slice(1,3);
        }
        if(e.target.value.length === 3 && phoneNumber.length < 3) {
            phone = e.target.value.slice(1,2);
        }
        setPhoneNumber(phone);
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleForgotPassword = () => {
        navigate('/forgotPassword');
    }

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    return (
        <div className='loginContainer'>
            <Logo vertical={true} />
            <div className='loginInputs'>
                <Input 
                    placeholder='Número de teléfono' 
                    type='text'
                    id='phoneNumber'
                    value={formattedPhoneNumber}
                    maxLength={14}
                    onChange={handleNumberFormatting} 
                    onKeyPress={(e) => { if(e.key === 'Enter') handleLogin() }}
                    />
                <PasswordInput 
                    placeholder='Contraseña' 
                    id='password'
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value) }} 
                    onKeyPress={(e) => { if(e.key === 'Enter') handleLogin() }}
                    />
                <p className='loginForgotPassword' onClick={handleForgotPassword}>Olvidé mi contraseña</p>
                <Button text='Iniciar sesión' onClick={handleLogin} />
                <Button text='Registrarme' onClick={handleRegister} buttonStyle={buttonStyle.alternative} />
            </div>
        </div>
    );
}