import './Logo.css'

export const Logo = (props) => {
    const logoClass = props.vertical ? 'logoVertical' : 'logoHorizontal';  

    return (
        <div className={`Logo ${logoClass}`}>
            <h1>MOVE</h1>
        </div>
    );
}