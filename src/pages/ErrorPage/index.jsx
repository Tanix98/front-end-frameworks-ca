import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function ErrorPage() {
    useEffect(() => {
        document.title = 'Page does not exist | Tabernia';
    }, []);
    return (
        <div id='main'>
            <div className='d-flex justify-content-center'>
                <div>
                    <h3 className='mb-2 text-danger'>Page does not exist</h3>
                    <Link to='/'>Return to homepage</Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
