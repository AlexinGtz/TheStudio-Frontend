import './PackagesAdmin.css'
import { AvailablePackages } from '../AvailablePackages/AvailablePackages'
import { useNavigate } from 'react-router-dom';
import { packageDisplayType } from '../../constants';	

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