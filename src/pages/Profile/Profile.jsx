import './Profile.css'
import userIcon from '../../assets/Icons/user_icon.svg'
import { useEffect, useState } from 'react';
import { EditableInput } from '../../components/EditableInput/EditableInput';
import { useSelector } from 'react-redux';
import { RemainingClasses } from '../../components/RemainingClasses/RemainingClasses';
import { formatPhoneNumber } from '../../formatters';
import { Button, buttonStyle } from '../../components/Button/Button';
import { userTypes } from '../../constants';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/reducers/loginReducer'
import { useNavigate } from 'react-router-dom';
import { restoreClasses } from '../../redux/reducers/classesReducer';
import { restorePackages } from '../../redux/reducers/packagesReducer';
import { restoreProfile } from '../../redux/reducers/userReducer';
import { restoreRegisteredUsers } from '../../redux/reducers/registeredUsersReducer';
import { restoreClassType } from '../../redux/reducers/classTypeReducer';

export const Profile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);

    useEffect(() => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
    }, [user]);

    const handleLogout = () => {
        dispatch(logoutAction());
        dispatch(restoreClasses());
        dispatch(restorePackages());
        dispatch(restoreProfile());
        dispatch(restoreRegisteredUsers());
        dispatch(restoreClassType());
        navigate('/login');
    }

    return (
        <div className='profileContainer'>
            <h1>Perfil</h1>
            { user.userType === userTypes.USER &&<img src={userIcon} alt='user icon' />}
            <EditableInput id='firstName' title='Nombre(s)' data={firstName} updateData={setFirstName} showIcon />
            <EditableInput id='lastName' title='Apellido(s)' data={lastName} updateData={setLastName} showIcon/>
            <EditableInput title='Celular' data={user.phoneNumber} formatter={formatPhoneNumber} extraStepLink={'/updateCellPhone'} />
            <EditableInput title='Contraseña' data='**********' extraStepLink={'/updatePassword'} showIcon/>
            { user.userType === userTypes.USER && <RemainingClasses />}
            <Button className='profileLogoutButton' text='Cerrar Sesion' onClick={handleLogout} />
            {/* { user.userType === userTypes.USER && <Button className='profileLogoutButton' text='Eliminar Cuenta' buttonStyle={buttonStyle.alternative} /> } */}
        </div>
    );
}