import './SimpleForgotPassword.css'
import { Email } from '../../components/Email/Email';
import { useState } from 'react';
import { Input } from '../Input/Input';
import { Button, buttonStyle } from '../Button/Button';
import { UpdatePassword } from '../../pages/UpdatePassword/UpdatePassword';
import { getSecureMail, confirmUserMail } from '../../model/api/api';
import { useNavigate } from 'react-router-dom';

export const SimpleForgotPassword = () => {
    const [step, setStep] = useState(1);
    const [inputData, setInputData] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('')
    const [secureMail, setSecureMail] = useState('');
    const navigate = useNavigate()

    const handleCancelClick = () => {
        navigate('/login');
    }

    const handleContinueClick = async () => {
        console.log('hello', inputData);
        if(step === 1) {
            const res = await getSecureMail(inputData);
            setSecureMail(res.secureMail);
            setUserPhoneNumber(inputData);
            setInputData('');
            setStep(2);
        } else if(step === 2) {
            console.log('HERE');
            const res = await confirmUserMail({
                userPhoneNumber,
                userEmail: inputData,
            });
            setStep(3)
        }
    }

    return (
        <div className='emailContainer'>
            { step === 1 && 
                    <div className='emailInfoContainer'>
                        <h1 className='emailTitle'>Cambiar contrasenia</h1>
                        <p className='emailText'>Por seguridad, necesitamos confirmar unos datos. Favor de ingresar su numero telefonico</p>
                        <Input 
                            className='emailInput' 
                            placeholder='Numero Telefonico' 
                            value={inputData}
                            maxLength={10}
                            onChange={(e) => setInputData(e.target.value)}
                            />
                    </div>
            }
            { step === 2 && 
                <div>
                    <h1 className='emailTitle'>Cambiar contrasenia</h1>
                    <p className='emailText'>Confirme el correo electronico con el que se registro</p>
                    <p className='emailText'>{secureMail}</p>
                    <Input 
                            className='emailInput' 
                            placeholder='Correo' 
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                </div>
            }
            <div className='emailButtonsContainer'>
                <Button className='emailButton' text={'Continuar'} onClick={handleContinueClick} />
                <Button className='emailButton' buttonStyle={buttonStyle.alternative} text='Cancelar' onClick={handleCancelClick} />
            </div>
            { step === 3 &&
                <UpdatePassword resetPassword token={token} />
            }
        </div>
    );
}