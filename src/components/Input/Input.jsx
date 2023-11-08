import './Input.css'

export const Input = (props) => {

    const formattedValue = props.formatter ? props.formatter(props.value) : props.value;
    const classNames = props.className ? `inputContainer ${props.className}` : 'inputContainer';

    return (
            <input {...{...props, formatter: null}} className={classNames} value={formattedValue} />
    );
}