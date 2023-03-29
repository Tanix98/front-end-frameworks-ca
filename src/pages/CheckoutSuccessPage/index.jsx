import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function CheckoutSuccess() {
    useEffect(() => {
        document.title = 'Checkout success | Tabernia';
    }, []);

    return (
        <div id='main'>
            <div className='d-flex justify-content-center'>
                <div>
                    <h2 className='mb-2'>Order was successful!</h2>
                    <Link to='/'>Return to homepage</Link>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSuccess;
