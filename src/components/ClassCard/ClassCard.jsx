import './ClassCard.css'
import flame from '../../assets/Icons/flame_outline.svg'
import time from '../../assets/Icons/time_outline.svg'
import whiteCheck from '../../assets/Icons/white_check.svg'
import instructor from '../../assets/Images/Instructor.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const ClassCard = (props) => {
    const [isClassBooked, setIsClassBooked] = useState(false);
    const navigate = useNavigate();

    if(!props.class || props.class.canceled) return null;

    const userBookedClasses = useSelector((state) => state.user.bookedClasses);
    
    const [classDateString, classType] = props.class.date_by_type.split('#');

    const classDate = new Date(classDateString);

    useEffect(() => {
        setIsClassBooked(userBookedClasses?.find((c) => c.sk === props.class.date_by_type));
    }, [userBookedClasses]);

    const handleClassClick = () => {
        navigate(`/class/${props.class.date_by_type.split('#')[0]}/${props.class.date_by_type.split('#')[1]}`);
    }

    let classDateText = (classDate.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }));

    classDateText = classDateText.replace(/^./, classDateText[0].toUpperCase());

    const startHour = classDate.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

    classDate.setMinutes(50)

    const endHour = classDate.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <div className='classCardContainer' onClick={handleClassClick}>
            <h3 className='classCardDate'>{classDateText}</h3>
            <div className='classCardInfo'>
                <div className='classCardHour'>
                    <div className='classCardTime'>
                        <img src={time} alt="time" />
                        <p className='classCardTimeText'>{startHour} - {endHour}</p>
                    </div>
                    <div className='classCardCalories'>
                        <img src={flame} alt="flame" />
                        <p className='classCardTimeText'><b>250 cal.</b></p>
                    </div>
                </div>
               <div className='classCardTeacherInfo'>
                    <div className='classCardTeacheImage'>
                        <img className='classCardTeacheImage' src={instructor} alt="teacher" />
                    </div>
                    <div className='classCardTeacherName'>
                        <p><b>De:</b></p>
                        <p>{classType}</p>
                    </div>
               </div>
               {isClassBooked && props.markBookedClasses && 
                <div className='classCardBooked'>
                  <img src={whiteCheck} />
                  <p>Agendada</p>
                </div>
               }
            </div>
        </div>
    );
}