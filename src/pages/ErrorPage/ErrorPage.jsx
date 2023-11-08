import { Button } from '../../components/Button/Button';
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoToMainPage = () => {
        navigate(-1)
    }

    return (
        <div className='errorPageContainer'>
            <h1>Error 404</h1>
            <h1>Esta pagina no existe</h1>
            <Button className='errorPageButton' onClick={handleGoToMainPage} text='Regresar' />
        </div>
    );
}