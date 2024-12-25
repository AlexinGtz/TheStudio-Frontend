import './RemainingClasses.css'
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { calculateUserClasses } from '../../utils';

export const RemainingClasses = ({ mainColorBackground, packages }) => {
    const purchasedPackages = packages ?? useSelector(state => state.user.purchasedPackages);
    const colorClass = mainColorBackground ? 'remainingClassesMainColor' : 'remainingClassesGray';

    const {pilatesClasses, wellnessClasses} = useMemo(() => calculateUserClasses(purchasedPackages), [purchasedPackages]) 

    return (
        <div className='remainingClassesContainer'>
            <h2 className='remainingClassesHeader'>Clases a favor</h2>
            <div className='remainingClassesBalance'>
                <p>Pilates</p>
                <div className={`remainingClassesNumber ${colorClass}`}>
                    <p>{pilatesClasses}</p>
                </div>
            </div>
            <div className='remainingClassesBalance'>
                <p>Wellness</p>
                <div className={`remainingClassesNumber ${colorClass}`}>
                    <p>{wellnessClasses}</p>
                </div>
            </div>
        </div>
    );
}