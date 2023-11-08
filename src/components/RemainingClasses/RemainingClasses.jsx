import './RemainingClasses.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { calculateUserClasses } from '../../utils';

export const RemainingClasses = ({ mainColorBackground, packages }) => {
    const purchasedPackages = packages ?? useSelector(state => state.user.purchasedPackages);
    const colorClass = mainColorBackground ? 'remainingClassesMainColor' : 'remainingClassesGray';

    const countUserAvailableClasses = useMemo(() => calculateUserClasses(purchasedPackages), [purchasedPackages])

    return (
        <div className='remainingClassesContainer'>
            <div className='remainingClassesBalance'>
                <p>Clases a favor</p>
                <div className={`remainingClassesNumber ${colorClass}`}>
                    <p>{countUserAvailableClasses}</p>
                </div>
            </div>
        </div>
    );
}