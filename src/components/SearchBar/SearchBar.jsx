import './SearchBar.css'
import { Input } from '../Input/Input';

export const SearchBar = (props) => {

    const handleSearchChange = (e) => {
        props.updateFilter(e.target.value);
    }

    return (
        <div className='searchBoxContainer'>
            <Input 
                placeholder='Buscar' 
                className={`searchBoxInput  ${props.altColor ? 'searchBoxGray' : ''}`} 
                onChange={handleSearchChange} />
        </div>
    );
}