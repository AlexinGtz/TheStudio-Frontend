import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './Users.css'
import { useSelector } from 'react-redux';
import { getRegisteredUsers } from '../../model/api/api';
import { useDispatch } from 'react-redux';
import { setRegisteredUsers } from '../../redux/reducers/registeredUsersReducer';
import { UsersList } from '../../components/UsersList/UsersList';

export const Users = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const registeredUsers = useSelector(state => state.registeredUsers.users);

    useEffect(() => {
        handleGetUsers();        
    }, []);

    const handleGetUsers = async () => {
        if(!registeredUsers || registeredUsers.length === 0) {
            const res = await getRegisteredUsers();
            dispatch(setRegisteredUsers({ 
                users: res.users,
                lastEvaluatedKey: res.lastEvaluatedKey,
            }));
        }
    }

    useEffect(() => {
        if(filter) {
            const filteredUsers = registeredUsers.filter(user => {
                const name = user.firstName.toLowerCase();
                const lastname = user.lastName.toLowerCase();
                const filterLowerCase = filter.toLowerCase();
                return name.includes(filterLowerCase) || lastname.includes(filterLowerCase);
            });
            setFilteredUsers(filteredUsers);
        } else {
            setFilteredUsers(registeredUsers);
        }
    }, [filter, registeredUsers]);

    return (
        <div className='usersContainer'>
            <h1>Usuarios</h1>
            <SearchBar updateFilter={setFilter} />
            <UsersList users={filteredUsers} />
        </div>
    );
}