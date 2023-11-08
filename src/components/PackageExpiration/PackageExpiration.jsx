import './PackageExpiration.css'
import {daysForPackageToExpire} from '../../utils';

export const PackageExpiration = ({purchasedPachage, admin}) => {
    return (
        <>
                <h3>{admin ? 'Paquete actual.' : 'Paquete mas proximo a vencer'}</h3>
                <div className='packagesLatest'>
                    <h2>{purchasedPachage.totalClasses} Clases</h2>
                    <div className='packagesLatestRemaining'>
                        <p>Clases restantes</p>
                        <div className='packageLatestRemainingNumber'>
                            <p>{purchasedPachage.availableClasses}</p>
                        </div>
                    </div>
                    <p>Caduca en {daysForPackageToExpire(purchasedPachage)} dias</p>
                </div>
            </>
    );
}