import './Modal.css'
import { Button, buttonStyle } from '../Button/Button';

export const Modal = ({
    title,
    content,
    closeText,
    confirmText,
    onClose,
    onConfirm,
    show,
}) => {

    if(!show) return null;
    
    return (
        <div className='modalBackdrop'>
            <div className='modalContainer'>
                <h2 className='modalTitle'>{title}</h2>
                <p className='modalContent'>{content}</p>
                <div className='modalButtons'>
                    <Button text={closeText} onClick={onClose} buttonStyle={buttonStyle.gray} />
                    <Button text={confirmText} onClick={onConfirm} />
                </div>
            </div>
        </div>
    );
}