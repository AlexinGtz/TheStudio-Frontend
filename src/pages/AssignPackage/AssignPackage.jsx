import { AvailablePackages, packageDisplayType } from '../AvailablePackages/AvailablePackages';
import './AssignPackage.css'
import { useState } from 'react';
import { Modal } from '../../components/Modal/Modal';
import { addPackageToUser } from '../../model/api/api';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const AssignPackage = () => {
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

    return (
        <div>
            <AvailablePackages displayType={packageDisplayType.ADMIN_ADD} onButtonClick={handleButtonClick} />
            <Modal 
                title='Asignar paquete?' 
                confirmText='Si, asignar' 
                closeText='Cancelar' 
                content='Adriana tendra una clase a favor con una vigencia de 7 dias'
                onConfirm={handleAssignPackage}
                onClose={() => {
                    setShowModal(false)
                    setSelectedPackage(null)
                }}
                show={showModal} />
        </div>
    );
}