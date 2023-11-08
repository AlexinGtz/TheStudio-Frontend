import { useEffect, useState } from 'react';
import './Packages.css'
import { useSelector } from 'react-redux';
import { RemainingClasses } from '../../components/RemainingClasses/RemainingClasses';
import { AvailablePackages, packageDisplayType } from '../AvailablePackages/AvailablePackages';
import { PackageExpiration } from '../../components/PackageExpiration/PackageExpiration';
import { selectEarliestPackage } from '../../utils';
import { ExtraPackages } from '../../components/ExtraPacakges/ExtraPackages';

export const Packages = () => {
    const purchasedPackages = useSelector(state => state.user.purchasedPackages);
    const [earliestPackage, setEarliestPackage] = useState(null);
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        document.title = 'The Studio - Paquetes';
    }, []);

    useEffect(() => {
        setEarliestPackage(selectEarliestPackage(purchasedPackages));
    }, [purchasedPackages]);

    useEffect(() => {
        if (earliestPackage) {
            setFilteredPackages(purchasedPackages.filter((p) => p.expireDate !== earliestPackage.expireDate));
        }
    }, [earliestPackage]);

    
    return (
        <div className='packagesContainer'>
            <h1>Paquetes</h1>
            <RemainingClasses mainColorBackground />
            { earliestPackage && earliestPackage.availableClasses > 0 &&
                <PackageExpiration purchasedPachage={earliestPackage} />
            }
            {filteredPackages.length > 0 && <ExtraPackages packages={filteredPackages} />}
            <AvailablePackages displayType={packageDisplayType.USER} />
        </div>
    );
}