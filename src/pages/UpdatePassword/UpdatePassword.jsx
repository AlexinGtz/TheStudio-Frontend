import './UpdatePassword.css'
import { PasswordInput } from '../../components/PasswordInput/PasswordInput';
import { useState } from 'react';
import { Button, buttonStyle } from '../../components/Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { forgotPassword, updateUserPassword } from '../../model/api/api';

export const UpdatePassword = ({resetPassword, token}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    }

    const validateInputs = async () => {
        if((!currentPassword && !resetPassword) || !newPassword || !confirmNewPassword){
            enqueueSnackbar('Por favor, complete todos los campos', { variant: 'error' })
            return;
        }
        if(newPassword !== confirmNewPassword) {
            enqueueSnackbar('Las contraseñas no coinciden', { variant: 'error' })
            return;
        
        };
        if(newPassword.length < 8) {
            enqueueSnackbar('La contraseña debe tener al menos 8 caracteres', { variant: 'error' })
            return;
        }
        let res = null;

        if(resetPassword) { 
            res = await forgotPassword({newPassword, token});
        } else {
            res = await updateUserPassword({currentPassword, newPassword});
        }

        if(!res || res.statusCode >= 400) {
            enqueueSnackbar(res.message ?? 'Error al actualizar contraseña. Intente de nuevo más tarde', { variant: 'error' })
            return;
        } 
        enqueueSnackbar('Contraseña actualizada correctamente', { variant: 'success' });
        goBack();
    }

    return (
        <div className='updatePasswordContainer'>
            <div className='updatePasswordCentered'>
                <h2>{resetPassword ? 'Restablecer contraseña' : 'Cambiar contraseña'}</h2>
                {!resetPassword && <PasswordInput 
                    placeholder='Contraseña actual' 
                    id='currentPassword'
                    value={currentPassword} 
                    onChange={(e) => { 
                        setCurrentPassword(e.target.value)
                        }}  />}
                <PasswordInput 
                    placeholder='Nuevo contraseña' 
                    id='newPassword'
                    value={newPassword} 
                    onChange={(e) => { 
                        setNewPassword(e.target.value)
                        }}  />
                <PasswordInput 
                    placeholder='Confirmar nueva contraseña' 
                    id='confirmNewPassword'
                    value={confirmNewPassword} 
                    onChange={(e) => { 
                        setConfirmNewPassword(e.target.value)
                        }}  />
                <Button text='Guardar contraseña' onClick={validateInputs} />
                <Button text='Cancelar' buttonStyle={buttonStyle.alternative} onClick={goBack} />
            </div>
        </div>
    );
}