import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './UserMainPage.css'
import { getUserBookedClasses, getUserProfile } from '../../model/api/api';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { setProfile } from '../../redux/reducers/userReducer';

export const UserMainPage = () => {
    const [classes, setClasses] = useState([]);
    
    useEffect(() => {
        handleGetClasses();
    }, []);

    const handleGetClasses = async () => {
        const res = await getUserBookedClasses();
        setClasses(res.classes);
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