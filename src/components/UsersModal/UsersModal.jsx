import { Button, buttonStyle } from '../Button/Button';
import './UsersModal.css'
import { UserCard } from '../UserCard/UserCard';
import { SearchBar } from '../SearchBar/SearchBar';
import { UsersList } from '../UsersList/UsersList';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setRegisteredUsers } from '../../redux/reducers/registeredUsersReducer';
import { setLoading } from '../../redux/reducers/loadingReducer';
import { useDispatch } from 'react-redux';
import { getRegisteredUsers } from '../../model/api/api';

export const UsersModal = ({
    title,
    closeText,
    confirmText,
    onClose,
    onConfirm,
    show,
    classInfo,
    showAllUsers,
    onIconClick,
    selectedUsers,
    filterAlreadyBookedUsers
}) => {
    const [filter, setFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const registeredUsers = useSelector(state => state.registeredUsers.users);
    const dispatch = useDispatch();

    const handleGetUsers = async () => {
            dispatch(setLoading(true));
            const res = await getRegisteredUsers();
            dispatch(setLoading(false));
            dispatch(setRegisteredUsers({ 
                users: res.users,
                lastEvaluatedKey: res.lastEvaluatedKey,
            }));
    }

    useEffect(() => {
        if(!registeredUsers || registeredUsers.length === 0) {
            handleGetUsers();        
        }
    }, [registeredUsers]);

    useEffect(() => {
        let filteredUsers = registeredUsers.filter(user => {
            if(filterAlreadyBookedUsers) {
                return !classInfo.registeredUsers?.some(registeredUser => registeredUser.phoneNumber === user.phoneNumber);
            }
            return true;
        });

        if(filter) {
                const newFilteredUsers = filteredUsers.filter(user => {
                const name = user.firstName.toLowerCase();
                const lastname = user.lastName.toLowerCase();
                const filterLowerCase = filter.toLowerCase();
                return name.includes(filterLowerCase) || lastname.includes(filterLowerCase);
            });
            setFilteredUsers(newFilteredUsers);
        } else {
            setFilteredUsers(filterAlreadyBookedUsers ? filteredUsers : registeredUsers);
        }
    }, [filter, registeredUsers]);

    if(!show) return null;

    let content = showAllUsers ? (
    <>
        <SearchBar updateFilter={setFilter} altColor />
        <UsersList users={filteredUsers} externalUserClick={onIconClick} selectedUsers={selectedUsers} disableUserClick />
    </>) : (<p>No users have been registered yet.</p>);    

    if (!showAllUsers && classInfo?.registeredUsers) {
        content = classInfo.registeredUsers.map((user) => (
            <div className='usersModalCard' key={user}>
                <UserCard 
                    user={user} 
                    displayRightIcon 
                    rightIconType='delete' 
                    disableUserClick
                    onIconClick={onIconClick} />
            </div>
        ))
    }    

    return (
        <div className='usersModalBackdrop' onClick={() => {}}>
            <div className='usersModalContainer'>
                <h2 className='usersModalTitle'>{title}</h2>
                <div className='userModalContent'>
                    { content }
                </div>
                <div className='usersModalButtons'>
                    <Button text={closeText} onClick={onClose} buttonStyle={buttonStyle.gray} />
                    <Button text={confirmText} onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}