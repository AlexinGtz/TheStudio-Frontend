import React from 'react';
import './ClassSelect.css';
import { Button, buttonStyle } from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { setClassType } from '../../redux/reducers/classTypeReducer';
import { useNavigate } from 'react-router-dom';

export const ClassSelect = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClassSelect = (selectedClass: string) => {
        dispatch(setClassType({
            type: selectedClass.toUpperCase()
        }));
        navigate('/calendar');
    }

    return (
        <div className='classSelectContainer'>
            <div className='classSelect'>
                <h1>Elige tu clase</h1>
                <div className='classSelectButtons'>
                    <Button text="Pilates" onClick={handleClassSelect.bind(this, "Pilates")} />
                    <Button text="Wellness" buttonStyle={buttonStyle.alternative} onClick={handleClassSelect.bind(this, "Wellness")} />
                </div>
            </div>
        </div>
    );
}
