import './UserMainPage.css'
import { useEffect, useState } from 'react';
import { getUserBookedClasses } from '../../model/api/api';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';

export const UserMainPage = () => {
    const [classes, setClasses] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        handleGetClasses();
    }, []);

    const handleGetClasses = async () => {
        dispatch(setLoading(true));
        const res = await getUserBookedClasses();
        dispatch(setLoading(false));
        setClasses(res.classes.sort((a, b) => a.date > b.date ? 1 : -1));
    }

    return (
        <div className='userMainPageContainer'>
            <div className='userMainPageTexts'>
                <h1>Mis Clases</h1>
                <h3>Clases a las que te has inscrito</h3>
            </div>
            <div className='userMainPageClasses'>
                {   classes.length > 0 ? 
                    classes.map((c) => <ClassCard key={c.date} class={c} />)
                    : <h3>No tienes clases registradas</h3>
                }
            </div>
        </div>
    );
}