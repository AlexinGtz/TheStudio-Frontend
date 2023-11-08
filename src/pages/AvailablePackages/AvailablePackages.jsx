import './AvailablePackages.css'
import { getPackages } from '../../model/api/api';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setAllPackages } from '../../redux/reducers/packagesReducer';

export const packageDisplayType = {
    USER: 'user',
    ADMIN_EDIT: 'adminEdit',
    ADMIN_ADD: 'adminAdd'
}

const displayTypeText = (displayType) => {
    switch(displayType) {
        case packageDisplayType.USER:
            return {
                title: 'Paquetes disponibles',
                text: 'Si deseas adquirir un paquete, favor de contactar al personal',
                buttonText: ''
            };
        case packageDisplayType.ADMIN_EDIT:
            return {
                title: 'Paquetes',
                text: 'Paquetes disponibles',
                buttonText: 'Editar Paquete'
            };
        case packageDisplayType.ADMIN_ADD:
            return {
                title: 'Asignar paquete',
                text: '',
                buttonText: 'Asignar'
            };
        default:
            return 'Paquetes disponibles';
    }
}

export const AvailablePackages = ({displayType, onButtonClick}) => {
    const availablePackages = useSelector(state => state.packages);
    const dispatch = useDispatch();

    const showButtonTypes = [packageDisplayType.ADMIN_ADD, packageDisplayType.ADMIN_EDIT]

    // if(availablePackages.loading) {
    //     return <Spinner />
    // }

    useEffect(() => {
        document.title = 'The Studio - Paquetes';
        if(availablePackages?.data.length === 0) {
            handleGetPackages(); 
        }
    }, []);

    const handleGetPackages = async () => {
        const response = await getPackages();
        response.packages.sort((a, b) => {
            if (a.classQuantity < b.classQuantity) {
                return -1;
            } else  {
                return 1
            }
        });
        dispatch(setAllPackages(response.packages));
    }

    const {title, text, buttonText } = displayTypeText(displayType);

    return (
        <div className='availablePackagesContainer'>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className='packagesAvailable'>
                {availablePackages?.data?.length > 0 &&
                    availablePackages.data.map((packageAvailable) => {
                    return (
                        <div className='packageAvailable' key={packageAvailable.classQuantity}>
                            <h2>{packageAvailable.classQuantity} Clases</h2>
                            <p>${packageAvailable.cost}</p>
                            <p className='packageExpire'>Vigencia de {packageAvailable.expireDays} dias</p>
                            {showButtonTypes.includes(displayType)  && 
                                <>
                                    <Button 
                                        className='availablePackagesButton' 
                                        text={buttonText} 
                                        onClick={() => onButtonClick(packageAvailable)} 
                                        />
                                </>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    );
}