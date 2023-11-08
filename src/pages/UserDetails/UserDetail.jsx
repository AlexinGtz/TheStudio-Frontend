import { useEffect, useState } from 'react';
import './UserDetails.css'
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../model/api/api';
import { formatPhoneNumber } from '../../formatters';
import { RemainingClasses } from '../../components/RemainingClasses/RemainingClasses';
import { PackageExpiration } from '../../components/PackageExpiration/PackageExpiration';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import userIcon from '../../assets/Icons/user_icon.svg'

export const UserDetails = () => {
    const { userPhoneNumber } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        handleGetUserInfo(userPhoneNumber)
    }, [userPhoneNumber])

    const handleGetUserInfo = async (phone) => {
        const userInfo = await getUserInfo(phone);
        setUserInfo(userInfo);
    }

    if(!userInfo) return <Spinner />;

    const currentPackage = userInfo?.purchasedPackages?.find(p => p.availableClasses > 0);

    return (
        <div className='userDetailsContainer'>
            <div className='userDetailsGoBack'>
                <Button className='userDetailsButton' text='Atras' onClick={() => navigate(-1)} />        
            </div>
            <img src={userIcon} alt='user icon' />
            <div className='userDetailsInfoContainer'>
                <h3 className='userDetailsInfoTitle'>Nombre</h3>
                <h3 className='userDetailsInfoContent'>{userInfo.firstName}</h3>
            </div>
            <div className='userDetailsInfoContainer'>
                <h3 className='userDetailsInfoTitle'>Apellido</h3>
                <h3 className='userDetailsInfoContent'>{userInfo.lastName}</h3>
            </div>
            <div className='userDetailsInfoContainer'>
                <h3 className='userDetailsInfoTitle'>Celular</h3>
                <h3 className='userDetailsInfoContent'>{formatPhoneNumber(userInfo.phoneNumber)}</h3>
            </div>
            {userInfo?.purchasedPackages?.length > 0 &&<RemainingClasses packages={userInfo.purchasedPackages} />}
            {currentPackage > 0 && <PackageExpiration purchasedPachage={currentPackage} admin />}
            <Button text='Asignar Paquete' className='userDetailsAssignButton' onClick={() => navigate(`/assignPackage/${userInfo.phoneNumber}`)} />
        </div>
    );
}