import './Email.css'
import { Button, buttonStyle } from '../Button/Button';
import { Input } from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { sendVerificationCode, verifyCode } from '../../model/api/api';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';

export const Email = ({step, setStep, setToken}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const handleCancelClick = () => {
        navigate('/login');
    }

    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/[^\d]/g, '');
        setInputData(newValue);
    }

    const handleSendCode = async () => {
        if(inputData === '' || inputData.length < 10) {
            enqueueSnackbar('Por favor, ingresa un numero telefonico valido', { variant: 'error' });
            return;
        }
        dispatch(setLoading(true));
        const res = await sendVerificationCode(inputData);
        dispatch(setLoading(false));
        if(!res) {
            return;
        }
        setUserPhone(inputData);
        setStep(2);
        setInputData('');
    }

    const handleVerificationCode = async () => {
        if(inputData === '' || inputData.length < 6) {
            enqueueSnackbar('Por favor, ingresa un codigo valido', { variant: 'error' });
            return;
        }
        dispatch(setLoading(true));
        const res = await verifyCode(inputData, userPhone);
        dispatch(setLoading(false));
        if(!res) {
            enqueueSnackbar('El codigo ingresado es incorrecto, por favor intenta de nuevo', { variant: 'error' });
            return;
        }

        setToken(res.token);
        setStep(3);
    }

    const text = step === 1 
        ? 'Por seguridad, enviaremos un codigo a tu correo, ingresa tu numero telefonico para ubicar tu cuenta' 
        : 'Enviamos un código por a tu correo, por favor ingresa el código para cambiar tu contraseña';
    const placeholder = step === 1 ? '33-33-33-33-33' : 'Ingresa el código recibido';
    const onClickFunction = step === 1 ? handleSendCode : handleVerificationCode;
    const buttonText = step === 1 ? 'Enviar codigo' : 'Verificar codigo';
    const maxLength = step === 1 ? 10 : 6;

    return (
        <div className='emailContainer'>
            <div className='emailInfoContainer'>
                <h1 className='emailTitle'>Cambiar contraseña.</h1>
                <p className='emailText'>{text}</p>
                <Input 
                    className='emailInput' 
                    placeholder={placeholder} 
                    value={inputData}
                    maxLength={maxLength}
                    onChange={handleInputChange} />
            </div>
            <div className='emailButtonsContainer'>
                <Button className='emailButton' text={buttonText} onClick={onClickFunction} />
                <Button className='emailButton' buttonStyle={buttonStyle.alternative} text='Cancelar' onClick={handleCancelClick} />
            </div>
        </div>
    );
}