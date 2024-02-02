import './UserCard.css'
import deleteIcon from '../../assets/Icons/delete_icon.svg'
import selectEmpty from '../../assets/Icons/select_empty.svg'
import selectFull from '../../assets/Icons/select_full.svg'
import { useNavigate } from 'react-router-dom'

export const UserCard = ({user, rightIconType, displayRightIcon, disableUserClick, onIconClick}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if(displayRightIcon && !disableUserClick) {
            navigate(`/user/${user.phoneNumber}`)        
        }
    }

    console.log('user', user);

    return (
        <div className='userCard'>
            <div className='userCardClickable' onClick={handleCardClick}>
                <p>{user.firstName} {user.lastName}</p>
            </div>
            {displayRightIcon && 
                <img 
                    className='userCardDeleteIcon' 
                    src={rightIconType === 'delete' ? deleteIcon : rightIconType === 'select' ? selectFull : selectEmpty} 
                    alt='delete icon' 
                    onClick={() => onIconClick(user.phoneNumber)} 
                />}
        </div>
    );
}