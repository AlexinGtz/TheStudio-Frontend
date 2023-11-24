import './Register.css'
import { Button } from '../../components/Button/Button';
import { Logo } from '../../components/Logo/Logo';
import { Input } from '../../components/Input/Input';
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { useState } from 'react';
import { formatPhoneNumber } from '../../formatters';
import { useNavigate } from 'react-router-dom';
import { validateRegisterForm } from '../../validators';
import { registerUser } from '../../model/api/api';
import { useSnackbar } from 'notistack';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';

export const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const goBack = () => {
        navigate('/login');
    }

    const handleRegisterUser = async () => {
        const validation = validateRegisterForm({
            firstName,
            lastName,
            phoneNumber,
            password,
            confirmPassword
        });
        
        if(Object.keys(validation).length > 0) {
            enqueueSnackbar('Complete los campos requeridos', { variant: 'error' });
            return;
        }
        dispatch(setLoading(true));
        const response = await registerUser({
            firstName,
            lastName,
            phoneNumber,
            password
        });
        dispatch(setLoading(false));
        if(!response) return alert('Ha ocurrido un error al registrarse');
        enqueueSnackbar('Usuario registrado correctamente', { variant: 'success' });
        navigate('/login');
    }

    return (
        <div className='registerContainer'>
            <div className='registerGoBack'>
                <Button className='classDetailsButton' text='Atras' onClick={goBack} />        
            </div>
            <Logo vertical={true} />
            <div className='registerInputs'>
                <Input 
                    placeholder='Nombre' 
                    type='text' 
                    value={firstName} 
                    onChange={(e) => { 
                        setFirstName(e.target.value)
                     }} />
                <Input 
                    placeholder='Apellido' 
                    type='text' 
                    value={lastName} 
                    onChange={(e) => { 
                        setLastName(e.target.value)
                     }} />
                <Input 
                    placeholder='Número de teléfono' 
                    type='text' 
                    value={phoneNumber} 
                    formatter={formatPhoneNumber}
                    onChange={(e) => { 
                        setPhoneNumber(e.target.value)
                     }} />
                <PasswordInput 
                    placeholder='Contraseña' 
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value) }} />
                <PasswordInput 
                    placeholder='Confirmar contraseña' 
                    value={confirmPassword} 
                    onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <Button text='Completar Registro' onClick={handleRegisterUser} />
            </div>
        </div>
    );
}