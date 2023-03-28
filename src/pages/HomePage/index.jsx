import useApi from '../../api/useApi/index';
import { reducer, initialState } from '../CheckoutPage/index';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Home - Taberna';
    }, []);

    const { data, isLoading, isError } = useApi(
        'https://api.noroff.dev/api/v1/online-shop'
    );

    const [state, dispatch] = useReducer(reducer, initialState);

    if (isLoading) {
        return (
            <div id='main' className='text-center'>
                <div className='lds-dual-ring'></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <h4 id='main' className='text-center text-danger'>
                Error, could not load products
            </h4>
        );
    }

    // In return the product's id is added to the router link's path that the card elements are wrapped in

    /* old card products 
    <Card className="card-width" key={data.id}>
        <Link to={{
        pathname: `/product/${data.id}`
        }}><Card.Img className="p-3 products-img" variant="top" src={data.imageUrl} alt="Product image" /></Link>
        <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            Price: {data.price}kr
            <Card.Text className="card-desc">
                <Link to={{
                pathname: `/product/${data.id}`
                }}>More info</Link>
            </Card.Text>
            <Button variant="primary mt-2">Add to cart</Button>
        </Card.Body>
    </Card>
    */

    return (
        <div id='main'>
            <h2 className='text-center mb-4'>Products</h2>
            <div className='d-flex justify-content-center flex-wrap gap-4 text-break'>
                {data.map((data) => (
                    <div className='card-width mt-3 bg-white' key={data.id}>
                        <Link
                            to={{
                                pathname: `/product/${data.id}`,
                            }}
                            className='text-decoration-none'
                        >
                            <div className='products-container d-flex flex-column justify-content-center'>
                                <div className='products-img-container m-auto d-flex justify-content-center align-items-center p-3'>
                                    <img
                                        className='products-img shadow hover-overlay'
                                        variant='top'
                                        src={data.imageUrl}
                                        alt={data.title}
                                    />
                                </div>
                                <div className='text-black px-3'>
                                    <h5>{data.title}</h5>
                                    <p>{data.price}kr</p>
                                </div>
                                <Link
                                    to={{
                                        pathname: `/product/${data.id}`,
                                    }}
                                    className='text-decoration-none ps-3 mt-2'
                                >
                                    View product
                                </Link>
                            </div>
                        </Link>
                        <div className='d-flex flex-column mt-3'>
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: 'addProduct',
                                        payload: data,
                                    })
                                }
                                className='m-3 mt-auto shadow-sm'
                                type='button'
                            >
                                Add to cart
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
