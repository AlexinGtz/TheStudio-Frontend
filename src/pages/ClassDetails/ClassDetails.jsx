import './ClassDetails.css'
import flame from '../../assets/Icons/flame_outline.svg'
import time from '../../assets/Icons/time_outline.svg'
import pilatesImage from '../../assets/Images/pilates.jpg';
import rightArrow from '../../assets/Icons/right_arrow.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { bookClass, cancelClass, getClassInfo, getUserClasses, getUserProfile } from '../../model/api/api';
import { UserCard } from '../../components/UserCard/UserCard';
import { Button, buttonStyle } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { userTypes } from '../../constants';
import { calculateUserClasses } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreClasses } from '../../redux/reducers/classesReducer';
import { replaceBookedClasses, restoreProfile, setProfile } from '../../redux/reducers/userReducer';
import { UsersModal } from '../../components/UsersModal/UsersModal';
import { enqueueSnackbar } from 'notistack';
import { setLoading } from '../../redux/reducers/loadingReducer';

export const ClassDetails = () => {
    const classes = useSelector((state) => state.classes);
    const user = useSelector((state) => state.user);
    
    const [classInfo, setClassInfo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [userNumber, setUserNumber] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showBookModal, setShowBookModal] = useState(false);
    const [showClassUsersModal, setShowClassUsersModal] = useState(false);
    const [showAllUsersModal, setShowAllUsersModal] = useState(false);
    const [showDeleteUserFromClassModal, setShowDeleteUserFromClassModal] = useState(false);
    const [classAlreadyBooked, setClassAlreadyBooked] = useState(false); 
    const { classId, classType } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();        

    useEffect(() => {
        const classInfo = classes?.find((c) => c.date_by_type === `${classId}#${classType}`);        
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
        dispatch(setLoading(true));
        const date = new Date(classId);
        const res = await getClassInfo((date.getMonth() + 1).toString(), `${classId}#${classType}`);
        dispatch(setLoading(false));
        setClassInfo(res);
    }

    const handleBookingClass = async () => {
        const classDate = new Date(classId)
        const rightNow = new Date()
        if((classDate.getTime() - rightNow.getTime()) < 3600000 ) {
            enqueueSnackbar('No puedes reservar con menos de 1 hora de anticipación', 
                { variant: 'error' });
            return;
        }
        dispatch(setLoading(true));
        await bookClass({
            classDateByType: `${classId}#${classType}`,
            classMonth: classInfo.month
        });
        dispatch(setLoading(false));
        handleSuceedBooking();

    }

    const handleCancelClassConfirm = async () => {
        dispatch(setLoading(true));
        await cancelClass(classInfo.month, `${classId}#${classType}`, userNumber ?? undefined);
        dispatch(setLoading(false));
        handleSuceedBooking();
    }

    const handleBookClassForUsers = async () => {
        dispatch(setLoading(true));
        const res = await bookClass({
            classDate: `${classId}#${classType}`,
            classMonth: classInfo.month,
            users: selectedUsers,
        });
        dispatch(setLoading(false));
        
        if(res?.statusCode === 200) {
            enqueueSnackbar('Clase reservada correctamente', { variant: 'success' });
            return;
        }
        enqueueSnackbar('Error al reservar la clase', { variant: 'error' });
    }

    const handleDeleteIconClicked = (phoneNumber) => {
        setShowClassUsersModal(false);
        setShowDeleteUserFromClassModal(true);
        setUserNumber(phoneNumber);
    }

    const handleSelectUser = (phoneNumber) => {
        if(!selectedUsers.includes(phoneNumber)) {
            setSelectedUsers([...selectedUsers, phoneNumber]);
        } else {
            setSelectedUsers(selectedUsers.filter((u) => u !== phoneNumber));
        }
    }

    const handleSuceedBooking = async () => {
        dispatch(restoreClasses());
        dispatch(restoreProfile());
        dispatch(setLoading(true));
        const newClasses = await getUserClasses();
        const updatedProfile = await getUserProfile();
        dispatch(setLoading(false));
        dispatch(replaceBookedClasses(newClasses.classes));
        dispatch(setProfile(updatedProfile));
        navigate('/calendar');
    }

    const goBack = () => {
        navigate(-1);
    }

    if(!classInfo) {
        return null;
    }    

    const classDate = new Date(classInfo.date_by_type.split('#')[0]);

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

    console.log('classInfo', classInfo);
    

    return (
        <div className='classDetailsContainer'>
            <div className='classDetailsGoBack'>
                <Button className='classDetailsButton' text='Atrás' onClick={goBack} />        
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
            <div className='classDetailsImageContainer'>
                <img className='classDetailsImage' src={pilatesImage} alt="image" />
                {classInfo.instructor && 
                    <UserCard user={{
                        firstName: `Instructora: ${classInfo.instructor.split(' ')[0]}`,
                        lastName: classInfo.instructor.split(' ')[1],
                    }}/>
                }
            </div>
             <div className='classDetailsRecommendations'>
                <h3>Recomendaciones</h3>
                <ul>
                    <li>Llevar suficiente agua.</li>
                    <li>Trae una toalla pequeña.</li>
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
                <>
                    <Button className='classDetailsAdminButtons' text='Cancelar clase' buttonStyle={buttonStyle.warning} onClick={() => setShowModal(true)} />
                    {/* <Button text='Editar' buttonStyle={buttonStyle.alternative} /> */}
                </>
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
                title='¿Cancelar clase?' 
                confirmText='Sí, cancelar' 
                closeText='No' 
                content='Será eliminada la clase del calendario, se les notificará a los integrantes inscritos y se les devolverá como clase a favor.'
                onConfirm={handleCancelClassConfirm}
                onClose={() => setShowModal(false)}
                show={showModal} />

            <Modal 
                title='¿Deseas cancelar la inscripcion?' 
                confirmText='Sí, cancelar' 
                closeText='No' 
                content='Perderás el lugar a la clase y si son menos de 24 horas, perderás la clase a favor.'
                onConfirm={handleCancelClassConfirm}
                onClose={() => setShowCancelModal(false)}
                show={showCancelModal} />

            <Modal 
                title='¿Eliminar Integrante?' 
                confirmText='Sí, eliminar' 
                closeText='Cancelar' 
                content='Se le notificará al integrante y la clase se le devolverá como clase a favor.'
                onConfirm={handleCancelClassConfirm}
                onClose={() => setShowDeleteUserFromClassModal(false)}
                show={showDeleteUserFromClassModal} />

            <UsersModal 
                title='Integrantes' 
                closeText='Cerrar' 
                confirmText='Agregar' 
                onConfirm={() => {
                    setShowAllUsersModal(true);
                    setShowClassUsersModal(false);
                }}
                onClose={() => setShowClassUsersModal(false)}
                show={showClassUsersModal}
                classInfo={classInfo}
                onIconClick={handleDeleteIconClicked}
            />

            <UsersModal 
                title='Integrantes' 
                closeText='Cerrar' 
                confirmText='Agregar' 
                onConfirm={handleBookClassForUsers}
                onClose={() => setShowAllUsersModal(false)}
                show={showAllUsersModal}
                classInfo={classInfo}
                showAllUsers
                onIconClick={handleSelectUser}
                selectedUsers={selectedUsers}
                filterAlreadyBookedUsers
            />

            {user.purchasedPackages && <Modal 
                title='Inscribirme' 
                confirmText='Aceptar' 
                closeText='Cancelar' 
                content={`Usarás una de tus clases a favor. Actualmente cuentas con ${calculateUserClasses(user.purchasedPackages)[`${classType.toLowerCase()}Classes`]} clases.`}
                onConfirm={handleBookingClass}
                onClose={() => setShowBookModal(false)}
                show={showBookModal} />}
        </div>
    );
}