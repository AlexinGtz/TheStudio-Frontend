import './Users.css'
import { useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { useSelector } from 'react-redux';
import { getRegisteredUsers } from '../../model/api/api';
import { useDispatch } from 'react-redux';
import { setRegisteredUsers } from '../../redux/reducers/registeredUsersReducer';
import { UsersList } from '../../components/UsersList/UsersList';
import { setLoading } from '../../redux/reducers/loadingReducer';

export const Users = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const registeredUsers = useSelector(state => state.registeredUsers.users);

    useEffect(() => {
        if(!registeredUsers || registeredUsers.length === 0) {
            handleGetUsers();        
        }
    }, [registeredUsers]);

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
            <div className='usersContent'>
                <h1 className='usersTitle'>Usuarios</h1>
                <SearchBar updateFilter={setFilter} />
                <UsersList users={filteredUsers} deleteEnabled />
            </div>
        </div>
    );
}