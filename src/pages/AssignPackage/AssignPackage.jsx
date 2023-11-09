import { AvailablePackages, packageDisplayType } from '../AvailablePackages/AvailablePackages';
import './AssignPackage.css'
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { addPackageToUser } from '../../model/api/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AssignPackage = () => {
    const registeredUsers = useSelector(state => state.registeredUsers.users);
    const [showModal, setShowModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);	
    const { userPhoneNumber } = useParams();
    const navigate = useNavigate();

    const handleButtonClick = (packageAvailable) => {
        setShowModal(true);
        setSelectedPackage(packageAvailable);
    }

    const handleAssignPackage = async () => {
        await addPackageToUser(userPhoneNumber, selectedPackage.id);
        navigate(`/user/${userPhoneNumber}`)
    }

    const user = registeredUsers.find(user => user.phoneNumber === userPhoneNumber);

    return (
        <div>
            <AvailablePackages displayType={packageDisplayType.ADMIN_ADD} onButtonClick={handleButtonClick} />
            <Modal 
                title='¿Asignar paquete?' 
                confirmText='Sí, asignar' 
                closeText='Cancelar' 
                content={`${user ? user.firstName : 'El usuario'} tendra una clase a favor con una vigencia de ${selectedPackage ? selectedPackage.expireDays : ''} días`}
                onConfirm={handleAssignPackage}
                onClose={() => {
                    setShowModal(false)
                    setSelectedPackage(null)
                }}
                show={showModal} />
        </div>
    );
}