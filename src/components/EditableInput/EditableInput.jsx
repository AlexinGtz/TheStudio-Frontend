import './EditableInput.css'
import editIcon from '../../assets/Icons/edit_icon.svg'
import rightArrow from '../../assets/Icons/right_arrow.svg'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { editUserData } from '../../model/api/api';
import { useSelector, useDispatch } from 'react-redux';
import { replaceUserInfo } from '../../redux/reducers/userReducer';

export const EditableInput = ({id, title, data, updateData, formatter, extraStepLink, showIcon}) => {
    const [editMode, setEditMode] = useState(false);
    const user = useSelector(state => state.user);
    const reference = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditClick = () => {
        if (extraStepLink) {
            navigate(extraStepLink);
            return;
        }
        setEditMode(true);
        reference.current.focus();
    }

    const handleClickOutside = async () => {
        setEditMode(false);
        if(data === user[id]) return;
        const res = await editUserData({[id]: data});
        if(res.statusCode === 200) {
            enqueueSnackbar('Datos actualizados', { variant: 'success' });
        } else {
            enqueueSnackbar('Hubo un problema actualizando los datos', { variant: 'error' });
        }
        dispatch(replaceUserInfo({key: id, value: data}));
    }

    return (
        <div className='editableInputContainer'>
            <div className='editableInputInfo'>
                <p className='editableInputTitle'>{title}</p>
                <input 
                    onBlur={handleClickOutside}
                    ref={reference}
                    className={`editableInputData ${editMode ? '' : 'editableInputDisabled'}`} 
                    type='text' 
                    value={formatter ? formatter(data) : data} 
                    onChange={(e) => updateData(e.target.value)} 
                />
            </div>
            {showIcon &&
                <div className='editableInputIcon' onClick={handleEditClick}>
                    <img src={extraStepLink ? rightArrow : editIcon} alt='edit icon' />
                </div>
            }
        </div>
    );
}