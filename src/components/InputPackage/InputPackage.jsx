import './InputPackage.css'

export const InputPackage = ({title, quantity, setQuantity, type}) => {
    //const value = title === 'Precio' ? `$${quantity}` : quantity;
    return (
        <div className='inputPackageContainer'>
            <h3>{title}</h3>
            <input className='inputPackageInput' type={type ? type : 'number'} value={quantity} onChange={e => setQuantity(e.target.value)} />
        </div>
    );
}