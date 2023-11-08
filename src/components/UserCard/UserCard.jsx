import './UserCard.css'
import deleteIcon from '../../assets/Icons/delete_icon.svg'
import { useNavigate } from 'react-router-dom'

export const UserCard = ({user, displayDeleteIcon, disableUserClick, onDeleteClick}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if(displayDeleteIcon && !disableUserClick) {
            navigate(`/user/${user.phoneNumber}`)        
        }
    }

    return (
        <div className='userCard'>
            <div className='userCardClickable' onClick={handleCardClick}>
                <p>{user.firstName} {user.lastName}</p>
            </div>
            {displayDeleteIcon && 
                <img 
                    className='userCardDeleteIcon' 
                    src={deleteIcon} 
                    alt='delete icon' 
                    onClick={() => onDeleteClick(user.phoneNumber)} 
                />}
        </div>
    );
}