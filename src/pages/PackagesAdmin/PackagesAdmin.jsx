import './PackagesAdmin.css'
import {AvailablePackages, packageDisplayType} from '../AvailablePackages/AvailablePackages'
import { useNavigate } from 'react-router-dom';

export const PackagesAdmin = () => {
    const navigate = useNavigate();

    return (
        <div className='packagesAdminContainer'>
            <div className='packagesAdminCentered'>
                <AvailablePackages displayType={packageDisplayType.ADMIN_EDIT} onButtonClick={(p) => navigate(`/package/${p.id}`)} />
            </div>
        </div>
    );
}