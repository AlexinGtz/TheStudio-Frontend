import './Button.css'

export const buttonStyle = {
    normal: 'buttonNormalColor',
    alternative: 'buttonAlternativeColor',
    gray: 'buttonGrayColor',
    warning: 'buttonWarningColor',
}

export const Button = (props) => {

    return (
        <div className={`buttonContainer ${props.buttonStyle ?? buttonStyle.normal} ${props.className ?? ''}`} onClick={props.onClick}>
            {props.text}
        </div>
    );
}