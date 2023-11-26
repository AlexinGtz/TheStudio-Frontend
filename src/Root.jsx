import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, getRegisteredUsers } from './model/api/api';
import { setProfile } from './redux/reducers/userReducer';
import { setRegisteredUsers } from './redux/reducers/registeredUsersReducer';
import { userTypes } from './constants';
import { Spinner } from './components/Spinner/Spinner';
import { setLoading } from './redux/reducers/loadingReducer';

export const Root = (props) => {
    const user = useSelector(state => state.user);
    const registeredUsers = useSelector(state => state.registeredUsers.users);
    const loading = useSelector(state => state.loading);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleGetUserProfile = async () => {
        dispatch(setLoading(true));
        const res = await getUserProfile();
        dispatch(setLoading(false));
        dispatch(setProfile(res));
    }

    const handleGetAllUsers = async () => {
        if(localStorage.getItem('token') && user.userType === userTypes.ADMIN) {
            if(!registeredUsers || registeredUsers.length === 0){
                dispatch(setLoading(true));
                const res = await getRegisteredUsers();
                dispatch(setLoading(false));
                if(res.users.length > 0) {
                    dispatch(setRegisteredUsers(res));
                }
            }
        }
    }

    useEffect(() => {
        handleGetAllUsers();
    }, [registeredUsers]);

    useEffect(() => {
        const userType = localStorage.getItem('userType');

        if(localStorage.getItem('token')) {
            if(!user || !user.phoneNumber || user.phoneNumber === '') {
                handleGetUserProfile();
            }
            if(userType === 'admin') {
                handleGetAllUsers();
            }
        }

        if((!location.pathname.includes('/login') 
                && !location.pathname.includes('/register')
                && !location.pathname.includes('/forgotPassword')) 
                    && !localStorage.getItem('token')) {
            navigate('/login');
            return;
        }
        if(location.pathname.includes('/login') && localStorage.getItem('token')) {
            navigate('/userCalendar');
            return;
        }
        if(userType !== 'admin' && location.pathname.includes('/admin')) {
            navigate('/userCalendar');
            return;
        }
        if(userType === 'admin' && location.pathname === '/') {
            navigate('/calendar');
            return;
        }

    }, [navigate, location]);

    return (
        <>
            {props.children}
            {loading && <Spinner />}
        </>
    );
}