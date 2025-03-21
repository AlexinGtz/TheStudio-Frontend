import './PackageExpiration.css'
import {daysForPackageToExpire} from '../../utils';

export const PackageExpiration = ({purchasedPachage, admin, altColor}) => {

    const title = admin ? 'Paquete actual.' : altColor ? '' : 'Paquete más próximo a vencer';
    const containerClass = altColor ? 'packageExpirationLatest' : 'packagesLatest';

    return (
        <>
                <h3>{title}</h3>
                <div className={containerClass}>
                    <h2>{purchasedPachage.totalClasses} {purchasedPachage.totalClasses > 1 ? 'Clases' : 'Clase'}</h2>
                    <h4 className='packageLatestType'>Tipo: {purchasedPachage.type?.toLowerCase()}</h4>
                    <div className='packagesLatestRemaining'>
                        <p>Clases restantes</p>
                        <div className='packageLatestRemainingNumber'>
                            <p>{purchasedPachage.availableClasses}</p>
                        </div>
                    </div>
                    <p>Caduca en {daysForPackageToExpire(purchasedPachage)} días</p>
                </div>
            </>
    );
}