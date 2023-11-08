import { Button, buttonStyle } from '../Button/Button';
import './Modal.css'

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
    //TODO: clicking on the modal container should not close the modal
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