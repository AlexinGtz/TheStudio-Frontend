import './UserDetails.css'
import userIcon from '../../assets/Icons/user_icon.svg'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../../model/api/api';
import { formatPhoneNumber } from '../../formatters';
import { RemainingClasses } from '../../components/RemainingClasses/RemainingClasses';
import { PackageExpiration } from '../../components/PackageExpiration/PackageExpiration';
import { Button, buttonStyle } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/Spinner/Spinner';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';
import { removeTrialClass } from '../../model/api/api';
import { enqueueSnackbar } from 'notistack';

export const UserDetails = () => {
    const { userPhoneNumber } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetUserInfo(userPhoneNumber)
    }, [userPhoneNumber])

    const handleGetUserInfo = async (phone) => {
        dispatch(setLoading(true));
        const userInfo = await getUserInfo(phone);
        dispatch(setLoading(false));
        setUserInfo(userInfo);
    }

    if(!userInfo) return <Spinner />;    

    const onRemoveTrialButtonClicked = async () => {        
        const res = await removeTrialClass(userInfo.phoneNumber);
        if(res?.statusCode !== 200) {
            enqueueSnackbar('Error eliminando clase de prueba', { variant: 'error' });
            return;
        }
        handleGetUserInfo(userInfo.phoneNumber);
        enqueueSnackbar('Clase de prueba eliminada', { variant: 'success' });
    }

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
            { userInfo.trialClassAvailable && 
                <Button text='Eliminar Clase de Prueba' className='userDetailsAssignButton' onClick={onRemoveTrialButtonClicked} buttonStyle={buttonStyle.warning} />
            }
            <Button text='Asignar Paquete' className='userDetailsAssignButton' onClick={() => navigate(`/assignPackage/${userInfo.phoneNumber}`)} />
        </div>
    );
}