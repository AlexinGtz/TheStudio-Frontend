import { Button, buttonStyle } from '../Button/Button';
import './UsersModal.css'
import { UserCard } from '../UserCard/UserCard';
import { SearchBar } from '../SearchBar/SearchBar';
import { UsersList } from '../UsersList/UsersList';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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


    //TODO: clicking on the modal container should not close the modal
    return (
        <div className='usersModalBackdrop'>
            <div className='usersModalContainer'>
                <h2 className='usersModalTitle'>{title}</h2>
                <div className='userModalContent'>
                    {   showAllUsers ?
                        <>
                            <SearchBar updateFilter={setFilter} altColor />
                            <UsersList users={filteredUsers} externalUserClick={onIconClick} selectedUsers={selectedUsers} disableUserClick />
                        </>
                        :
                        classInfo?.registeredUsers &&
                        classInfo.registeredUsers.map((user) => (
                            <div className='usersModalCard'>
                                <UserCard 
                                    user={user} 
                                    displayRightIcon 
                                    rightIconType='delete' 
                                    disableUserClick
                                    onIconClick={onIconClick} />
                            </div>
                        ))
                    }
                </div>
                <div className='usersModalButtons'>
                    <Button text={closeText} onClick={onClose} buttonStyle={buttonStyle.gray} />
                    <Button text={confirmText} onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}