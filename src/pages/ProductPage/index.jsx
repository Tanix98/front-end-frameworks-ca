import './styles.css';
import useApi from '../../api/useApi/index';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';

function Product() {
    const dispatch = useDispatch();

    // Gets the product id from the url parameter, which is then used to fetch that specific product data
    let { id } = useParams();
    let productRating = '';

    const { data, isLoading, isError, getTags, getReviews } = useApi(
        `https://api.noroff.dev/api/v1/online-shop/${id}`
    );

    const productName = data.title;
    useEffect(() => {
        document.title = productName + ' | Tabernia';
    });

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

    // Scrolls to the product reviews section when clicked on
    const handleClickScroll = () => {
        const element = document.getElementById('product-reviews');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let productPrice = data.price + ' kr';
    let productPriceDiscount = '';
    if (data.discountedPrice < data.price) {
        productPrice = <s className='text-muted'>{data.price} kr</s>;
        productPriceDiscount = data.discountedPrice + ' kr';
    }

    return (
        <div id='main'>
            <div id='product-container' className='m-auto d-none d-md-block'>
                <div className='d-flex justify-content-between gap-4'>
                    <div>
                        <div
                            className='d-flex flex-column justify-content-center align-items-center p-3 pt-2'
                            id='product-img-container-2'
                        >
                            <img
                                className='mb-auto shadow'
                                id='product-img-2'
                                variant='top'
                                src={data.imageUrl}
                                alt={data.title}
                            />
                        </div>
                    </div>
                    <div className='product-desc'>
                        <h3>{data.title}</h3>
                        <div className='d-flex gap-1'>
                            <p className='mt-1'>{productPrice}</p>
                            <p className='mt-1'>{productPriceDiscount}</p>
                        </div>
                        <Button
                            variant='primary my-2 shadow-sm'
                            onClick={() => dispatch(addToCart(data))}
                        >
                            Add to cart
                        </Button>
                        <p className='mb-2'>{data.description}</p>
                        <div>
                            <p className='mb-2'>Tags:</p>
                            <div
                                className='text-white d-flex gap-2'
                                id='product-tags'
                            >
                                {getTags.map((tag) => (
                                    <p
                                        className='px-2 py-1 bg-secondary'
                                        key={tag}
                                    >
                                        {tag}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex flex-column gap-1'>
                            <p>Rating: {data.rating} stars </p>
                            <div className='d-none align-items-center gap-1'>
                                <p>Rating: </p>
                                {productRating}
                            </div>
                            <div>
                                <Link onClick={handleClickScroll}>
                                    See reviews
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='justify-content-center gap-4'
                    id='product-reviews'
                >
                    <h3 className='mt-4'>Reviews: </h3>
                    <div className='d-flex flex-column gap-4 mt-3'>
                        {getReviews.map((review) => (
                            <div
                                className='bg-dark text-white p-3 d-flex flex-column gap-2'
                                key={review.id}
                            >
                                <h5>{review.username}</h5>
                                <hr className='m-0' />
                                <p>Rating: {review.rating} stars</p>
                                <p>"{review.description}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='d-md-none product-width-mobile m-auto text-break'>
                <div
                    className='d-flex flex-column justify-content-center align-items-center p-3'
                    id='product-img-container-1'
                >
                    <img
                        className='shadow'
                        id='product-img-1'
                        variant='top'
                        src={data.imageUrl}
                        alt={data.title}
                    />
                </div>
                <div className='px-3 pb-3'>
                    <h3 className='mt-3'>{data.title}</h3>
                    <div className='d-flex flex-wrap gap-1 mt-1'>
                        <p>{productPrice}</p>
                        <p>{productPriceDiscount}</p>
                    </div>
                    <Button
                        variant='primary'
                        className='mt-2 shadow'
                        onClick={() => dispatch(addToCart(data))}
                    >
                        Add to cart
                    </Button>
                    <p className='mt-2'>{data.description}</p>
                    <div className='d-flex flex-column gap-1 mt-2'>
                        <div>
                            <p className='mb-2'>Tags:</p>
                            <div
                                className='text-white d-flex flex-wrap gap-2'
                                id='product-tags'
                            >
                                {getTags.map((tag) => (
                                    <p
                                        className='px-2 py-1 bg-secondary'
                                        key={tag}
                                    >
                                        {tag}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <p className='mt-3'>Rating: {data.rating} stars</p>
                        <div
                            className='justify-content-center gap-4'
                            id='product-reviews'
                        >
                            <h3 className='mt-2'>Reviews: </h3>
                            <div className='d-flex flex-column gap-4 mt-3'>
                                {getReviews.map((review) => (
                                    <div
                                        className='bg-dark text-white p-3 d-flex flex-column gap-2'
                                        key={review.id}
                                    >
                                        <h5>{review.username}</h5>
                                        <hr className='m-0' />
                                        <p>Rating: {review.rating} stars</p>
                                        <p>"{review.description}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
