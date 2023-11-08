import { useEffect, useState } from 'react';
import './Packages.css'
import { useSelector } from 'react-redux';
import { RemainingClasses } from '../../components/RemainingClasses/RemainingClasses';
import { AvailablePackages, packageDisplayType } from '../AvailablePackages/AvailablePackages';
import { PackageExpiration } from '../../components/PackageExpiration/PackageExpiration';
import { selectEarliestPackage } from '../../utils';

export const Packages = () => {
    const purchasedPackages = useSelector(state => state.user.purchasedPackages);
    const [earliestPackage, setEarliestPackage] = useState(null);

    useEffect(() => {
        document.title = 'The Studio - Paquetes';
    }, []);

    useEffect(() => {
        setEarliestPackage(selectEarliestPackage(purchasedPackages));
    }, [purchasedPackages]);

    
    return (
        <div className='packagesContainer'>
            <h1>Paquetes</h1>
            <RemainingClasses mainColorBackground />
            { earliestPackage && earliestPackage.availableClasses > 0 &&
                <PackageExpiration purchasedPachage={earliestPackage} />
            }
            <AvailablePackages displayType={packageDisplayType.USER} />
        </div>
    );
}