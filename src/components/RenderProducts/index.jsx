import useApi from '../../api/useApi/index';
import { SearchContext } from '../../pages/HomePage/index';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';

function RenderProducts() {
    const { searchTerm } = useContext(SearchContext);

    const dispatch = useDispatch();

    const { data, isLoading, isError } = useApi(
        'https://api.noroff.dev/api/v1/online-shop'
    );

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
    return (
        <div className='d-flex justify-content-center flex-wrap gap-4 text-break'>
            {data
                .filter((product) => {
                    if (searchTerm == '') {
                        return product;
                    } else if (
                        product.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    ) {
                        return product;
                    }
                })
                .map((product, key) => (
                    <div className='product-card mt-3 bg-white p-3' key={key}>
                        <Link
                            to={{
                                pathname: `/product/${product.id}`,
                            }}
                            className='text-decoration-none'
                        >
                            <div className='products-container d-flex flex-column justify-content-center'>
                                <div className='products-img-container m-auto d-flex justify-content-center align-items-center'>
                                    {product.price >
                                        product.discountedPrice && (
                                        <img
                                            className='products-img shadow hover-overlay'
                                            variant='top'
                                            src={product.imageUrl}
                                            alt={product.title}
                                        />
                                    )}
                                    {product.discountedPrice ===
                                        product.price && (
                                        <img
                                            className='products-img shadow hover-overlay'
                                            variant='top'
                                            src={product.imageUrl}
                                            alt={product.title}
                                        />
                                    )}
                                </div>
                                <div className='text-black mt-3'>
                                    <h5>{product.title}</h5>
                                    {product.price >
                                        product.discountedPrice && (
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
                                    {product.discountedPrice ===
                                        product.price && (
                                        <p className='mt-1'>
                                            {product.price} kr
                                        </p>
                                    )}
                                </div>
                                <p className='view-product-link text-decoration-none text-primary my-1'>
                                    View product
                                </p>
                            </div>
                        </Link>
                        <div className='d-flex flex-column mt-2'>
                            <Button
                                onClick={() => dispatch(addToCart(product))}
                                className='shadow-sm'
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

export default RenderProducts;
