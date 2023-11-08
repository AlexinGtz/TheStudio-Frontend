import './UsersList.css'
import { UserCard } from '../UserCard/UserCard';
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { deleteUser } from '../../model/api/api';
import { enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

export const UsersList = ({users, disableUserClick}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    if(!users) {
        return null;
    }

    const handleDeleteClick = async () => {
        const res = await deleteUser(selectedUser);
        if(res.statusCode === 200) {
            enqueueSnackbar('Usuario eliminado correctamente', { variant: 'success' });
            return;
        }
        enqueueSnackbar('Error al eliminar el usuario', { variant: 'error' });
    }

    return (
        <div className='usersListContainer'>
            <div className='usersListHeaders'>
                <h3>Nombre</h3>
                <h3>Opciones</h3>
            </div>
            {users.length > 0 &&
                users.map((user) => 
                <UserCard 
                    user={user}
                    displayDeleteIcon 
                    key={user.phoneNumber}
                    onDeleteClick={(phoneNumber) => {
                        setSelectedUser(phoneNumber);
                        setShowModal(true);
                    }}
                    disableUserClick={disableUserClick}
                    />)
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