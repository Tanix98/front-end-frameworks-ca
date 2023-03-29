import useApi from '../../api/useApi/index';
import { reducer, initialState } from '../../pages/CheckoutPage/index';
import { SearchContext } from '../SearchBar/index';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useReducer, useEffect, useContext } from 'react';

function SearchProducts() {
    const searchTerm = useContext(SearchContext);

    let productList = '';

    const { data, isLoading, isError } = useApi(
        'https://api.noroff.dev/api/v1/online-shop'
    );

    productList = data;

    useEffect(() => {
        if (searchTerm === undefined) {
            console.log('render all products');
        } else {
            console.log('searchproducts searchterm: ' + searchTerm);
            console.log('render filtered products from search term');
        }
    }, [searchTerm]);

    useEffect(() => {
        console.log('useEffect has run');
    }, [searchTerm]);

    const [dispatch] = useReducer(reducer, initialState);

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

    function checkSearchTerm() {
        console.log(
            'Check what searchterm from searchproducts is: ' + searchTerm
        );
    }

    // In return the product's id is added to the router link's path that the card elements are wrapped in
    return (
        <div className='d-flex justify-content-center flex-wrap gap-4 text-break'>
            <Button onClick={checkSearchTerm}>Check searchterm</Button>
            {productList.map((product) => (
                <div className='card-width mt-3 bg-white' key={product.id}>
                    <Link
                        to={{
                            pathname: `/product/${product.id}`,
                        }}
                        className='text-decoration-none'
                    >
                        <div className='products-container d-flex flex-column justify-content-center'>
                            <div className='products-img-container m-auto d-flex justify-content-center align-items-center p-3'>
                                {product.price > product.discountedPrice && (
                                    <img
                                        className='products-img shadow hover-overlay'
                                        variant='top'
                                        src={product.imageUrl}
                                        alt={product.title}
                                    />
                                )}
                                {product.discountedPrice === product.price && (
                                    <img
                                        className='products-img shadow hover-overlay'
                                        variant='top'
                                        src={product.imageUrl}
                                        alt={product.title}
                                    />
                                )}
                            </div>
                            <div className='text-black px-3'>
                                <h5>{product.title}</h5>
                                {product.price > product.discountedPrice && (
                                    <div className='d-flex flex-wrap gap-1'>
                                        <s className='text-muted'>
                                            <p className='mt-1'>
                                                {product.price} kr
                                            </p>
                                        </s>
                                        <p className='mt-1'>
                                            {product.discountedPrice} kr
                                        </p>
                                    </div>
                                )}
                                {product.discountedPrice === product.price && (
                                    <p className='mt-1'>{product.price} kr</p>
                                )}
                            </div>
                            <p className='view-product-link text-decoration-none text-primary ps-3 mt-2'>
                                View product
                            </p>
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
    );
}

export default SearchProducts;
