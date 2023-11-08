import { getUpcomingClasses } from '../../model/api/api';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import './Calendar.css'
import { setClasses } from '../../redux/reducers/classesReducer';

export const Calendar = () => {
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(classes.length === 0) {
            handleGetClasses();
        }
    }, []);

    const handleGetClasses = async () => {
        const res = await getUpcomingClasses();
        //TODO: check if res.classes is empty
        //TODO: check BE why is it sending two arrays
        dispatch(setClasses(res.classes));
    }

    return (
        <div className='userMainPageContainer'>
            <div className='userMainPageTexts'>
                <h1>Calendario</h1>
                <h3>Clases disponibles en The Studio</h3>
            </div>
            <div className='userMainPageClasses'>
                {   classes?.length > 0 && 
                    classes.map((c) => <ClassCard key={c.date} class={c} markBookedClasses /> )
                }
            </div>
        </div>
    );
}