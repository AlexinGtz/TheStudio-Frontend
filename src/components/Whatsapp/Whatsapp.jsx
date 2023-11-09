import './Whatsapp.css'
import { Button, buttonStyle } from '../Button/Button';
import { Input } from '../Input/Input';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

export const Whatsapp = ({step, setStep}) => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState('');

    const handleCancelClick = () => {
        navigate('/login');
    }

    const handleInputChange = (e) => {
        const newValue = e.target.value.replace(/[^\d]/g, '');
        setInputData(newValue);
    }

    const handleSendCode = () => {
        if(inputData === '' || inputData.length < 10) {
            enqueueSnackbar('Por favor, ingresa un numero telefonico valido', { variant: 'error' });
            return;
        }
        //TODO call API to send code
        setStep(2);
        setInputData('');
    }

    const handleVerificationCode = () => {
        if(inputData === '' || inputData.length < 6) {
            enqueueSnackbar('Por favor, ingresa un codigo valido', { variant: 'error' });
            return;
        }
        setStep(3);
    }

    const text = step === 1 
        ? 'Por seguridad, enviaremos un codigo por WhatsApp a tu celular, ingresa tu numero telefonico' 
        : 'Enviamos un código por WhatsApp a tu celular, por favor ingresa el código para cambiar tu contraseña';
    const placeholder = step === 1 ? '33-33-33-33-33' : 'Ingresa el código recibido';
    const onClickFunction = step === 1 ? handleSendCode : handleVerificationCode;
    const buttonText = step === 1 ? 'Enviar codigo' : 'Verificar codigo';
    const maxLength = step === 1 ? 10 : 6;

    return (
        <div className='whatsappContainer'>
            <div className='whatsappInfoContainer'>
                <h1 className='whatsappTitle'>Cambiar contraseña.</h1>
                <p className='whatsappText'>{text}</p>
                <Input 
                    className='whatsappInput' 
                    placeholder={placeholder} 
                    value={inputData}
                    maxLength={maxLength}
                    onChange={handleInputChange} />
            </div>
            <div className='whatsappButtonsContainer'>
                <Button className='whatsappButton' text={buttonText} onClick={onClickFunction} />
                <Button className='whatsappButton' buttonStyle={buttonStyle.alternative} text='Cancelar' onClick={handleCancelClick} />
            </div>
        </div>
    );
}