import './UserMainPage.css'
import { useEffect, useState } from 'react';
import { getUserBookedClasses } from '../../model/api/api';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';

export const UserMainPage = () => {
    const [pilatesClasses, setPilatesClasses] = useState([]);
    const [wellnessClasses, setWellnessClasses] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        handleGetClasses();
    }, []);

    const handleGetClasses = async () => {
        if(localStorage.getItem('token')) {
            dispatch(setLoading(true));
            const res = await getUserBookedClasses();
            const pilatesClasses = res.classes.filter(c => c.date_by_type.split('#')[1] === 'PILATES');
            const wellnessClasses = res.classes.filter(c => c.date_by_type.split('#')[1] === 'WELLNESS');            
            setPilatesClasses(pilatesClasses);
            setWellnessClasses(wellnessClasses);
            dispatch(setLoading(false));
        }
    }

    return (
        <div className='userMainPageContainer'>
            <div className='userMainPageTexts'>
                <h1>Mis Clases</h1>
                <h3>Clases a las que te has inscrito</h3>
            </div>
            <h1>Pilates</h1>
            <div className='userMainPageClasses'>
                {   pilatesClasses?.length > 0 ? 
                    pilatesClasses.map((c) => <ClassCard key={c.date_by_type} class={c} />)
                    : <h3>No tienes clases registradas</h3>
                }
            </div>
            <h1>Wellness</h1>
            <div className='userMainPageClasses'>
                {   wellnessClasses?.length > 0 ? 
                    wellnessClasses.map((c) => <ClassCard key={c.date_by_type} class={c} />)
                    : <h3>No tienes clases registradas</h3>
                }
            </div>
        </div>
    );
}