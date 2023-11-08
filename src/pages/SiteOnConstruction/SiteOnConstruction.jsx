import './SiteOnConstruction.css'
import pilates from '../../assets/Images/pilates.jpg'

export const SiteOnConstruction = () => {

    return (
        <div className='onConstructionContainer'>
            <h1>Sitio en construcción</h1>
            <img className='onConstructionImage' src={pilates}/>
        </div>
    );
}