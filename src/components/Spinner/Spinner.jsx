import './Spinner.css'

export const Spinner = () => {

    return (
        <div className='spinnerBackdrop'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}