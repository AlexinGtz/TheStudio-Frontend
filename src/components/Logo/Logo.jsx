import './Logo.css'

export const Logo = (props) => {
    const logoClass = props.vertical ? 'logoVertical' : 'logoHorizontal';  

    return (
        <div className={`Logo ${logoClass}`}>
            <h1>The Studio</h1>
            <h2>Pilates</h2>
        </div>
    );
}