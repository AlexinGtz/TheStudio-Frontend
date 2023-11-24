import './EditPackage.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { InputPackage } from '../../components/InputPackage/InputPackage';
import { useParams } from 'react-router-dom';
import { Button, buttonStyle } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { editPackageInfo } from '../../model/api/api';
import { enqueueSnackbar } from 'notistack';
import { restorePackages } from '../../redux/reducers/packagesReducer';
import { setLoading } from '../../redux/reducers/loadingReducer';

export const EditPackage = () => {
    const allPackages = useSelector(state => state.packages);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { packageId } = useParams();

    useEffect(() => {
        setSelectedPackage(allPackages.data.find(p => p.id === packageId));
    }, [allPackages]);

    if(!selectedPackage) return <h1>Cargando...</h1>

    const handleSaveChanges = async () => {
        selectedPackage.cost = parseInt(selectedPackage.cost);
        dispatch(setLoading(true));
        const res = await editPackageInfo(selectedPackage);
        dispatch(setLoading(false));
        if(res.statusCode === 200) {
            dispatch(restorePackages());
            enqueueSnackbar('Paquete editado correctamente', { variant: 'success' });  
            navigate('/admin-packages');
            return;          
        }
        enqueueSnackbar('Error al editar el paquete', { variant: 'error' });
    }

    return (
        <div className='editPackageContainer'>
            <div className='editPackageInputs'>
                <h2>Editar paquete</h2>
                <InputPackage 
                    title='Cantidad de clases' 
                    quantity={selectedPackage.classQuantity} 
                    setQuantity={quantity => setSelectedPackage({...selectedPackage, classQuantity: quantity})}
                    />
                <InputPackage 
                    title='Precio' 
                    quantity={`$${selectedPackage.cost}`} 
                    setQuantity={cost => {
                        if(cost[0] === '$') cost = cost.slice(1);
                        setSelectedPackage({...selectedPackage, cost: cost});
                    }}
                    type={'text'}
                    />
                <InputPackage 
                    title='Días de vigencia' 
                    quantity={selectedPackage.expireDays} 
                    setQuantity={expireDays => setSelectedPackage({...selectedPackage, expireDays: expireDays})}
                    />
            </div>
            <div className='editPackageButtonsContainer'>
                <Button className='editPackageButtons' text='Guardar Cambios' onClick={handleSaveChanges} />
                <Button className='editPackageButtons' text='Cancelar' onClick={() => navigate(-1)} buttonStyle={buttonStyle.alternative}  />
            </div>
        </div>
    );
}