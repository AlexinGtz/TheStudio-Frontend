import './UsersList.css'
import { UserCard } from '../UserCard/UserCard';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { deleteUser } from '../../model/api/api';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { restoreRegisteredUsers } from '../../redux/reducers/registeredUsersReducer';

export const UsersList = ({users, disableUserClick, externalUserClick, selectedUsers, deleteEnabled}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();

    if(!users) {
        return null;
    }

    const handleDeleteClick = async () => {
        const res = await deleteUser(selectedUser);
        if(res.statusCode === 200) {
            enqueueSnackbar('Usuario eliminado correctamente', { variant: 'success' });
            dispatch(restoreRegisteredUsers());
        } else {
            enqueueSnackbar('Error al eliminar el usuario', { variant: 'error' });
        }
        
        setShowModal(false);
    }

    const handleUserClick = (phoneNumber) => {
        setSelectedUser(phoneNumber);
        setShowModal(true);
    }

    return (
        <div className='usersListContainer'>
            <div className='usersListHeaders'>
                <h3>Nombre</h3>
                <h3>Opciones</h3>
            </div>
            {users.length > 0 &&
                users.map((user) => {

                    const isSelected = selectedUsers?.includes(user.phoneNumber);
                    const iconType = deleteEnabled ? 'delete' : isSelected ? 'select' : '';

                    return (
                    <UserCard 
                        user={user}
                        rightIconType={iconType}
                        displayRightIcon 
                        key={user.phoneNumber}
                        onIconClick={externalUserClick ?? handleUserClick}
                        disableUserClick={disableUserClick}
                    />)
                })
            }
            <Modal 
                title='Eliminar usuario?' 
                confirmText='Si, eliminar' 
                closeText='Cancelar' 
                content='No tendra acceso a la aplicacion y sus datos seran eliminados.'
                onConfirm={handleDeleteClick}
                onClose={() => {
                    setShowModal(false)
                    setSelectedUser(null)
                }}
                show={showModal} />
        </div>
    );
}