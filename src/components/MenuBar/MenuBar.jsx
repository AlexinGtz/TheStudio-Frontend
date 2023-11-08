import { useSelector } from 'react-redux';
import { userTypes } from '../../constants';
import './MenuBar.css'
import { MenuItem } from '../MenuItem/MenuItem';

const menuItems = [
    {
        id: 1,
        title: 'Mis Clases',
        redirect: '/',
        user: [userTypes.USER], 
        icon: 'MyClasses'
    },
    {
        id: 2,
        title: 'Calendario',
        redirect: '/calendar',
        user: [userTypes.USER, userTypes.ADMIN],
        icon: 'Calendar'
    },
    {
        id: 3,
        title: 'Usuarios',
        redirect: '/users',
        user: [userTypes.ADMIN], 
        icon: 'Users'
    },
    // {
    //     id: 4,
    //     title: 'Maestros',
    //     redirect: '/instructors',
    //     user: [userTypes.ADMIN], 
    //     icon: 'Instructors'
    // },
    {
        id: 5,
        title: 'Paquetes',
        redirect: '/packages',
        user: [userTypes.USER], 
        icon: 'Packages'
    },
    {
        id: 6,
        title: 'Paquetes',
        redirect: '/admin-packages',
        user: [userTypes.ADMIN], 
        icon: 'Packages'
    },
    {
        id: 7,
        title: 'Perfil',
        redirect: '/profile',
        user: [userTypes.USER, userTypes.ADMIN], 
        icon: 'Profile'
    }
]

export const MenuBar = () => {
    const userType = useSelector(state => state.user.userType);

    const menuItemsFiltered = menuItems.filter(item => item.user.includes(userType));
    return (
        <div className='menuBarContainer'>
            {menuItemsFiltered.length > 0 && menuItemsFiltered.map(item => <MenuItem data={item} key={item.id} />)}
        </div>
    );
}