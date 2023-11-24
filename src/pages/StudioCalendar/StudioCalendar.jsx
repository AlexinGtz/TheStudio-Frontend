import './StudioCalendar.css'
import moment from 'moment/moment';
import Calendar from 'react-calendar';
import { getUpcomingClasses } from '../../model/api/api';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClassCard } from '../../components/ClassCard/ClassCard';
import { setClasses } from '../../redux/reducers/classesReducer';
import { userTypes } from '../../constants';
import { enqueueSnackbar } from 'notistack';
import { setLoading } from '../../redux/reducers/loadingReducer';

export const StudioCalendar = () => {
    const classes = useSelector(state => state.classes);
    const user = useSelector(state => state.user);
    const [calendarType, setCalendarType] = useState('month'); // ['month', 'week']
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredClasses, setFilteredClasses] = useState([]);
    const dispatch = useDispatch();
    const today = new Date();
    today.setHours(0,0,0,0);
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    useEffect(() => {
        if(classes.length === 0) {
            handleGetClasses();
        }
    }, []);

    useEffect(() => {
        if(selectedDate) {
            const filtered = classes.filter((c) => {
                const classDate = moment(c.date).format('YYYY-MM-DD');
                const selDate = moment(selectedDate).format('YYYY-MM-DD');
                return classDate === selDate
            });
            setFilteredClasses(filtered);
        } else {
            setFilteredClasses(classes);
        }
    }, [classes, selectedDate]);

    const handleGetClasses = async () => {
        dispatch(setLoading(true));
        const res = await getUpcomingClasses();
        dispatch(setLoading(false));
        if(!res || !res.classes || res.classes.length === 0) {
            enqueueSnackbar('No hay clases disponibles', { variant: 'error' });
            return;
        }
        dispatch(setClasses(res.classes));
    }

    const handleClickDay = (value) => {
        setSelectedDate((new Date(value)).toISOString());
        setCalendarType('week');
    }

    const handleSelectChange = (e) => {
        setCalendarType(e.target.value)
        if(e.target.value === 'month') {
            setSelectedDate(null);
            setFilteredClasses(classes);
        }
    };

    const handleDayContent = ({date}) => {
        if(date.getDay() === 0 
            || date.getTime() < today.getTime() 
            || date.getTime() > nextMonth.getTime()) {
            return null;
        } 
        
        const isClass = classes.some((c) => {
            const classDate = moment(c.date).format('YYYY-MM-DD');
            const selDate = moment(date).format('YYYY-MM-DD');
            return classDate === selDate
        })

        if(!isClass) {
            return null;
        }

        if(user.userType === userTypes.ADMIN) {
            return <div className='calendarContent calendarContentMainColor' />
        }

        const isBooked = user.bookedClasses.some((c) => {
            const classDate = moment(c.sk).format('YYYY-MM-DD');
            const selDate = moment(date).format('YYYY-MM-DD');
            return classDate === selDate
        });
        if(isBooked){
            return <div className='calendarContent calendarContentMainColor' />
        }

        return <div className='calendarContent calendarContentGray' />
    }

    return (
        <div className='userMainPageContainer'>
            <div className='userMainPageTexts'>
                <h1>Calendario</h1>
                <h3>Clases disponibles en The Studio</h3>
            </div>
            <div>
                <select onChange={handleSelectChange} value={calendarType} className='calendarSelect'>
                    <option value="month">Mes</option>
                    <option value="week">Semana</option>
                </select>
            </div>
            { calendarType === 'month' && 
                <Calendar 
                    className='calendarContainer'
                    tileClassName='calendarTile'
                    locale='es-MX'
                    minDate={new Date(today)}
                    maxDate={nextMonth}
                    minDetail='month'
                    maxDetail='month'
                    onClickDay={handleClickDay}
                    tileContent={handleDayContent}
                    tileDisabled={({date}) => {
                        return date.getDay() === 0;
                    }}
                    formatShortWeekday={(locale, date) => {
                        return new Date(date).toLocaleDateString(locale, {weekday: 'narrow'})
                    }}
                    formatMonthYear={(locale, date) => {
                        let newDate = new Date(date).toLocaleDateString(locale, {month: 'long', year: 'numeric'});
                        newDate = newDate.charAt(0).toUpperCase() + newDate.slice(1);

                        newDate = newDate.replace('de', '');

                        return newDate;
                    }} />
                    
            }
            { calendarType === 'week' &&
                <div className='userMainPageClasses'>
                {   filteredClasses?.length > 0 ? 
                    filteredClasses.map((c) => <ClassCard key={c.date} class={c} markBookedClasses /> )
                    :
                    <h3>No hay clases disponibles para ese día</h3>
                }
                </div>
            }
        </div>
    );
}