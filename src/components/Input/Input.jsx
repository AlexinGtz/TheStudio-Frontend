import './Input.css'

export const Input = (props) => {
    const classNames = props.className ? `inputContainer ${props.className}` : 'inputContainer';

    return (
            <input {...{...props}} className={classNames} />
    );
}