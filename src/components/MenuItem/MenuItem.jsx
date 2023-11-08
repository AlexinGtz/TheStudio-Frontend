import './MenuItem.css'
import { useNavigate } from 'react-router-dom';

import MyClassesSelected from '../../assets/Icons/myClasses_selected.svg';
import MyClassesUnSelected from '../../assets/Icons/myClasses_unselected.svg';
import CalendarSelected from '../../assets/Icons/calendar_selected.svg';
import CalendarUnSelected from '../../assets/Icons/calendar_unselected.svg';
import PackagesSelected from '../../assets/Icons/packages_selected.svg';
import PackagesUnSelected from '../../assets/Icons/packages_unselected.svg';
import ProfileSelected from '../../assets/Icons/profile_selected.svg';
import ProfileUnSelected from '../../assets/Icons/profile_unselected.svg';
import UsersSelected from '../../assets/Icons/users_selected.svg';
import UsersUnSelected from '../../assets/Icons/users_unselected.svg';
import InstructorsaSelected from '../../assets/Icons/instructors_selected.svg';
import InstructorsaUnSelected from '../../assets/Icons/instructors_unselected.svg';

const iconSelector = (iconName) => {
    switch (iconName) {
        case 'MyClasses':
            return {
                selected: MyClassesSelected,
                unselected: MyClassesUnSelected
            };
        case 'Calendar':
            return {
                selected: CalendarSelected,
                unselected: CalendarUnSelected
            };
        case 'Packages':
            return {
                selected: PackagesSelected,
                unselected: PackagesUnSelected
            };
        case 'Profile':
            return {
                selected: ProfileSelected,
                unselected: ProfileUnSelected
            };
        case 'Users':
            return {
                selected: UsersSelected,
                unselected: UsersUnSelected
            };
        case 'Instructors':
            return {
                selected: InstructorsaSelected,
                unselected: InstructorsaUnSelected
            };
        default:
            return null;
    }
}

export const MenuItem = (props) => {
    const navigate = useNavigate();
    const isSelected = location.pathname === props.data.redirect ? 'selected' : 'unselected';
    const Icon = iconSelector(props.data.icon)[isSelected];

    return (
        <div onClick={() => {
            navigate(props.data.redirect)
        }}>
            { Icon && <img src={Icon} className='menuItemImage' />}
        </div>
    );
}
