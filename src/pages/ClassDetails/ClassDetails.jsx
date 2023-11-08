import { useEffect, useState } from 'react';
import './ClassDetails.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import flame from '../../assets/Icons/flame_outline.svg'
import time from '../../assets/Icons/time_outline.svg'
import { bookClass, cancelClass, getClassInfo, getUserClasses } from '../../model/api/api';
import video from '../../assets/Videos/pilates.mp4';
import { UserCard } from '../../components/UserCard/UserCard';
import rightArrow from '../../assets/Icons/right_arrow.svg';
import { Button, buttonStyle } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { userTypes } from '../../constants';
import { calculateUserClasses } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreClasses } from '../../redux/reducers/classesReducer';
import { replaceBookedClasses } from '../../redux/reducers/userReducer';
import { UsersModal } from '../../components/UsersModal/UsersModal';

export const ClassDetails = () => {
    const classes = useSelector((state) => state.classes);
    const user = useSelector((state) => state.user);
    
    const [classInfo, setClassInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [showClassUsersModal, setShowClassUsersModal] = useState(false);
    const [showAllUsersModal, setShowAllUsersModal] = useState(false);
    const [showDeleteUserFromClassModal, setShowDeleteUserFromClassModal] = useState(false);
    const [classAlreadyBooked, setClassAlreadyBooked] = useState(false); 
    const {classId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const classInfo = classes?.find((c) => c.date === classId);
        if (!classInfo) {
            handleGetClassInformation();
            return;
        }
        setClassInfo(classInfo);
    }, [classes, classId]);

    useEffect(() => {
        if(!classInfo) return;
        setClassAlreadyBooked(classInfo.registeredUsers?.find((u) => u.phoneNumber === user.phoneNumber));
    }, [classInfo]);

    

    const handleGetClassInformation = async () => {
        const res = await getClassInfo(classId);
        setClassInfo(res);
    }

    const handleBookingClass = async () => {
        await bookClass({
            classDate: classId
        });
        handleSuceedBooking();
    }

    const handleCancelClass = async () => {
        await cancelClass(classId);
       handleSuceedBooking();
    }

    const handleDeleteUserFromClass = async () => {
        await cancelClass(classId);
       handleSuceedBooking();
    }

    const handleSuceedBooking = async () => {
        dispatch(restoreClasses());
        const newClasses = await getUserClasses();
        dispatch(replaceBookedClasses(newClasses.classes));
        navigate('/calendar');
    }

    const goBack = () => {
        navigate(-1);
    }

    const classDate = new Date(classInfo.date);

    let classDateString = (classDate.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }));

    classDateString = classDateString.replace(/^./, classDateString[0].toUpperCase());

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

    if(!classInfo) {
        return null;
    }

    return (
        <div className='classDetailsContainer'>
            <div className='classDetailsGoBack'>
                <Button className='classDetailsButton' text='Atras' onClick={goBack} />        
            </div>
            <div className='classDetailsDateContainer'>
                <p className='classDetailsDateString'>{classDateString}</p>
            </div>
            <div className='classDetailsHour'>
                <div className='classDetailsTime'>
                    <img src={time} alt="time" />
                    <p className='classDetailsTimeText'>{startHour} - {endHour}</p>
                </div>
                <div className='classDetailsCalories'>
                    <img src={flame} alt="flame" />
                    <p className='classDetailsTimeText'><b>250 cal.</b></p>
                </div>
            </div>
            <div className='classDetailsVideoContainer'>
                <video className='classDetailsVideo' width='90%' autoPlay='autoPlay' controls muted>
                    <source src={video} type="video/mp4"/>
                </video>
                {classInfo.instructor && 
                <UserCard user={{
                    firstName: classInfo.instructor.split(' ')[0],
                    lastName: classInfo.instructor.split(' ')[1],
                }}/>}
            </div>
             <div className='classDetailsRecommendations'>
                <h3>Recomendaciones</h3>
                <ul>
                    <li>Llevar suficiente agua.</li>
                    <li>Trae una toalla pequenia</li>
                    <li>Ropa comoda.</li>
                </ul>
             </div>
            { user.userType === userTypes.ADMIN &&
                <div className='classDetailsBalance' onClick={() => {setShowClassUsersModal(true)}}>
                    <p>Integrantes inscritos</p>
                    <div className={`classDetailsNumber`}>
                        <p>{classInfo && classInfo.registeredUsers?.length}</p>
                    </div>
                    <img src={rightArrow} alt="rightArrow" />
                </div>
            }
            { classInfo.registeredUsers && 
                <div className='classDetailsBalance'>
                    <p>Lugares disponibles</p>
                    <div className={`classDetailsNumber`}>
                        <p>{classInfo.maxUsers - classInfo.registeredUsers.length}</p>
                    </div>
                </div>
            }
            { user.userType === userTypes.ADMIN && 
                <div className='classDetailsAdminButtons'>
                    <Button text='Cancelar clase' buttonStyle={buttonStyle.warning} onClick={() => setShowModal(true)} />
                    {/* <Button text='Editar' buttonStyle={buttonStyle.alternative} /> */}
                </div>
            }

            {   user.userType === userTypes.USER && !classAlreadyBooked &&
                <>
                    <Button className='classDetailsRegisterButton' text='Inscribirme' onClick={() => setShowBookModal(true)} />
                </>
            }

            {   user.userType === userTypes.USER && classAlreadyBooked &&
                <>
                    <Button className='classDetailsRegisterButton' text='Cancelar Inscripcion' onClick={() => setShowCancelModal(true)} buttonStyle={buttonStyle.warning} />
                </>
            }

            <Modal 
                title='Cancelar clase?' 
                confirmText='Si, cancelar' 
                closeText='No' 
                content='Sera eliminada la clase del calendario, se les notificara a los integrantes inscritos y se les devolvera como clase a favor.'
                onConfirm={handleCancelClass}
                onClose={() => setShowModal(false)}
                show={showModal} />

            <Modal 
                title='Deseas cancelar la inscripcion?' 
                confirmText='Si, cancelar' 
                closeText='No' 
                content='Perderas el lugar a la clase y si son menos de 24 horas, perderas la clase a favor.'
                onConfirm={handleCancelClass}
                onClose={() => setShowCancelModal(false)}
                show={showCancelModal} />

            <Modal 
                title='Eliminar Integrante?' 
                confirmText='Si, eliminar' 
                closeText='Cancelar' 
                content='Se le notificara al integrante y la clase se le devolvera como clase a favor.'
                onConfirm={handleDeleteUserFromClass}
                onClose={() => setShowDeleteUserFromClassModal(false)}
                show={showDeleteUserFromClassModal} />

            <UsersModal 
                title='Integrantes' 
                closeText='Cerrar' 
                confirmText='Agregar' 
                onConfirm={() => setShowAllUsersModal(true)}
                onClose={() => setShowClassUsersModal(false)}
                show={showClassUsersModal}
                classInfo={classInfo}
            />

            <UsersModal 
                title='Integrantes' 
                closeText='Cerrar' 
                confirmText='Agregar' 
                onConfirm={() => console.log('confirm')}
                onClose={() => setShowAllUsersModal(false)}
                show={showAllUsersModal}
                classInfo={classInfo}
                showAllUsers
            />

            {user.purchasedPackages && <Modal 
                title='Inscribirme' 
                confirmText='Aceptar' 
                closeText='cancelar' 
                content={`Usaras una de tus clases a favor. Actualmente cuentas con ${calculateUserClasses(user.purchasedPackages)} clases a favor.`}
                onConfirm={handleBookingClass}
                onClose={() => setShowBookModal(false)}
                show={showBookModal} />}
        </div>
    );
}